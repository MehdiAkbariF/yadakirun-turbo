"use client";

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Locate, Loader2, X, MapPin, Navigation } from 'lucide-react'; // Navigation اضافه شد
import { MapSelectorProps } from './MapSelector.types';
import { mapService, SearchResult } from '@monorepo/api-client/src/services/mapService';
import { Input } from '../../atoms/Input/Input';
import './MapSelector.scss';
import { Label } from '../../atoms/Label/Label';

// --- هوک Debounce ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const fixLeafletIcon = () => {
  try {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    });
  } catch (error) {
    console.error('Leaflet icon fix error:', error);
  }
};

export const MapSelector = ({
  defaultLocation = { lat: 35.6892, lng: 51.3890 },
  onLocationChange,
  height = '300px',
  zoom = 13,
  className,
  readOnly = false,
  showNavigationButton = false, // پراپ جدید
}: MapSelectorProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onLocationChangeRef = useRef(onLocationChange);

  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isResultSelected, setIsResultSelected] = useState(false);

  const debouncedSearchTerm = useDebounce(searchQuery, 800);

  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  // --- Map Initialization ---
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    fixLeafletIcon();

    const map = L.map(mapContainerRef.current, {
      center: [defaultLocation.lat, defaultLocation.lng],
      zoom: zoom,
      scrollWheelZoom: !readOnly,
      dragging: !readOnly,
      tap: !readOnly,
      zoomControl: false, 
      attributionControl: false,
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    L.control.attribution({
      prefix: false, 
      position: 'bottomright',
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'نقشه اختصاصی یدکی ران', 
    }).addTo(map);

    const marker = L.marker([defaultLocation.lat, defaultLocation.lng], {
      draggable: false, 
      autoPan: false
    }).addTo(map);

    markerRef.current = marker;
    mapInstanceRef.current = map;

    if (!readOnly) {
      map.on('move', () => {
        const center = map.getCenter();
        marker.setLatLng(center);
      });

      map.on('moveend', () => {
        const center = map.getCenter();
        if (onLocationChangeRef.current) {
          onLocationChangeRef.current({ lat: center.lat, lng: center.lng });
        }
      });

      map.on('click', (e) => {
        map.flyTo(e.latlng, map.getZoom());
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Sync Location
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const currentCenter = mapInstanceRef.current.getCenter();
      const newLatLng = L.latLng(defaultLocation.lat, defaultLocation.lng);
      const distance = mapInstanceRef.current.distance(currentCenter, newLatLng);

      if (distance > 20) {
        markerRef.current.setLatLng(newLatLng);
        mapInstanceRef.current.setView(newLatLng, mapInstanceRef.current.getZoom());
      }
    }
  }, [defaultLocation.lat, defaultLocation.lng]);

  // Sync Zoom
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [zoom]);

  // --- Live Search Logic ---
  useEffect(() => {
    if (debouncedSearchTerm.length < 2 || isResultSelected) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      const results = await mapService.searchLocation(debouncedSearchTerm);
      setSearchResults(results);
      setIsSearching(false);
    };

    performSearch();
  }, [debouncedSearchTerm, isResultSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsResultSelected(false);
  };

  const handleSelectResult = (result: SearchResult) => {
    if (mapInstanceRef.current) {
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);
      mapInstanceRef.current.flyTo([lat, lng], 16);
      setSearchQuery(result.display_name.split(',')[0]);
      setSearchResults([]);
      setIsResultSelected(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsResultSelected(false);
  };

  // --- Current Location ---
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 16);
        }
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // --- Navigation Handler (Google Maps / Waze) ---
  const handleNavigation = () => {
    if (!mapInstanceRef.current) return;
    
    // گرفتن مختصات مرکزی (که مارکر هم آنجاست)
    const { lat, lng } = mapInstanceRef.current.getCenter();
    
    // باز کردن لینک یونیورسال گوگل مپس
    // در موبایل‌ها، این لینک معمولاً اپلیکیشن Maps یا انتخابگر اپلیکیشن را باز می‌کند
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const containerClasses = [
    'map-selector',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses} 
      style={{ height, position: 'relative', zIndex: 1 }}
    >
      {/* --- باکس جستجو --- */}
      {!readOnly && (
        <div className="map-selector__search-box">
          <div className="relative w-full">
            <Input 
              id="map-search"
              placeholder="جستجوی شهر یا خیابان..." 
              value={searchQuery}
              onChange={handleInputChange}
              leftIcon={
                isSearching ? (
                  <Loader2 size={18} className="animate-spin text-brand-primary" />
                ) : (
                  <Search size={18} className="text-gray-400" />
                )
              }
              containerClassName="map-search-input-container shadow-md"
              className="map-search-input-field"
            />
            
            {searchQuery && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="map-selector__clear-btn"
                title="پاک کردن"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="search-results custom-scrollbar">
              {searchResults.map((result) => (
                <div 
                  key={result.place_id} 
                  className="search-results__item"
                  onClick={() => handleSelectResult(result)}
                >
                  <MapPin size={14} className="ml-2 inline-block text-gray-400" />
                  {result.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- دکمه موقعیت فعلی --- */}
      {!readOnly && (
        <button 
          className={`map-selector__current-location-btn ${isLocating ? 'map-selector__current-location-btn--loading' : ''}`}
          onClick={handleCurrentLocation}
          title="مکان فعلی من"
          type="button"
        >
          {isLocating ? <Loader2 size={20} className="animate-spin" /> : <Locate size={20} />}
        </button>
      )}

      {/* --- دکمه مسیریابی (فقط اگر پراپ فعال باشد) --- */}
      {showNavigationButton && (
        
        <button 
          className="map-selector__navigation-btn"
          onClick={handleNavigation}
          title="مسیریابی"
          type="button"
        >
          <Navigation size={20} />
        
        </button>
        
      )}

      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} 
      />
    </div>
  );
};