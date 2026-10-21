import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'arconf-data.json');
const ROOT_DIR = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Helper to safely load data
function getDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      throw new Error(`Data file not found at ${DATA_FILE}`);
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading arconf-data.json:', err);
    return null;
  }
}

// Helper to safely write data atomically
function saveDb(data) {
  try {
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (err) {
    console.error('Error saving arconf-data.json:', err);
    return false;
  }
}

// Recalculate poll percentages dynamically
function formatPollData(poll) {
  if (!poll) return null;
  const total = poll.options.reduce((acc, opt) => acc + (opt.votes || 0), 0);
  const optionsWithPercent = poll.options.map(opt => ({
    ...opt,
    percent: total > 0 ? Math.round((opt.votes / total) * 100) : 0
  }));
  return {
    ...poll,
    totalVotes: total,
    options: optionsWithPercent
  };
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. Get complete unified site state
app.get('/api/arconf/state', (req, res) => {
  const db = getDb();
  if (!db) {
    return res.status(500).json({ success: false, error: 'Database read failed' });
  }
  res.json({
    success: true,
    data: {
      settings: db.settings,
      events: db.events || [],
      venues: db.venues || [],
      stages: db.stages || {},
      speakers: db.speakers || [],
      poll: formatPollData(db.poll),
      passesCount: (db.passes || []).length,
      mentors: db.mentors || []
    }
  });
});

// 1b. Thanet Events Endpoints
app.get('/api/arconf/events', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  let results = db.events || [];
  const { town, category, timeframe, q } = req.query;

  if (town && town !== 'all') {
    results = results.filter(e => e.town && e.town.toLowerCase() === town.toLowerCase());
  }
  if (category && category !== 'all') {
    results = results.filter(e => e.category === category || e.categoryLabel?.toLowerCase().includes(category.toLowerCase()));
  }
  if (timeframe && timeframe !== 'all') {
    results = results.filter(e => e.timeframe === timeframe);
  }
  if (q) {
    const query = q.toLowerCase();
    results = results.filter(e => 
      e.title.toLowerCase().includes(query) || 
      e.description?.toLowerCase().includes(query) ||
      e.venue?.toLowerCase().includes(query) ||
      e.organizer?.toLowerCase().includes(query) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(query)))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/arconf/events', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const newEvent = req.body;
  if (!newEvent || !newEvent.title) {
    return res.status(400).json({ success: false, error: 'Event title is required' });
  }

  newEvent.id = newEvent.id || `evt-user-${Date.now()}`;
  newEvent.attendees = newEvent.attendees || 1;
  newEvent.featured = false;
  newEvent.trending = true;
  if (!newEvent.image) {
    newEvent.image = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';
  }

  if (!db.events) db.events = [];
  db.events.unshift(newEvent);
  saveDb(db);

  res.status(201).json({ success: true, data: newEvent, message: 'Event added to directory' });
});

app.put('/api/arconf/events/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (!db.events) db.events = [];
  const idx = db.events.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: `Event "${id}" not found` });

  db.events[idx] = { ...db.events[idx], ...req.body, id };
  saveDb(db);
  res.json({ success: true, data: db.events[idx], message: 'Event updated successfully' });
});

app.delete('/api/arconf/events/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (!db.events) db.events = [];
  const prevCount = db.events.length;
  db.events = db.events.filter(e => e.id !== id);

  if (db.events.length === prevCount) {
    return res.status(404).json({ success: false, error: `Event "${id}" not found` });
  }

  saveDb(db);
  res.json({ success: true, message: `Event "${id}" removed successfully` });
});

// 1c. Thanet Venues Endpoints
app.get('/api/arconf/venues', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, count: (db.venues || []).length, data: db.venues || [] });
});

app.post('/api/arconf/venues', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const newVenue = req.body;
  if (!newVenue || !newVenue.name) {
    return res.status(400).json({ success: false, error: 'Venue name is required' });
  }

  if (!db.venues) db.venues = [];
  newVenue.id = newVenue.id || `ven-${Date.now()}`;
  db.venues.unshift(newVenue);
  saveDb(db);

  res.status(201).json({ success: true, data: newVenue, message: 'Venue added successfully' });
});

