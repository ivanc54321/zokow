import express from 'express';
import cors from 'cors';
import { loadStoredEvents, saveStoredEvents, runIngestionPipeline, startBackgroundSync } from './services/aggregator.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize store with seed data if empty
let currentEvents = loadStoredEvents();
if (currentEvents.length === 0) {
  // Run first ingestion
  runIngestionPipeline().then(res => {
    console.log(`[Zokal Server] Initialized with ${res.totalEvents} events.`);
  });
}

// Start automated background ingestion (every 30 minutes)
startBackgroundSync(30 * 60 * 1000);

// 1. Get all events
app.get('/api/events', (req, res) => {
  const events = loadStoredEvents();
  res.json({ success: true, count: events.length, data: events });
});

// 2. Trigger scraper ingestion
app.post('/api/scrape', async (req, res) => {
  try {
    const result = await runIngestionPipeline();
    res.json({
      success: true,
      newCount: result.newCount,
      totalEvents: result.totalEvents,
      logs: result.logs,
      events: result.events
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Post a new community event
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  if (!newEvent || !newEvent.title) {
    return res.status(400).json({ success: false, error: "Missing event title" });
  }

  const existing = loadStoredEvents();
  existing.unshift(newEvent);
  saveStoredEvents(existing);

  res.status(201).json({ success: true, event: newEvent });
});

// 4. Thanet Venues API
const VENUES_DATA = [
  {
    id: "dreamland",
    name: "Dreamland Margate",
    town: "Margate",
    address: "Marine Terrace, Margate CT9 1XJ",
    facilities: ["Hall By The Sea (1,400 cap)", "Scenic Stage (7,000 cap)", "Roller Room", "Food Court"]
  },
  {
    id: "hartsdown",
    name: "Hartsdown Park & Leisure Centre",
    town: "Margate",
    address: "Hartsdown Road, Margate CT9 5QZ",
    facilities: ["3G Floodlit All-Weather Pitches", "Indoor Sports Hall", "Clubhouse & Bar"]
  },
  {
    id: "walpole",
    name: "Walpole Bay Tidal Pool",
    town: "Margate",
    address: "Eastern Esplanade, Cliftonville, Margate CT9 2HE",
    facilities: ["Free Public Access", "Fresh Sea Water", "Cliff Promenade", "Sauna Pop-ups"]
  },
  {
    id: "turner",
    name: "Turner Contemporary",
    town: "Margate",
    address: "Rendezvous, Margate CT9 1HG",
    facilities: ["Free Admission", "Gallery Shop", "Cafe & Bar", "Kids Workshops"]
  },
  {
    id: "ramsgatemusichall",
    name: "Ramsgate Music Hall",
    town: "Ramsgate",
    address: "13 Turner Street, Ramsgate CT11 8NJ",
    facilities: ["Intimate 140-Cap Stage", "Craft Beer Bar", "Harbour Proximity"]
  }
];

app.get('/api/venues', (req, res) => {
  res.json({ success: true, count: VENUES_DATA.length, data: VENUES_DATA });
});

app.get('/api/venues/:id', (req, res) => {
  const venue = VENUES_DATA.find(v => v.id === req.params.id);
  if (!venue) {
    return res.status(404).json({ success: false, error: "Venue not found" });
  }
  res.json({ success: true, data: venue });
});

// 5. Sources status
app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    region: "Thanet (Margate, Ramsgate, Broadstairs)",
    timestamp: new Date().toISOString(),
    backgroundSync: "Active (every 30 mins)",
    sources: [
      { name: "Hartsdown Park & Thanet Sports Leagues", status: "Active", radius: "3G Pitches & Leisure Centre" },
      { name: "Dreamland Margate Box Office", status: "Active", radius: "Scenic Stage & Hall by the Sea" },
      { name: "Meetup.com", status: "Active", radius: "15 miles" },
      { name: "Instagram Cultural Feeds", status: "Active", radius: "Margate & Ramsgate" },
      { name: "Facebook Events", status: "Active", radius: "Thanet Public Groups" },
      { name: "Eventbrite", status: "Active", radius: "CT9, CT10, CT11, CT12" }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Zokal Ingestion & API Server listening on http://localhost:${PORT}`);
});

