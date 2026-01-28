import { useState, useRef, useEffect, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api"
import { Loader2, MapPin } from "lucide-react"

const containerStyle = {
    width: "100%",
    height: "100%",
    position: "absolute" as const,
    top: 0,
    left: 0,
}

// Center of Yogyakarta
const defaultCenter = {
    lat: -7.7975,
    lng: 110.3695,
}

const libraries: ("places")[] = ["places"]

interface MapPickerProps {
    value?: { lat: number; lng: number }
    onChange: (pos: { lat: number; lng: number }, address?: string) => void
}

export default function GoogleMapPicker({ value, onChange }: MapPickerProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [markerPos, setMarkerPos] = useState(value || defaultCenter)
    const [address, setAddress] = useState<string>("")
    const [isGeocoding, setIsGeocoding] = useState(false)

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    const geocoder = useRef<google.maps.Geocoder | null>(null)

    useEffect(() => {
        if (value) {
            setMarkerPos(value)
            map?.panTo(value)
            // Trigger reverse geocode for the new value to update the address label
            if (geocoder.current) {
                reverseGeocode(value.lat, value.lng)
            }
        }
    }, [value, map])

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map)
        geocoder.current = new google.maps.Geocoder()

        // Trigger resize to ensure map renders correctly in modal
        setTimeout(() => {
            google.maps.event.trigger(map, "resize")
            map.setCenter(value || defaultCenter)
        }, 100)
    }, [value])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    const reverseGeocode = (lat: number, lng: number) => {
        if (!geocoder.current) return

        setIsGeocoding(true)
        geocoder.current.geocode({ location: { lat, lng } }, (results, status) => {
            setIsGeocoding(false)
            if (status === "OK" && results && results[0]) {
                const newAddress = results[0].formatted_address
                setAddress(newAddress)
                onChange({ lat, lng }, newAddress)
            } else {
                setAddress("Lokasi Terpilih")
                onChange({ lat, lng }, "Lokasi Terpilih")
            }
        })
    }

    const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() }
            setMarkerPos(newPos)
            reverseGeocode(newPos.lat, newPos.lng)
            map?.panTo(newPos)
        }
    }

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace()

            if (place.geometry && place.geometry.location) {
                const newPos = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }
                const newAddress = place.formatted_address || place.name || "Lokasi Terpilih"

                setMarkerPos(newPos)
                setAddress(newAddress)
                onChange(newPos, newAddress)

                map?.panTo(newPos)
                map?.setZoom(17)
            }
        }
    }

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete
    }

    if (!isLoaded) {
        return <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Google Maps...</div>
    }

    return (
        <div className="relative w-full h-full flex flex-col gap-2">
            <div className="relative z-10 w-full">
                <Autocomplete
                    onLoad={onLoadAutocomplete}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Cari lokasi (cth: Hotel Tentrem)..."
                        className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1f3b61] text-base md:text-sm"
                    />
                </Autocomplete>
                {isGeocoding && (
                    <div className="absolute right-3 top-3">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-h-[50vh] md:min-h-[350px] rounded-xl overflow-hidden border border-gray-200 relative">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markerPos}
                    zoom={13}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        zoomControl: true,
                    }}
                >
                    <Marker
                        position={markerPos}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        animation={google.maps.Animation.DROP}
                    />
                </GoogleMap>

                {address && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg p-3 rounded-lg z-0 text-xs border border-gray-100">
                        <span className="font-bold text-[#1f3b61] block mb-0.5">Lokasi Terpilih:</span>
                        <span className="text-gray-600 line-clamp-2">{address}</span>
                    </div>
                )}
            </div>

            {/* Force Google Autocomplete Dropdown to be above the Dialog and Interactive */}
            <style>{`
                /* Ensure the container is on top of everything including Radix Dialogs */
                .pac-container {
                    z-index: 10000 !important;
                    pointer-events: auto !important;
                }
                /* Ensure items are clickable and show the pointer cursor */
                .pac-item {
                    cursor: pointer !important;
                    pointer-events: auto !important;
                }
                .pac-item:hover {
                    background-color: #f1f5f9;
                }
            `}</style>
        </div>
    )
}
