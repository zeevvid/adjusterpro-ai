
import React, { useState, useEffect } from 'react';
import {
  MapPin, Navigation, Thermometer, Wind, Droplets, History,
  ShieldAlert, Settings2, Plus, Bell, Trash2, Zap, CloudRain, ShieldCheck
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertZone, WeatherThresholds } from '../types';

// Fix Leaflet's default icon path issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker for Active Zones
const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const WeatherRadar: React.FC = () => {
  const [zones, setZones] = useState<AlertZone[]>([
    {
      id: '1',
      name: 'South Beach Portfolio',
      location: 'Miami, FL 33139',
      active: true,
      thresholds: { windSpeed: 45, hailSize: 1.0, rainRate: 2.0, floodRisk: true }
    },
    {
      id: '2',
      name: 'Commercial Warehouse District',
      location: 'Fort Lauderdale, FL 33312',
      active: true,
      thresholds: { windSpeed: 50, hailSize: 0.5, rainRate: 1.5, floodRisk: false }
    }
  ]);

  const [showConfig, setShowConfig] = useState(false);
  const [editingZone, setEditingZone] = useState<AlertZone | null>(null);

  // Demo coordinates for our zones
  const zoneCoords: { [key: string]: [number, number] } = {
    '1': [25.790654, -80.130045], // Miami Beach
    '2': [26.122439, -80.137317]  // Fort Lauderdale
  };

  const toggleZone = (id: string) => {
    setZones(zones.map(z => z.id === id ? { ...z, active: !z.active } : z));
  };

  const deleteZone = (id: string) => {
    setZones(zones.filter(z => z.id !== id));
  };

  const saveZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingZone) {
      if (zones.find(z => z.id === editingZone.id)) {
        setZones(zones.map(z => z.id === editingZone.id ? editingZone : z));
      } else {
        setZones([...zones, editingZone]);
      }
      setEditingZone(null);
    }
  };

  // Fix map rendering issues on resize/load
  const MapRefresher = () => {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => { map.invalidateSize(); }, 100);
    }, [map]);
    return null;
  };

  // To fly to location, we need access to the map instance. 
  // Let's create a component that handles the "fly to" logic based on a prop or event.
  const LocationController = ({ triggerFlyTo }: { triggerFlyTo: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
      if (triggerFlyTo) {
        map.flyTo(triggerFlyTo, 12, { duration: 2 });
      }
    }, [triggerFlyTo]);
    return null;
  };

  const [flyToPos, setFlyToPos] = useState<[number, number] | null>(null);

  const onMyLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setFlyToPos([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Banner with Alert Summary */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-full text-orange-600">
            <Bell size={20} />
          </div>
          <div>
            <h4 className="font-bold text-orange-900 text-sm">Active Monitoring</h4>
            <p className="text-orange-700 text-xs">Currently tracking {zones.filter(z => z.active).length} zones for {zones.length * 4} threshold variables.</p>
          </div>
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-4 py-2 bg-white border border-orange-200 text-orange-700 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors flex items-center gap-2"
        >
          <Settings2 size={14} /> {showConfig ? 'Close Settings' : 'Manage Alert Thresholds'}
        </button>
      </div>

      {showConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-top-4 duration-500">
          {/* Zone List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Monitored Zones</h3>
              <button
                onClick={() => setEditingZone({
                  id: Date.now().toString(),
                  name: '',
                  location: '',
                  active: true,
                  thresholds: { windSpeed: 40, hailSize: 0.5, rainRate: 1.0, floodRisk: false }
                })}
                className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1"
              >
                <Plus size={16} /> Add New Zone
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map(zone => (
                <div key={zone.id} className={`p-5 rounded-xl border transition-all ${zone.active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800">{zone.name || 'Unnamed Zone'}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> {zone.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingZone(zone)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Settings2 size={16} /></button>
                      <button onClick={() => deleteZone(zone.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <ThresholdBadge label="Wind" value={`${zone.thresholds.windSpeed} mph`} icon={<Wind size={10} />} />
                    <ThresholdBadge label="Hail" value={`${zone.thresholds.hailSize}"`} icon={<Zap size={10} />} />
                    <ThresholdBadge label="Rain" value={`${zone.thresholds.rainRate} in/hr`} icon={<Droplets size={10} />} />
                    {zone.thresholds.floodRisk && <ThresholdBadge label="Flood" value="Enabled" icon={<CloudRain size={10} />} color="text-blue-600 bg-blue-50" />}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking Status</span>
                    <button
                      onClick={() => toggleZone(zone.id)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${zone.active ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${zone.active ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 h-fit sticky top-8">
            {editingZone ? (
              <form onSubmit={saveZone} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">{zones.find(z => z.id === editingZone.id) ? 'Edit Zone' : 'New Zone'}</h3>
                  <button type="button" onClick={() => setEditingZone(null)} className="text-slate-400 hover:text-slate-600"><Plus className="rotate-45" size={20} /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Zone Nickname</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., North Miami Claims"
                      value={editingZone.name}
                      onChange={e => setEditingZone({ ...editingZone, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location (Zip/City)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., 33139"
                      value={editingZone.location}
                      onChange={e => setEditingZone({ ...editingZone, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Trigger Thresholds</h4>

                  <ThresholdControl
                    label="Min Wind Speed (mph)"
                    value={editingZone.thresholds.windSpeed}
                    min={20} max={150}
                    onChange={v => setEditingZone({ ...editingZone, thresholds: { ...editingZone.thresholds, windSpeed: v } })}
                  />
                  <ThresholdControl
                    label="Min Hail Size (inches)"
                    value={editingZone.thresholds.hailSize}
                    min={0.25} max={4.0} step={0.25}
                    onChange={v => setEditingZone({ ...editingZone, thresholds: { ...editingZone.thresholds, hailSize: v } })}
                  />
                  <ThresholdControl
                    label="Rain Rate (in/hr)"
                    value={editingZone.thresholds.rainRate}
                    min={0.5} max={5.0} step={0.5}
                    onChange={v => setEditingZone({ ...editingZone, thresholds: { ...editingZone.thresholds, rainRate: v } })}
                  />

                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={editingZone.thresholds.floodRisk}
                      onChange={e => setEditingZone({ ...editingZone, thresholds: { ...editingZone.thresholds, floodRisk: e.target.checked } })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Include Flood Risk Alerts</span>
                  </label>
                </div>

                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">
                  Save Zone Configuration
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Settings2 size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800">No Zone Selected</h3>
                  <p className="text-sm text-slate-500">Select a zone or create a new one to customize notification thresholds.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Map Visualization */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Live Storm Tracker</h2>
            <p className="text-slate-500">Real-time overlay of active claims and severe weather cells.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onMyLocationClick}
              className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <Navigation size={16} /> My Location
            </button>
            <button
              onClick={() => {
                setShowConfig(true); setEditingZone({
                  id: Date.now().toString(),
                  name: '',
                  location: '',
                  active: true,
                  thresholds: { windSpeed: 40, hailSize: 0.5, rainRate: 1.0, floodRisk: false }
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <MapPin size={16} /> Add Location
            </button>
          </div>
        </div>

        <div className="aspect-[21/9] bg-slate-100 relative z-0">
          <MapContainer center={[25.95, -80.13]} zoom={9} scrollWheelZoom={false} className="h-full w-full z-0">
            <MapRefresher />
            <LocationController triggerFlyTo={flyToPos} />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.Overlay checked name="RainViewer Radar">
                <TileLayer
                  attribution='Map data &copy; <a href="https://www.rainviewer.com">RainViewer</a>'
                  url="https://tile.rainviewer.com/Default/nowcast_5min/256/{z}/{x}/{y}/2/1_1.png"
                  opacity={0.7}
                />
              </LayersControl.Overlay>
            </LayersControl>

            {/* Active Zones on Map */}
            {zones.filter(z => z.active).map((z) => {
              const coords = zoneCoords[z.id];
              if (!coords) return null; // Skip if no coords (e.g. new zones without geocoding implementation)

              return (
                <Marker key={z.id} position={coords} icon={activeIcon}>

                  <Popup>
                    <div className="p-2 min-w-[150px]">
                      <h3 className="font-bold text-slate-900">{z.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{z.location}</p>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Wind Limit:</span>
                          <span className="font-bold">{z.thresholds.windSpeed} mph</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Hail Limit:</span>
                          <span className="font-bold">{z.thresholds.hailSize}"</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">Active</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase">Safe</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-[1000]">
            <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Map Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-700"></div><span className="text-[10px] font-bold">Rain</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span className="text-[10px] font-bold">Storm Cells</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm"></div><span className="text-[10px] font-bold">Your Assets</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Today's Forecast */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Thermometer className="text-orange-500" size={20} /> Today's Forecast</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Temp</p>
              <p className="text-xl font-bold">84°F</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Wind</p>
              <p className="text-xl font-bold">12 mph</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={20} />
            <p className="text-xs font-medium text-blue-800">Your monitored zones are within safe operating thresholds today.</p>
          </div>
        </div>

        {/* Recent Events triggered by Thresholds */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><History className="text-blue-500" size={20} /> Threshold Violations</h3>
          <div className="space-y-3">
            {[
              { zone: 'Commercial District', type: 'Wind Exceeded', value: '54 mph', time: '2h ago', alert: true },
              { zone: 'South Beach', type: 'Rain Threshold', value: '2.1 in/hr', time: '14h ago', alert: true },
              { zone: 'Commercial District', type: 'Hail Detected', value: '0.8"', time: 'Yesterday', alert: false }
            ].map((h, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">{h.zone}</p>
                  <p className="text-[10px] text-slate-400">{h.type}: {h.value}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-500 block">{h.time}</span>
                  {h.alert && <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold">SMS Sent</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mitigation Advice */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl space-y-4">
          <h3 className="font-bold flex items-center gap-2"><ShieldAlert size={20} /> Prep Advice</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
              <span>Deploy storm shutters if wind exceeds your 50mph threshold.</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
              <span>Check sump pumps if 24hr rain exceeds 3.5 inches.</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
              <span>Move vehicles to covered parking if hail is in the vicinity.</span>
            </li>
          </ul>
          <button className="w-full py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">Emergency Contacts</button>
        </div>
      </div>
    </div>
  );
};

const ThresholdBadge: React.FC<{ label: string, value: string, icon: React.ReactNode, color?: string }> = ({ label, value, icon, color }) => (
  <div className={`flex items-center justify-between text-[11px] font-medium p-1.5 rounded-lg ${color || 'bg-slate-50 text-slate-600'}`}>
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-bold">{value}</span>
  </div>
);

const ThresholdControl: React.FC<{ label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void }> = ({ label, value, min, max, step = 1, onChange }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-bold text-slate-500 uppercase">{label}</label>
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);
