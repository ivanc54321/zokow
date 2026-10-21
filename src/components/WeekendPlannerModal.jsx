import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  Share2, 
  Trash2, 
  Sparkles, 
  Check, 
  Plus, 
  Compass,
  ArrowRight
} from 'lucide-react';

export default function WeekendPlannerModal({ 
  isOpen, 
  onClose, 
  events, 
  itineraryIds, 
  onToggleItinerary, 
  onSelectEvent 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const plannedEvents = events.filter(e => itineraryIds.includes(e.id));

  // Group events by day / time of day
  const saturdayEvents = plannedEvents.filter(e => {
    const disp = (e.dateDisplay || '').toLowerCase();
    const d = e.date || '';
    return disp.includes('sat') || d === '2026-10-10' || d === '2026-10-17' || d === '2026-10-24';
  });
  const sundayEvents = plannedEvents.filter(e => {
    const disp = (e.dateDisplay || '').toLowerCase();
    const d = e.date || '';
    return disp.includes('sun') || d === '2026-10-11' || d === '2026-10-18';
  });
  const otherEvents = plannedEvents.filter(e => !saturdayEvents.includes(e) && !sundayEvents.includes(e));

  // Recommended additions for the weekend
  const weekendSuggestions = events
    .filter(e => !itineraryIds.includes(e.id) && (e.timeframe === 'weekend' || e.timeframe === 'today'))
    .slice(0, 4);

  const handleExportICS = () => {
    if (plannedEvents.length === 0) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Verge//Thanet Weekend Planner//EN'
    ];

    plannedEvents.forEach(evt => {
      const cleanDate = (evt.date || '2026-10-11').replace(/-/g, '');
      const desc = (evt.description || '').replace(/\n/g, ' ');
      icsContent.push(
        'BEGIN:VEVENT',
        `SUMMARY:${evt.title || 'Thanet Event'}`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${evt.venue || 'Thanet'}, ${evt.town || 'Kent'}, Kent`,
        `DTSTART:${cleanDate}T100000Z`,
        `DTEND:${cleanDate}T120000Z`,
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'thanet-weekend-itinerary.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareItinerary = () => {
    const textLines = [
      '🌊 My Thanet Weekend Plan (via Verge):',
      ''
    ];

    plannedEvents.forEach(e => {
      textLines.push(`• ${e.dateDisplay || e.date || 'Upcoming'} (${e.time || 'TBD'}): ${e.title || 'Event'} @ ${e.venue || 'Thanet'}`);
    });

    textLines.push('');
    textLines.push('Plan yours on Verge: http://localhost:5173/');

    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog planner-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="planner-modal-header">
          <div className="planner-icon-badge">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="planner-modal-title">Your Thanet Weekend Planner</h2>
            <p className="planner-modal-sub">
              Curate your seaside schedule across Margate, Ramsgate & Broadstairs.
            </p>
          </div>
        </div>

        {/* Action Header */}
        <div className="planner-toolbar">
          <div className="planner-count-tag">
            <strong>{plannedEvents.length}</strong> events scheduled
          </div>
          <div className="planner-action-btns">
            <button 
              className="planner-tool-btn" 
              onClick={handleExportICS}
              disabled={plannedEvents.length === 0}
            >
              <Download size={14} />
              <span>Export All to Cal</span>
            </button>
            <button 
              className="planner-tool-btn" 
              onClick={handleShareItinerary}
              disabled={plannedEvents.length === 0}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
              <span>{copied ? "Copied!" : "Share Schedule"}</span>
            </button>
          </div>
        </div>

        {plannedEvents.length === 0 ? (
          <div className="planner-empty-state">
            <Compass size={44} className="planner-empty-icon" />
            <h3>Your weekend is currently open!</h3>
            <p>Add events from the suggestions below or browse the directory to build your ideal coastal weekend.</p>
          </div>
        ) : (
          <div className="itinerary-timeline">
            {/* Saturday Column / Block */}
            {saturdayEvents.length > 0 && (
              <div className="timeline-day-group">
                <div className="day-badge saturday">
                  <span>Saturday</span>
                </div>
                <div className="day-events-list">
                  {saturdayEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className="itinerary-card"
                      onClick={() => onSelectEvent(evt)}
                    >
                      <img src={evt.image} alt={evt.title} className="itinerary-thumb" />
                      <div className="itinerary-info">
                        <div className="itinerary-time">
                          <Clock size={12} />
                          {evt.time} • {evt.town}
                        </div>
                        <h4 className="itinerary-title">{evt.title}</h4>
                        <div className="itinerary-venue">
                          <MapPin size={11} />
                          {evt.venue}
                        </div>
                      </div>
                      <button 
                        className="itinerary-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleItinerary(evt.id);
                        }}
                        title="Remove from weekend"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sunday Column / Block */}
            {sundayEvents.length > 0 && (
              <div className="timeline-day-group">
                <div className="day-badge sunday">
                  <span>Sunday</span>
                </div>
                <div className="day-events-list">
                  {sundayEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className="itinerary-card"
                      onClick={() => onSelectEvent(evt)}
                    >
                      <img src={evt.image} alt={evt.title} className="itinerary-thumb" />
                      <div className="itinerary-info">
                        <div className="itinerary-time">
                          <Clock size={12} />
                          {evt.time} • {evt.town}
                        </div>
                        <h4 className="itinerary-title">{evt.title}</h4>
                        <div className="itinerary-venue">
                          <MapPin size={11} />
                          {evt.venue}
                        </div>
                      </div>
                      <button 
                        className="itinerary-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleItinerary(evt.id);
                        }}
                        title="Remove from weekend"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other days */}
            {otherEvents.length > 0 && (
              <div className="timeline-day-group">
                <div className="day-badge weekday">
                  <span>Upcoming Days</span>
                </div>
                <div className="day-events-list">
                  {otherEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className="itinerary-card"
                      onClick={() => onSelectEvent(evt)}
                    >
                      <img src={evt.image} alt={evt.title} className="itinerary-thumb" />
                      <div className="itinerary-info">
                        <div className="itinerary-time">
                          <Clock size={12} />
                          {evt.dateDisplay} • {evt.time}
                        </div>
                        <h4 className="itinerary-title">{evt.title}</h4>
                        <div className="itinerary-venue">
                          <MapPin size={11} />
                          {evt.venue}
                        </div>
                      </div>
                      <button 
                        className="itinerary-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleItinerary(evt.id);
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Weekend Suggestions Drawer */}
        {weekendSuggestions.length > 0 && (
          <div className="planner-suggestions-section">
            <h4 className="suggestions-title">
              <Sparkles size={15} />
              Recommended to Add to Your Weekend:
            </h4>
            <div className="suggestions-grid">
              {weekendSuggestions.map(evt => (
                <div key={evt.id} className="suggestion-item">
                  <img src={evt.image} alt={evt.title} className="sugg-thumb" />
                  <div className="sugg-content">
                    <span className="sugg-date">{evt.dateDisplay}</span>
                    <strong className="sugg-title">{evt.title}</strong>
                    <span className="sugg-venue">{evt.venue}</span>
                  </div>
                  <button 
                    className="sugg-add-btn"
                    onClick={() => onToggleItinerary(evt.id)}
                    title="Add to weekend plan"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
