import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

type MarkerDef = {
  position: [number, number];
  id?: string | number;
  label?: string;
  isCurrent?: boolean;
};

type MapWidgetProps = {
  position: [number, number]; // fallback center [lat, lng]
  zoom?: number;
  ringRadius?: number; // in meters
  height?: number | string; // height of the map container
  scrollWheelZoom?: boolean; // allow zooming with the mouse wheel
  markers?: MarkerDef[]; // list of markers with position and optional isCurrent
};

// Normal marker icon (small violet dot)
const normalIcon = L.divIcon({
  className: '',
  html: `<span class="block w-4 h-4 rounded-full bg-violet-400 border-2 border-white shadow-sm"></span>`,
  iconAnchor: [8, 8],
});

// Blinking/pulsing icon for the current user: uses two spans, one ping and one dot
const blinkingIcon = L.divIcon({
  className: '',
  html: `
    <span class="relative inline-block">
      <span class="absolute inline-flex h-4 w-4 -mt-2 -ml-2 rounded-full bg-violet-400 opacity-75 animate-ping"></span>
      <span class="relative inline-block h-3 w-3 rounded-full bg-violet-600 border-2 border-white"></span>
    </span>
  `,
  iconAnchor: [10, 10],
});

const clusterIconForCount = (count: number) =>
  L.divIcon({
    className: '',
    html: `<div class="flex items-center justify-center rounded-full bg-violet-600 text-white font-bold" style="width:32px;height:32px;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2)">${count}</div>`,
    iconAnchor: [16, 16],
  });

// Utility: simple Haversine distance approx in meters
function distanceMeters(a: [number, number], b: [number, number]) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const lat1 = a[0];
  const lon1 = a[1];
  const lat2 = b[0];
  const lon2 = b[1];
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aHarv = sinDLat * sinDLat + Math.cos(radLat1) * Math.cos(radLat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
}

// Simple clustering by proximity (O(n^2) but fine for small sets)
function clusterMarkers(markers: MarkerDef[], thresholdMeters = 800) {
  const clusters: MarkerDef[][] = [];
  const used = new Set<number>();
  for (let i = 0; i < markers.length; i++) {
    if (used.has(i)) continue;
    const base = markers[i];
    const cluster = [base];
    used.add(i);
    for (let j = i + 1; j < markers.length; j++) {
      if (used.has(j)) continue;
      const m = markers[j];
      const d = distanceMeters(base.position, m.position);
      if (d <= thresholdMeters) {
        cluster.push(m);
        used.add(j);
      }
    }
    clusters.push(cluster);
  }
  return clusters;
}

// Helper component used inside the map to perform map actions from popup buttons
const ClusterContent: React.FC<{ items: MarkerDef[] }> = ({ items }) => {
  const map = useMap();
  return (
    <div className="max-w-xs">
      {items.map((it) => (
        <div key={String(it.id)} className="py-1">
          <button
            className="text-left text-sm text-violet-700 hover:underline"
            onClick={() => {
              map.setView(it.position as [number, number], Math.max(map.getZoom(), 15), { animate: true });
            }}
          >
            {it.label}
          </button>
        </div>
      ))}
    </div>
  );
};

const MapWidget: React.FC<MapWidgetProps> = ({
  position,
  zoom = 13,
  height = 300,
  scrollWheelZoom = false,
  markers = [],
  ringRadius,
}) => {
  const validMarkers = (Array.isArray(markers) ? markers : []).filter(
    (m) => Array.isArray(m.position) && m.position.length === 2 && m.position.every((v) => Number.isFinite(v))
  );

  // Prefer centering on current user if present
  const current = validMarkers.find((m) => m.isCurrent);
  const center: [number, number] = current ? current.position : validMarkers.length > 0 ? validMarkers[0].position : position;

  // Create clusters using proximity (thresholdMeters)
  const clusters = clusterMarkers(validMarkers, 800); // 800 meters threshold, adjust as needed

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

      {/* Optional ring around center position */}
      {typeof ringRadius === 'number' && ringRadius > 0 && (
        <Circle center={center} radius={ringRadius} pathOptions={{ weight: 2, fillOpacity: 0.05 }} />
      )}

      {/* Render clusters */}
      {clusters.map((cluster, idx) => {
        if (cluster.length === 1) {
          const m = cluster[0];
          return (
            <Marker key={m.id ?? idx} position={m.position} icon={m.isCurrent ? blinkingIcon : normalIcon}>
              {m.label && <Popup>{m.label}</Popup>}
            </Marker>
          );
        }

        // cluster centroid
        const avgLat = cluster.reduce((s, it) => s + it.position[0], 0) / cluster.length;
        const avgLng = cluster.reduce((s, it) => s + it.position[1], 0) / cluster.length;
        const centroid: [number, number] = [avgLat, avgLng];

        return (
          <Marker key={`cluster-${idx}`} position={centroid} icon={clusterIconForCount(cluster.length)}>
            <Popup>
              <div className="py-2">
                <div className="text-sm font-semibold mb-2">{cluster.length} items</div>
                <ClusterContent items={cluster} />
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWidget;

