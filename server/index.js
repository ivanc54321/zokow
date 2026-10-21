import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadStoredEvents, saveStoredEvents, runIngestionPipeline, startBackgroundSync } from './services/aggregator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VENUES_FILE = path.join(__dirname, 'data', 'venues.json');
const ARCONF_FILE = path.join(__dirname, 'arconf-data.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper for venues storage
function loadStoredVenues() {
  try {
    if (fs.existsSync(VENUES_FILE)) {
      const data = fs.readFileSync(VENUES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading venues.json:', err.message);
  }
  return [];
}

function saveStoredVenues(venues) {
  try {
    const dir = path.dirname(VENUES_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(VENUES_FILE, JSON.stringify(venues, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving venues.json:', err.message);
    return false;
  }
}

// Helper for ARCONF data storage
function loadArconfData() {
  try {
    if (fs.existsSync(ARCONF_FILE)) {
      const data = fs.readFileSync(ARCONF_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading arconf-data.json:', err.message);
  }
  return null;
}

function saveArconfData(data) {
  try {
    const tempFile = `${ARCONF_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, ARCONF_FILE);
    return true;
  } catch (err) {
    console.error('Error saving arconf-data.json:', err.message);
    return false;
  }
}

function formatPollData(poll) {
  if (!poll) return null;
  const total = (poll.options || []).reduce((acc, opt) => acc + (opt.votes || 0), 0);
  const optionsWithPercent = (poll.options || []).map(opt => ({
    ...opt,
    percent: total > 0 ? Math.round((opt.votes / total) * 100) : 0
  }));
  return {
    ...poll,
    totalVotes: total,
    options: optionsWithPercent
  };
}

// Initialize store with seed data if empty
let currentEvents = loadStoredEvents();
if (currentEvents.length === 0) {
  runIngestionPipeline().then(res => {
    console.log(`[Zokal Server] Initialized with ${res.totalEvents} events.`);
  });
}

// Start automated background ingestion (every 30 minutes)
startBackgroundSync(30 * 60 * 1000);

// =============================================================
// 1. THANET DIRECTORY EVENTS CRUD
// =============================================================

// Get all events (with optional filtering)
app.get('/api/events', (req, res) => {
  let events = loadStoredEvents();
  const { town, category, timeframe, q, featured } = req.query;

  if (town && town !== 'all') {
    events = events.filter(e => e.town && e.town.toLowerCase() === town.toLowerCase());
  }
  if (category && category !== 'all') {
    events = events.filter(e => e.category === category || (e.categoryLabel && e.categoryLabel.toLowerCase().includes(category.toLowerCase())));
  }
  if (timeframe && timeframe !== 'all') {
    events = events.filter(e => e.timeframe === timeframe);
  }
  if (featured === 'true') {
    events = events.filter(e => e.featured === true);
  }
  if (q) {
    const query = q.toLowerCase();
    events = events.filter(e =>
      (e.title && e.title.toLowerCase().includes(query)) ||
      (e.description && e.description.toLowerCase().includes(query)) ||
      (e.venue && e.venue.toLowerCase().includes(query)) ||
      (e.organizer && e.organizer.toLowerCase().includes(query)) ||
      (e.town && e.town.toLowerCase().includes(query)) ||
      (Array.isArray(e.tags) && e.tags.some(t => t.toLowerCase().includes(query)))
    );
  }

  res.json({ success: true, count: events.length, data: events });
});

// Get single event
app.get('/api/events/:id', (req, res) => {
  const events = loadStoredEvents();
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
  res.json({ success: true, data: event });
});

// Post a new community event
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  if (!newEvent || !newEvent.title) {
    return res.status(400).json({ success: false, error: "Missing event title" });
  }

  const existing = loadStoredEvents();
  newEvent.id = newEvent.id || `evt-user-${Date.now()}`;
  newEvent.attendees = Number(newEvent.attendees) || 1;
  newEvent.featured = Boolean(newEvent.featured);
  newEvent.trending = newEvent.trending !== false;
  newEvent.isFree = Boolean(newEvent.isFree);
  if (!newEvent.image) {
    newEvent.image = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';
  }

  existing.unshift(newEvent);
  saveStoredEvents(existing);

  res.status(201).json({ success: true, data: newEvent, event: newEvent, message: 'Event added successfully' });
});

// Update existing event
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const existing = loadStoredEvents();
  const index = existing.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: `Event with ID "${id}" not found` });
  }

  existing[index] = { ...existing[index], ...req.body, id };
  saveStoredEvents(existing);

  res.json({ success: true, data: existing[index], message: 'Event updated successfully' });
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  let existing = loadStoredEvents();
  const initCount = existing.length;
  existing = existing.filter(e => e.id !== id);

  if (existing.length === initCount) {
    return res.status(404).json({ success: false, error: `Event with ID "${id}" not found` });
  }

  saveStoredEvents(existing);
  res.json({ success: true, message: `Event "${id}" removed successfully` });
});

// =============================================================
// 2. THANET VENUES CRUD
// =============================================================

app.get('/api/venues', (req, res) => {
  const venues = loadStoredVenues();
  const { town, q } = req.query;
  let results = venues;

  if (town && town !== 'all') {
    results = results.filter(v => v.town && v.town.toLowerCase() === town.toLowerCase());
  }
  if (q) {
    const query = q.toLowerCase();
    results = results.filter(v =>
      (v.name && v.name.toLowerCase().includes(query)) ||
      (v.address && v.address.toLowerCase().includes(query)) ||
      (v.town && v.town.toLowerCase().includes(query)) ||
      (v.description && v.description.toLowerCase().includes(query))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/venues/:id', (req, res) => {
  const venues = loadStoredVenues();
  const venue = venues.find(v => v.id === req.params.id);
  if (!venue) return res.status(404).json({ success: false, error: 'Venue not found' });
  res.json({ success: true, data: venue });
});

app.post('/api/venues', (req, res) => {
  const newVenue = req.body;
  if (!newVenue || !newVenue.name) {
    return res.status(400).json({ success: false, error: 'Venue name is required' });
  }

  const venues = loadStoredVenues();
  newVenue.id = newVenue.id || newVenue.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24) + '-' + Date.now().toString().slice(-4);
  newVenue.facilities = Array.isArray(newVenue.facilities) ? newVenue.facilities : [];
  newVenue.verified = newVenue.verified !== false;
  if (!newVenue.image) {
    newVenue.image = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80';
  }

  venues.unshift(newVenue);
  saveStoredVenues(venues);

  res.status(201).json({ success: true, data: newVenue, message: 'Venue added successfully' });
});

app.put('/api/venues/:id', (req, res) => {
  const { id } = req.params;
  const venues = loadStoredVenues();
  const idx = venues.findIndex(v => v.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: `Venue "${id}" not found` });
  }

  venues[idx] = { ...venues[idx], ...req.body, id };
  saveStoredVenues(venues);

  res.json({ success: true, data: venues[idx], message: 'Venue updated successfully' });
});

app.delete('/api/venues/:id', (req, res) => {
  const { id } = req.params;
  let venues = loadStoredVenues();
  const prevCount = venues.length;
  venues = venues.filter(v => v.id !== id);

  if (venues.length === prevCount) {
    return res.status(404).json({ success: false, error: `Venue "${id}" not found` });
  }

  saveStoredVenues(venues);
  res.json({ success: true, message: `Venue "${id}" deleted successfully` });
});

// =============================================================
// 3. SCRAPER & INGESTION HUB
// =============================================================

app.post('/api/scrape', async (req, res) => {
  try {
    const result = await runIngestionPipeline();
    res.json({
      success: true,
      newCount: result.newCount,
      totalEvents: result.totalEvents,
      logs: result.logs,
      events: result.events,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/status', (req, res) => {
  const events = loadStoredEvents();
  const venues = loadStoredVenues();
  const arconf = loadArconfData();

  res.json({
    status: "online",
    region: "Thanet (Margate, Ramsgate, Broadstairs)",
    timestamp: new Date().toISOString(),
    backgroundSync: "Active (every 30 mins)",
    totalEvents: events.length,
    totalVenues: venues.length,
    totalPasses: (arconf && arconf.passes ? arconf.passes.length : 0),
    sources: [
      { name: "Hartsdown Park & Thanet Sports Leagues", status: "Active", radius: "3G Pitches & Leisure Centre" },
      { name: "Dreamland Margate Box Office", status: "Active", radius: "Scenic Stage & Hall by the Sea" },
      { name: "Meetup.com Thanet Groups", status: "Active", radius: "15 miles" },
      { name: "Instagram Cultural Feeds", status: "Active", radius: "Margate & Ramsgate" },
      { name: "Facebook Community Events", status: "Active", radius: "Thanet Public Groups" },
      { name: "Eventbrite East Kent", status: "Active", radius: "CT9, CT10, CT11, CT12" }
    ]
  });
});

// =============================================================
// 4. ARCONF CONFERENCE ENDPOINTS (COMPATIBILITY)
// =============================================================

app.get('/api/arconf/state', (req, res) => {
  const db = loadArconfData();
  const events = loadStoredEvents();
  const venues = loadStoredVenues();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  res.json({
    success: true,
    data: {
      settings: db.settings,
      events: events.length > 0 ? events : (db.events || []),
      venues: venues.length > 0 ? venues : (db.venues || []),
      stages: db.stages || {},
      speakers: db.speakers || [],
      poll: formatPollData(db.poll),
      passesCount: (db.passes || []).length,
      mentors: db.mentors || []
    }
  });
});

app.get('/api/arconf/settings', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.settings });
});

app.put('/api/arconf/settings', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  db.settings = { ...db.settings, ...req.body };
  saveArconfData(db);
  res.json({ success: true, data: db.settings, message: 'Settings updated' });
});

app.get('/api/arconf/events', (req, res) => {
  const events = loadStoredEvents();
  res.json({ success: true, count: events.length, data: events });
});

app.post('/api/arconf/events', (req, res) => {
  const newEvent = req.body;
  if (!newEvent || !newEvent.title) {
    return res.status(400).json({ success: false, error: 'Title required' });
  }
  const events = loadStoredEvents();
  newEvent.id = newEvent.id || `evt-${Date.now()}`;
  events.unshift(newEvent);
  saveStoredEvents(events);
  res.status(201).json({ success: true, data: newEvent });
});

app.put('/api/arconf/events/:id', (req, res) => {
  const { id } = req.params;
  const events = loadStoredEvents();
  const idx = events.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Event not found' });
  events[idx] = { ...events[idx], ...req.body, id };
  saveStoredEvents(events);
  res.json({ success: true, data: events[idx] });
});

app.delete('/api/arconf/events/:id', (req, res) => {
  const { id } = req.params;
  let events = loadStoredEvents();
  events = events.filter(e => e.id !== id);
  saveStoredEvents(events);
  res.json({ success: true, message: `Event ${id} deleted` });
});

app.get('/api/arconf/venues', (req, res) => {
  const venues = loadStoredVenues();
  res.json({ success: true, count: venues.length, data: venues });
});

app.post('/api/arconf/venues', (req, res) => {
  const newVenue = req.body;
  const venues = loadStoredVenues();
  newVenue.id = newVenue.id || `ven-${Date.now()}`;
  venues.unshift(newVenue);
  saveStoredVenues(venues);
  res.status(201).json({ success: true, data: newVenue });
});

app.put('/api/arconf/venues/:id', (req, res) => {
  const { id } = req.params;
  const venues = loadStoredVenues();
  const idx = venues.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Venue not found' });
  venues[idx] = { ...venues[idx], ...req.body, id };
  saveStoredVenues(venues);
  res.json({ success: true, data: venues[idx] });
});

app.delete('/api/arconf/venues/:id', (req, res) => {
  const { id } = req.params;
  let venues = loadStoredVenues();
  venues = venues.filter(v => v.id !== id);
  saveStoredVenues(venues);
  res.json({ success: true, message: `Venue ${id} deleted` });
});

app.get('/api/arconf/speakers', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.speakers || [] });
});

app.post('/api/arconf/speakers', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  const spk = req.body;
  spk.id = spk.id || `spk-${Date.now()}`;
  if (!db.speakers) db.speakers = [];
  db.speakers.push(spk);
  saveArconfData(db);
  res.status(201).json({ success: true, data: spk });
});

app.put('/api/arconf/speakers/:id', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  const idx = (db.speakers || []).findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Speaker not found' });
  db.speakers[idx] = { ...db.speakers[idx], ...req.body, id: req.params.id };
  saveArconfData(db);
  res.json({ success: true, data: db.speakers[idx] });
});

app.delete('/api/arconf/speakers/:id', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  db.speakers = (db.speakers || []).filter(s => s.id !== req.params.id);
  saveArconfData(db);
  res.json({ success: true, message: 'Speaker deleted' });
});

app.get('/api/arconf/stages', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.stages || {} });
});

app.put('/api/arconf/stages/:id', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  if (!db.stages || !db.stages[req.params.id]) return res.status(404).json({ success: false, error: 'Stage not found' });
  db.stages[req.params.id] = { ...db.stages[req.params.id], ...req.body };
  saveArconfData(db);
  res.json({ success: true, data: db.stages[req.params.id] });
});

app.get('/api/arconf/poll', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: formatPollData(db.poll) });
});

app.put('/api/arconf/poll', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  const { question, options } = req.body;
  if (question) db.poll.question = question;
  if (Array.isArray(options)) {
    db.poll.options = options.map((opt, i) => ({
      id: opt.id || `opt${i + 1}`,
      label: opt.label || 'Choice',
      votes: typeof opt.votes === 'number' ? opt.votes : 0,
      color: opt.color || (i === 0 ? 'cyan' : i === 1 ? 'yellow' : 'pink')
    }));
  }
  saveArconfData(db);
  res.json({ success: true, data: formatPollData(db.poll) });
});

app.post('/api/arconf/poll/reset', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  (db.poll.options || []).forEach(o => { o.votes = 0; });
  db.poll.totalVotes = 0;
  saveArconfData(db);
  res.json({ success: true, data: formatPollData(db.poll) });
});

app.get('/api/arconf/passes', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, count: (db.passes || []).length, data: db.passes || [] });
});

app.get('/api/arconf/passes/export', (req, res) => {
  const db = loadArconfData();
  if (!db) return res.status(500).send('Database read failed');
  const passes = db.passes || [];
  const headers = ['Badge Number', 'Name', 'Role', 'Tier', 'Theme', 'Claimed At'];
  const rows = passes.map(p => [
    `"${p.badgeNumber || p.id}"`,
    `"${(p.name || '').replace(/"/g, '""')}"`,
    `"${(p.role || '').replace(/"/g, '""')}"`,
    `"${p.tier || ''}"`,
    `"${p.theme || ''}"`,
    `"${p.claimedAt || ''}"`
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="attendees-roster.csv"');
  res.status(200).send(csv);
});

// Restart or start server
app.listen(PORT, () => {
  console.log(`⚡ Unified Directory & CMS Server listening on http://localhost:${PORT}`);
});
