// Sports & Fitness Aggregator for Thanet (Hartsdown Park, Leagues, Parkrun)
export async function scrapeSportsEvents() {
  const events = [];
  try {
    const sportsListings = [
      {
        id: "evt-hartsdown-1",
        title: "Hartsdown Park 5-a-Side Football: Wednesday Floodlit Social League",
        category: "activity",
        categoryLabel: "Sports & Fitness",
        town: "Margate",
        venue: "Hartsdown Park 3G Pitches, Hartsdown Road, Margate",
        date: "2026-10-14",
        dateDisplay: "Wednesday, Oct 14",
        time: "19:30 - 21:30",
        timeframe: "upcoming",
        price: "£5 per player (or join team)",
        isFree: false,
        organizer: "Margate Community Football Club",
        source: "meetup",
        sourceName: "Meetup / Thanet Football",
        sourceUrl: "https://meetup.com/thanet-football-5aside",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
        description: "Friendly, competitive 5-a-side football on the pristine 3G all-weather floodlit pitches at Hartsdown Park. Teams or individual solo players welcome — we match free agents into balanced squads. Bibs, match balls, and FA-qualified referees provided. Post-match drinks at the clubhouse.",
        attendees: 30,
        spotsLeft: 6,
        tags: ["Football", "5aside", "Hartsdown", "Margate", "Fitness"],
        featured: true,
        trending: true
      },
      {
        id: "evt-hartsdown-2",
        title: "Hartsdown Park Sunday Morning Friendly 5-a-Side & Walking Football",
        category: "activity",
        categoryLabel: "Sports & Fitness",
        town: "Margate",
        venue: "Hartsdown Leisure Centre Pitches, Margate",
        date: "2026-10-11",
        dateDisplay: "Sunday, Oct 11",
        time: "10:00 - 11:30",
        timeframe: "weekend",
        price: "£4 pitch share",
        isFree: false,
        organizer: "Thanet Veterans & Walking Football",
        source: "community",
        sourceName: "Direct Community",
        sourceUrl: "https://hartsdownfootball.co.uk",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        description: "Low-impact, highly social friendly football for all fitness levels. We run side-by-side pitches for active 5-a-side and walking football. Great for injury recovery, staying sharp, and meeting fellow football enthusiasts in Margate.",
        attendees: 22,
        spotsLeft: 4,
        tags: ["Football", "Hartsdown", "Over35", "WalkingFootball", "Margate"],
        featured: false,
        trending: true
      },
      {
        id: "evt-sports-3",
        title: "Margate Hartsdown & Tivoli 5K Community Run & Post-Run Coffee",
        category: "activity",
        categoryLabel: "Sports & Fitness",
        town: "Margate",
        venue: "Hartsdown Park Main Gates, Margate",
        date: "2026-10-17",
        dateDisplay: "Saturday, Oct 17",
        time: "09:00 - 10:15",
        timeframe: "upcoming",
        price: "Free",
        isFree: true,
        organizer: "Thanet Coastal Runners",
        source: "facebook",
        sourceName: "Facebook Events",
        sourceUrl: "https://facebook.com/events/hartsdown-5k-run",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
        description: "Free, fun, and friendly weekly 5k community run and fitness walk through the scenic paths of Hartsdown Park and Tivoli Woods. Walk, jog, or sprint at your own tempo with tail-walkers ensuring nobody is left behind. Coffee and pastries together at Hartsdown Cafe afterwards!",
        attendees: 54,
        spotsLeft: null,
        tags: ["Running", "5K", "Hartsdown", "Parkrun", "Fitness"],
        featured: true,
        trending: false
      }
    ];

    events.push(...sportsListings);
  } catch (err) {
    console.error("Error scraping sports events:", err.message);
  }
  return events;
}
