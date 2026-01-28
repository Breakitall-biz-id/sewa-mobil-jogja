import { useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"
import L from "leaflet"

// Fix for default marker icon in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
    value?: { lat: number; lng: number }
    onChange: (pos: { lat: number; lng: number }) => void
}

function SearchControl({ onChange }: { onChange: (pos: { lat: number; lng: number }) => void }) {
    const map = useMap()
    useEffect(() => {
        const provider = new OpenStreetMapProvider()
        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: false, // We use our own draggable marker
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: true,
            searchLabel: 'Cari lokasi (contoh: Malioboro, Stasiun Tugu)...'
        })

        map.addControl(searchControl)

        map.on('geosearch/showlocation', (result: any) => {
            if (result && result.location) {
                const { x, y } = result.location // x=lng, y=lat
                onChange({ lat: parseFloat(y), lng: parseFloat(x) })
            }
        })

        return () => {
            map.removeControl(searchControl)
        }
    }, [map, onChange])

    return null
}

function LocationMarker({ value, onChange }: MapPickerProps) {
    const [position, setPosition] = useState(value || { lat: -7.7975, lng: 110.3695 })
    const map = useMap()

    useEffect(() => {
        if (value) {
            setPosition(value)
            map.flyTo(value, map.getZoom())
        }
    }, [value, map])

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker: any = markerRef.current
                if (marker != null) {
                    const ct = marker.getLatLng()
                    const newPos = { lat: ct.lat, lng: ct.lng }
                    setPosition(newPos)
                    onChange(newPos)
                }
            },
        }),
        [onChange],
    )

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        />
    )
}

export default function MapPicker({ value, onChange }: MapPickerProps) {
    // Default to Jogja
    const initialPos = value || { lat: -7.7975, lng: 110.3695 }

    return (
        <div className="h-[350px] w-full rounded-xl overflow-hidden relative z-0">
            <MapContainer
                center={initialPos}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SearchControl onChange={onChange} />
                <LocationMarker value={value} onChange={onChange} />
            </MapContainer>
        </div>
    )
}
