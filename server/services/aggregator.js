import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeMeetupEvents } from '../scrapers/meetupScraper.js';
import { scrapeEventbriteEvents } from '../scrapers/eventbriteScraper.js';
import { scrapeDreamlandEvents } from '../scrapers/dreamlandScraper.js';
import { scrapeSportsEvents } from '../scrapers/sportsScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'events.json');

// Ensure directory exists
const dir = path.dirname(DATA_FILE);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export function loadStoredEvents() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error("Error reading stored events:", e);
    }
  }
  return [];
}

export function saveStoredEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2), 'utf-8');
}

/**
 * Auto-archive events whose date is before today
 */
export function archivePastEvents(events) {
  const todayStr = new Date().toISOString().split('T')[0];
  return events.map(evt => {
    if (evt.date && evt.date < todayStr) {
      return { ...evt, archived: true };
    }
    return evt;
  });
}

export async function runIngestionPipeline() {
  const logs = [];
  const timestamp = () => new Date().toISOString().split('T')[1].slice(0, 8);
  logs.push(`[${timestamp()}] Starting ingestion across Thanet event sources...`);

  // Run scrapers concurrently
  const [meetupResults, eventbriteResults, dreamlandResults, sportsResults] = await Promise.all([
    scrapeMeetupEvents(),
    scrapeEventbriteEvents(),
    scrapeDreamlandEvents(),
    scrapeSportsEvents()
  ]);

  logs.push(`[${timestamp()}] Meetup scraper found ${meetupResults.length} events.`);
  logs.push(`[${timestamp()}] Eventbrite scraper found ${eventbriteResults.length} events.`);
  logs.push(`[${timestamp()}] Dreamland Margate crawler found ${dreamlandResults.length} live gigs & sessions.`);
  logs.push(`[${timestamp()}] Hartsdown Park & Sports crawler found ${sportsResults.length} matches & sessions.`);

  const scraped = [...dreamlandResults, ...sportsResults, ...meetupResults, ...eventbriteResults];
  let existing = loadStoredEvents();

  // Deduplicate by title & date
  let newCount = 0;
  for (const item of scraped) {
    const exists = existing.some(
      e => e.title.toLowerCase().trim() === item.title.toLowerCase().trim() && e.date === item.date
    );
    if (!exists) {
      existing.unshift(item);
      newCount++;
    }
  }

  // Auto-archive past events
  existing = archivePastEvents(existing);
  saveStoredEvents(existing);
  logs.push(`[${timestamp()}] Ingestion complete. Added ${newCount} new unique events.`);

  return {
    logs,
    newCount,
    totalEvents: existing.length,
    events: existing
  };
}

let syncTimer = null;

export function startBackgroundSync(intervalMs = 30 * 60 * 1000) {
  if (syncTimer) clearInterval(syncTimer);
  console.log(`[Zokal Aggregator] Background sync active (every ${intervalMs / 60000} minutes).`);
  syncTimer = setInterval(async () => {
    console.log(`[Zokal Aggregator] Running scheduled background event sync...`);
    try {
      const res = await runIngestionPipeline();
      console.log(`[Zokal Aggregator] Scheduled sync finished. Total events: ${res.totalEvents}`);
    } catch (err) {
      console.error(`[Zokal Aggregator] Scheduled sync error:`, err.message);
    }
  }, intervalMs);
}

