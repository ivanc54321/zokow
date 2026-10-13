// Eventbrite & Public Feed Scraper for Thanet area
export async function scrapeEventbriteEvents() {
  const events = [];
  try {
    const mockCrawled = [
      {
        id: `eventbrite-crawl-1`,
        title: "Broadstairs Clifftop Photography & Golden Hour Walk",
        category: "activity",
        categoryLabel: "Outdoor & Wellness",
        town: "Broadstairs",
        venue: "Louisa Bay to Joss Bay Path",
        date: "2026-10-18",
        dateDisplay: "Sunday, Oct 18",
        time: "16:30 - 18:30",
        timeframe: "upcoming",
        price: "Free",
        isFree: true,
        organizer: "Thanet Camera Club",
        source: "eventbrite",
        sourceName: "Eventbrite",
        sourceUrl: "https://eventbrite.co.uk/e/broadstairs-photo-walk",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        description: "Capture the golden hour light striking the famous chalk headlands. Bring any camera or smartphone. Our group leader gives landscape composition tips.",
        attendees: 15,
        spotsLeft: 5,
        tags: ["Photography", "Walk", "Sunset", "Coast"],
        featured: false,
        trending: true
      }
    ];

    events.push(...mockCrawled);
  } catch (err) {
    console.error("Error scraping Eventbrite:", err.message);
  }
  return events;
}
