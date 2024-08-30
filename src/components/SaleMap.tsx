import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface SaleMapProps {
    latitude: number;
    longitude: number;
    cityName: string;
}

const SaleMap: React.FC<SaleMapProps> = ({ latitude, longitude, cityName }) => {
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '200px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={[latitude, longitude]}
                icon={L.icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
                    shadowSize: [41, 41],
                })}
            >
                <Popup>{cityName}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default SaleMap;
