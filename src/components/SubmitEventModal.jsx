import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Image, Link, Calendar, MapPin } from 'lucide-react';
import { TOWNS } from '../data/eventsData';

export default function SubmitEventModal({ isOpen, onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'meetup',
    town: 'Margate',
    venue: '',
    date: '2026-10-17',
    time: '18:00 - 20:00',
    price: 'Free',
    organizer: '',
    source: 'community',
    sourceUrl: '',
    image: '',
    description: '',
    tags: 'Local, Social'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) return;

    const newEvent = {
      id: `evt-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      categoryLabel: 
        formData.category === 'meetup' ? 'Meetup & Networking' :
        formData.category === 'activity' ? 'Outdoor & Wellness' :
        formData.category === 'event' ? 'Live Music & Arts' : 'Volunteering & Community',
      town: formData.town,
      venue: formData.venue,
      date: formData.date,
      dateDisplay: new Date(formData.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: formData.time,
      timeframe: 'upcoming',
      price: formData.price || 'Free',
      isFree: formData.price.toLowerCase().includes('free'),
      organizer: formData.organizer || 'Community Organizer',
      source: formData.source,
      sourceName: 
        formData.source === 'meetup' ? 'Meetup.com' :
        formData.source === 'instagram' ? 'Instagram' :
        formData.source === 'facebook' ? 'Facebook Events' :
        formData.source === 'eventbrite' ? 'Eventbrite' : 'Community Submission',
      sourceUrl: formData.sourceUrl || '#',
      image: formData.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: formData.description || 'Join us for this exciting local Thanet gathering!',
      attendees: 1,
      spotsLeft: 20,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: false,
      trending: true
    };

    onAddEvent(newEvent);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog form-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header-area">
          <div className="submit-icon-circle">
            <PlusCircle size={24} />
          </div>
          <h2 className="modal-heading">Post a Local Event or Activity</h2>
          <p className="modal-subtext">
            Add your meetup, volunteer session, gig, or social circle to the Thanet directory.
          </p>
        </div>

        {submitted ? (
          <div className="submit-success-state">
            <CheckCircle size={56} className="success-icon" />
            <h3>Event Added to Zokal!</h3>
            <p>Your listing is now live in the Thanet directory feed.</p>
          </div>
        ) : (
          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Title *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Walpole Bay Sunset Acoustic Jam"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="meetup">Meetup & Networking</option>
                  <option value="activity">Activities & Sports</option>
                  <option value="event">Arts, Music & Nights</option>
                  <option value="volunteer">Volunteering & Community</option>
                </select>
              </div>

              <div className="form-group">
                <label>Town / Area</label>
                <select 
                  value={formData.town}
                  onChange={e => setFormData({ ...formData, town: e.target.value })}
                >
                  {TOWNS.filter(t => t.id !== 'all').map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Venue / Location *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Margate Harbour Arm or Royal Harbour Marina"
                value={formData.venue}
                onChange={e => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 18:30 - 21:00"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Cost / Admission</label>
                <input 
                  type="text" 
                  placeholder="e.g. Free or £5"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Host / Organizer</label>
                <input 
                  type="text" 
                  placeholder="e.g. Thanet Social Club"
                  value={formData.organizer}
                  onChange={e => setFormData({ ...formData, organizer: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Aggregated Source</label>
                <select 
                  value={formData.source}
                  onChange={e => setFormData({ ...formData, source: e.target.value })}
                >
                  <option value="community">Direct Local Submission</option>
                  <option value="meetup">Meetup.com</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="eventbrite">Eventbrite</option>
                </select>
              </div>

              <div className="form-group">
                <label>Original Link / RSVP URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={formData.sourceUrl}
                  onChange={e => setFormData({ ...formData, sourceUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Cover Photo Image URL (Optional)</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                rows="3" 
                placeholder="Tell locals what to expect, what to bring, and how to spot the group..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input 
                type="text" 
                placeholder="Beach, Music, Coffee, Outdoor"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="form-actions-bar">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit-action">
                Publish Event to Directory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
