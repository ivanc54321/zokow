import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { getEventCoords } from '../data/eventsData';
import { MapPin, Navigation, Calendar, Clock, ExternalLink, X } from 'lucide-react';

export default function ThanetMapView({ events, onSelectEvent, selectedTown, onSelectTown }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [activePreviewEvent, setActivePreviewEvent] = useState(null);

  // Center points for Thanet regions
  const REGION_CENTERS = {
    all: { coords: [51.3680, 1.4100], zoom: 12 },
    Margate: { coords: [51.3880, 1.3850], zoom: 14 },
    Ramsgate: { coords: [51.3360, 1.4200], zoom: 14 },
    Broadstairs: { coords: [51.3600, 1.4400], zoom: 14 }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map with Dark Matter tiles for ultra-stylish look
      const map = L.map(mapContainerRef.current, {
        center: REGION_CENTERS.all.coords,
        zoom: REGION_CENTERS.all.zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Pan to town when changed
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const target = REGION_CENTERS[selectedTown] || REGION_CENTERS.all;
    mapInstanceRef.current.flyTo(target.coords, target.zoom, { duration: 1.2 });
  }, [selectedTown]);

  // Update markers when events change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    events.forEach(evt => {
      const coords = getEventCoords(evt);
      if (!coords) return;

      // Color coding by category
      let pinColor = '#38bdf8'; // Cyan default
      if (evt.category === 'event') pinColor = '#f43f5e'; // Pink / Rose (Dreamland & Music)
      if (evt.category === 'activity') pinColor = '#10b981'; // Emerald (Sports & Hartsdown)
      if (evt.category === 'volunteer') pinColor = '#a855f7'; // Purple (Community)
      if (evt.source === 'dreamland') pinColor = '#f59e0b'; // Amber for Dreamland

      // Custom Leaflet DivIcon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${pinColor};
            width: 28px;
            height: 28px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px ${pinColor}88, 0 2px 6px rgba(0,0,0,0.6);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: #ffffff;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const marker = L.marker(coords, { icon: customIcon });

      marker.on('click', () => {
        setActivePreviewEvent(evt);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo(coords, { animate: true });
        }
      });

      marker.addTo(markersLayerRef.current);
    });
  }, [events]);

  return (
    <div className="thanet-map-view-wrapper">
      {/* Map Town Navigation Bar */}
      <div className="map-town-toolbar">
        <span className="toolbar-label">
          <Navigation size={14} />
          Explore Coastline:
        </span>
        <div className="toolbar-buttons">
          <button 
            className={`map-quick-btn ${selectedTown === 'all' ? 'active' : ''}`}
            onClick={() => onSelectTown('all')}
          >
            All Thanet
          </button>
          <button 
            className={`map-quick-btn ${selectedTown === 'Margate' ? 'active' : ''}`}
            onClick={() => onSelectTown('Margate')}
          >
            Margate
          </button>
          <button 
            className={`map-quick-btn ${selectedTown === 'Ramsgate' ? 'active' : ''}`}
            onClick={() => onSelectTown('Ramsgate')}
          >
            Ramsgate
          </button>
          <button 
            className={`map-quick-btn ${selectedTown === 'Broadstairs' ? 'active' : ''}`}
            onClick={() => onSelectTown('Broadstairs')}
          >
            Broadstairs
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="map-leaflet-container" ref={mapContainerRef}></div>

      {/* Floating Event Preview Card */}
      {activePreviewEvent && (
        <div className="map-floating-preview-card" onClick={() => onSelectEvent(activePreviewEvent)}>
          <button 
            className="preview-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setActivePreviewEvent(null);
            }}
          >
            <X size={16} />
          </button>

          <img 
            src={activePreviewEvent.image} 
            alt={activePreviewEvent.title} 
            className="preview-card-img" 
          />

          <div className="preview-card-details">
            <span className="preview-card-badge">{activePreviewEvent.categoryLabel}</span>
            <h4 className="preview-card-title">{activePreviewEvent.title}</h4>
            <p className="preview-card-venue">
              <MapPin size={12} />
              {activePreviewEvent.venue}
            </p>
            <div className="preview-card-time">
              <span><Calendar size={12} /> {activePreviewEvent.dateDisplay}</span>
              <span><Clock size={12} /> {activePreviewEvent.time.split(' - ')[0]}</span>
            </div>
            <div className="preview-card-footer">
              <span className="preview-card-price">{activePreviewEvent.price}</span>
              <span className="preview-card-cta">View Details &rarr;</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="map-legend-card">
        <div className="legend-item"><span className="legend-dot pink"></span> Live Music & Dreamland</div>
        <div className="legend-item"><span className="legend-dot green"></span> Sports & Hartsdown 5-a-Side</div>
        <div className="legend-item"><span className="legend-dot cyan"></span> Social & Meetups</div>
        <div className="legend-item"><span className="legend-dot purple"></span> Community & Volunteering</div>
      </div>
    </div>
  );
}