app.put('/api/arconf/venues/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (!db.venues) db.venues = [];
  const idx = db.venues.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: `Venue "${id}" not found` });

  db.venues[idx] = { ...db.venues[idx], ...req.body, id };
  saveDb(db);
  res.json({ success: true, data: db.venues[idx], message: 'Venue updated successfully' });
});

app.delete('/api/arconf/venues/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (!db.venues) db.venues = [];
  db.venues = db.venues.filter(v => v.id !== id);
  saveDb(db);
  res.json({ success: true, message: `Venue "${id}" removed successfully` });
});

// 1d. Event RSVP / Pass Claim
app.post('/api/arconf/events/rsvp', (req, res) => {
  const { eventId, attendeeName, email } = req.body;
  if (!eventId) {
    return res.status(400).json({ success: false, error: 'Missing eventId' });
  }

  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const evt = (db.events || []).find(e => e.id === eventId);
  if (!evt) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }

  evt.attendees = (evt.attendees || 0) + 1;
  if (evt.spotsLeft !== null && evt.spotsLeft !== undefined && evt.spotsLeft > 0) {
    evt.spotsLeft -= 1;
  }

  const passId = `PASS-${Math.floor(1000 + Math.random() * 9000)}-${evt.town ? evt.town.slice(0, 3).toUpperCase() : 'THA'}`;
  const passRecord = {
    id: passId,
    eventId: evt.id,
    eventTitle: evt.title,
    venue: evt.venue,
    town: evt.town,
    dateDisplay: evt.dateDisplay,
    name: (attendeeName || 'Community Member').trim(),
    email: (email || '').trim(),
    claimedAt: new Date().toISOString()
  };

  if (!db.passes) db.passes = [];
  db.passes.unshift(passRecord);
  saveDb(db);

  res.json({
    success: true,
    data: passRecord,
    updatedAttendees: evt.attendees,
    spotsLeft: evt.spotsLeft,
    message: 'RSVP confirmed'
  });
});

// 2. Global Settings
app.get('/api/arconf/settings', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.settings });
});

app.put('/api/arconf/settings', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ success: true, data: db.settings, message: 'Settings updated successfully' });
});

// 3. Stages
app.get('/api/arconf/stages', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.stages });
});

app.put('/api/arconf/stages/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (!db.stages[id]) {
    return res.status(404).json({ success: false, error: `Stage ${id} not found` });
  }

  db.stages[id] = { ...db.stages[id], ...req.body, id };
  saveDb(db);
  res.json({ success: true, data: db.stages[id], message: `Stage ${id} updated` });
});

// 4. Speakers CRUD
app.get('/api/arconf/speakers', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: db.speakers });
});

app.post('/api/arconf/speakers', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const { name, role, track, title, desc, img, trackBg, trackColor, stageId, badge, time } = req.body;
  if (!name || !title) {
    return res.status(400).json({ success: false, error: 'Speaker name and session title are required' });
  }

  const id = req.body.id || name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) + '-' + Date.now().toString().slice(-4);
  const newSpeaker = {
    id,
    name,
    role: role || 'Speaker',
    track: track || 'General Track',
    stageId: stageId || 'teal',
    trackBg: trackBg || '#0097a8',
    trackColor: trackColor || '#ffffff',
    badge: badge || 'Speaker',
    img: img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    title,
    desc: desc || '',
    time: time || '7:00 PM GMT'
  };

  db.speakers.push(newSpeaker);
  saveDb(db);
  res.status(201).json({ success: true, data: newSpeaker, message: 'Speaker added successfully' });
});

app.put('/api/arconf/speakers/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const index = db.speakers.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: `Speaker ${id} not found` });
  }

  db.speakers[index] = { ...db.speakers[index], ...req.body, id };
  saveDb(db);
  res.json({ success: true, data: db.speakers[index], message: 'Speaker updated' });
});

app.delete('/api/arconf/speakers/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const initialLen = db.speakers.length;
  db.speakers = db.speakers.filter(s => s.id !== id);
  if (db.speakers.length === initialLen) {
    return res.status(404).json({ success: false, error: `Speaker ${id} not found` });
  }

  saveDb(db);
  res.json({ success: true, message: `Speaker ${id} deleted` });
});

// 5. Interactive Live Poll
app.get('/api/arconf/poll', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, data: formatPollData(db.poll) });
});

app.post('/api/arconf/poll/vote', (req, res) => {
  const { optionId } = req.body;
  if (!optionId) {
    return res.status(400).json({ success: false, error: 'Missing optionId' });
  }

  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const option = db.poll.options.find(opt => opt.id === optionId);
  if (!option) {
    return res.status(404).json({ success: false, error: `Poll option ${optionId} not found` });
  }

  option.votes = (option.votes || 0) + 1;
  db.poll.totalVotes = (db.poll.totalVotes || 0) + 1;
  saveDb(db);

  res.json({ success: true, data: formatPollData(db.poll), message: 'Vote recorded' });
});

app.post('/api/arconf/poll/reset', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  db.poll.options.forEach(opt => { opt.votes = 0; });
  db.poll.totalVotes = 0;
  saveDb(db);

  res.json({ success: true, data: formatPollData(db.poll), message: 'Poll votes reset' });
});

app.put('/api/arconf/poll', (req, res) => {
  const db = getDb();
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
  saveDb(db);
  res.json({ success: true, data: formatPollData(db.poll), message: 'Poll updated' });
});

// 6. Accreditation Passes & Registrations
app.get('/api/arconf/passes', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({ success: true, count: db.passes.length, data: db.passes });
});

app.post('/api/arconf/passes', (req, res) => {
  const { name, role, theme, tier } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, error: 'Attendee name is required' });
  }

  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  const sequence = 8940 + (db.passes ? db.passes.length : 0) + Math.floor(Math.random() * 9);
  const badgeNumber = `${sequence}-2026-AR`;
  const newPass = {
    id: `PASS-${sequence}`,
    name: name.trim(),
    role: (role || 'Attendee').trim(),
    theme: theme || 'holo',
    tier: tier || 'ALL-ACCESS PASS',
    badgeNumber,
    claimedAt: new Date().toISOString()
  };

  if (!db.passes) db.passes = [];
  db.passes.unshift(newPass);
  db.settings.confirmedCount = (db.settings.confirmedCount || 3840) + 1;
  saveDb(db);

  res.status(201).json({
    success: true,
    data: newPass,
    confirmedCount: db.settings.confirmedCount,
    message: 'Accreditation Pass registered successfully'
  });
});

// CSV Export for Passes
app.get('/api/arconf/passes/export', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).send('Database read failed');

  const passes = db.passes || [];
  const headers = ['Badge Number', 'Name', 'Role', 'Tier', 'Theme', 'Claimed At'];
  const rows = passes.map(p => [
    `"${p.badgeNumber}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.role.replace(/"/g, '""')}"`,
    `"${p.tier}"`,
    `"${p.theme}"`,
    `"${p.claimedAt}"`
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="arconf-attendees-2026.csv"');
  res.status(200).send(csv);
});

// 7. Collab Lounge & Mentors
app.get('/api/arconf/lounge', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });
  res.json({
    success: true,
    data: {
      stage: db.stages.yellow,
      mentors: db.mentors || []
    }
  });
});

app.put('/api/arconf/lounge', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  if (req.body.stage) {
    db.stages.yellow = { ...db.stages.yellow, ...req.body.stage };
  }
  if (Array.isArray(req.body.mentors)) {
    db.mentors = req.body.mentors;
  }
  saveDb(db);
  res.json({ success: true, message: 'Lounge and mentors updated' });
});

// 8. Health check & Stats
app.get('/api/arconf/stats', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).json({ success: false, error: 'Database read failed' });

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    totalSpeakers: (db.speakers || []).length,
    totalPassesClaimed: (db.passes || []).length,
    confirmedAttendees: db.settings.confirmedCount || 3840,
    pollVotes: db.poll ? db.poll.totalVotes : 0,
    registrationOpen: db.settings.registrationOpen !== false
  });
});

// -------------------------------------------------------------
// STATIC FILES & ADMIN PORTAL
// -------------------------------------------------------------
app.use(express.static(ROOT_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'arconf.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ ARCONF Control Server is running on port ${PORT}`);
  console.log(`   Public Site: http://localhost:${PORT}/arconf.html`);
  console.log(`   Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`   API State:   http://localhost:${PORT}/api/arconf/state`);
  console.log(`======================================================\n`);
});
