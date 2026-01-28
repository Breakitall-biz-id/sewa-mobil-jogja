import { useState, useEffect, useMemo, Suspense, lazy } from "react"
import { CalendarIcon, MessageCircle, User, Phone, MapPin, Map, StickyNote, ArrowRight, ArrowLeft, CheckCircle2, LocateFixed } from "lucide-react"
import { addDays, format, differenceInDays } from "date-fns"
import { id } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Calendar } from "../ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

// Lazy load GoogleMapPicker
const GoogleMapPicker = lazy(() => import("./GoogleMapPicker"))

interface BookingFormProps {
    carName: string
    pricePerDay: number
    priceWithDriver?: number
}

export function BookingForm({ carName, pricePerDay, priceWithDriver }: BookingFormProps) {
    const [step, setStep] = useState<1 | 2>(1)
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    })
    const [serviceType, setServiceType] = useState<"self-drive" | "with-driver">("self-drive")

    const activePrice = serviceType === "with-driver" && priceWithDriver ? priceWithDriver : pricePerDay

    const [fullName, setFullName] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [pickupLocation, setPickupLocation] = useState("")
    const [destination, setDestination] = useState("")
    const [notes, setNotes] = useState("")

    // Location State
    const [mapOpen, setMapOpen] = useState(false)
    const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(undefined)
    const [pickedAddress, setPickedAddress] = useState("")
    const [isLocating, setIsLocating] = useState(false)

    const total = useMemo(() => {
        if (!date?.from || !date?.to) return 0
        const diff = differenceInDays(date.to, date.from)
        const days = diff > 0 ? diff : 1
        return activePrice * days
    }, [date, activePrice])

    const duration = useMemo(() => {
        if (!date?.from || !date?.to) return 0
        const diff = differenceInDays(date.to, date.from)
        return diff > 0 ? diff : 1
    }, [date])

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser")
            return
        }

        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setCoords({ lat: latitude, lng: longitude })
                // We'll let GoogleMapPicker handle the reverse geocoding via the coords update
                setIsLocating(false)
            },
            (error) => {
                let errorMessage = "Gagal mengambil lokasi."
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Izin lokasi ditolak. Mohon aktifkan izin lokasi di browser Anda."
                        break
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Informasi lokasi tidak tersedia. Pastikan GPS Anda aktif."
                        break
                    case error.TIMEOUT:
                        errorMessage = "Waktu permintaan habis. Silakan coba lagi."
                        break
                    default:
                        errorMessage = "Terjadi kesalahan yang tidak diketahui saat mengambil lokasi."
                }
                alert(errorMessage)
                setIsLocating(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    }

    const handleMapConfirm = () => {
        if (coords) {
            setPickupLocation(pickedAddress || `Pinned Location from Google Maps`)
            setMapOpen(false)
        }
    }

    const onMapChange = (pos: { lat: number; lng: number }, address?: string) => {
        setCoords(pos)
        if (address) setPickedAddress(address)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formattedFrom = date?.from ? format(date.from, "dd MMMM yyyy", { locale: id }) : ""
        const formattedTo = date?.to ? format(date.to, "dd MMMM yyyy", { locale: id }) : ""
        const dateRangeText = formattedFrom && formattedTo ? `${formattedFrom} - ${formattedTo}` : "Belum ditentukan"

        // Generate Map Link if coords exist
        const locationLink = coords
            ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
            : null

        const message = `🚗 *BOOKING SEWA MOBIL*
━━━━━━━━━━━━━━━━
*Unit:* ${carName}
*Layanan:* ${serviceType === "with-driver" ? "Dengan Supir" : "Lepas Kunci"}

📅 *Waktu Sewa*
Tanggal: ${dateRangeText}
Durasi: ${duration} Hari

📍 *Lokasi*
Jemput: ${pickupLocation} ${locationLink ? `\nMap: ${locationLink}` : ''}
Tujuan: ${destination}

👤 *Data Pemesan*
Nama: ${fullName}
WhatsApp: ${whatsapp}
Catatan: ${notes || "-"}

💰 *Estimasi Total: Rp ${total.toLocaleString("id-ID")}*
(Harga per hari: Rp ${activePrice.toLocaleString("id-ID")})
━━━━━━━━━━━━━━━━
Mohon info ketersediaan unit. Terima kasih! 🙏`

        const whatsappUrl = `https://wa.me/628812725610?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    const nextStep = () => {
        if (date?.from && date?.to) setStep(2)
    }

    return (
        <form onSubmit={handleSubmit} className="relative overflow-hidden">
            {/* Steps Indicator */}
            <div className="flex items-center gap-2 mb-6">
                <div className={cn("h-1 flex-1 rounded-full transition-all duration-300", step === 1 ? "bg-[#1f3b61]" : "bg-[#d97706]")} />
                <div className={cn("h-1 flex-1 rounded-full transition-all duration-300", step === 2 ? "bg-[#1f3b61]" : "bg-gray-100")} />
            </div>

            {/* Service Toggle */}
            <div className={cn(
                "mb-6 transition-all duration-300",
                step === 1 ? "block" : "hidden"
            )}>
                <RadioGroup
                    value={serviceType}
                    onValueChange={(v) => setServiceType(v as "self-drive" | "with-driver")}
                    className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg"
                >
                    <label className="cursor-pointer">
                        <RadioGroupItem value="self-drive" id="self-drive-bk" className="peer sr-only" />
                        <div
                            className="w-full text-center py-2 rounded-md bg-transparent text-xs font-semibold text-slate-500 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-[#1f3b61] peer-data-[state=checked]:shadow-sm transition-all"
                        >
                            Lepas Kunci
                        </div>
                    </label>
                    <label className={cn("cursor-pointer", !priceWithDriver && "opacity-50 cursor-not-allowed")}>
                        <RadioGroupItem value="with-driver" id="with-driver-bk" className="peer sr-only" disabled={!priceWithDriver} />
                        <div
                            className="w-full text-center py-2 rounded-md bg-transparent text-xs font-semibold text-slate-500 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-[#1f3b61] peer-data-[state=checked]:shadow-sm transition-all"
                        >
                            Dengan Supir
                        </div>
                    </label>
                </RadioGroup>
                {!priceWithDriver && (
                    <p className="text-[10px] text-red-500 mt-1 text-center">
                        *Layanan dengan supir belum tersedia untuk unit ini
                    </p>
                )}
            </div>

            {/* Step 1: Schedule & Price */}
            <div className={cn(
                "space-y-6 transition-all duration-300",
                step === 1 ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute top-0 left-0 w-full pointer-events-none"
            )}>
                <div className="text-center space-y-1 mb-2">
                    <h3 className="text-lg font-bold text-[#1f3b61]">Atur Jadwal</h3>
                    <p className="text-xs text-gray-500">Pilih tanggal untuk melihat estimasi harga</p>
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#6a7381] uppercase">
                        Tanggal Sewa
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full h-12 rounded-xl justify-start text-left font-normal border-gray-200 hover:bg-transparent shadow-sm",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {date?.from ? (
                                    date.to ? (
                                        <span className="text-sm font-medium">
                                            {format(date.from, "dd MMM", { locale: id })} - {format(date.to, "dd MMM yyyy", { locale: id })}
                                        </span>
                                    ) : (
                                        format(date.from, "dd MMM yyyy", { locale: id })
                                    )
                                ) : (
                                    <span>Pilih Tanggal</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Quick Summary Card */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Durasi</span>
                        <span className="font-bold text-[#1f3b61]">{duration} Hari</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Harga per Hari</span>
                        <span className="font-bold text-[#1f3b61]">Rp {pricePerDay.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2" />
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1f3b61]">Total Estimasi</span>
                        <span className="font-black text-xl text-primary">Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#1f3b61] hover:bg-[#162a45] text-white font-bold h-12 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    Lanjut Isi Data <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Step 2: User Details */}
            <div className={cn(
                "space-y-4 transition-all duration-300",
                step === 2 ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute top-0 right-0 w-full pointer-events-none"
            )}>
                <div className="flex items-center gap-2 mb-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -ml-2 hover:bg-transparent hover:text-primary"
                        onClick={() => setStep(1)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h3 className="text-lg font-bold text-[#1f3b61]">Data Pemesan</h3>
                    </div>
                </div>

                <div className="space-y-3 px-4">
                    <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                        <Input
                            placeholder="Nama Lengkap"
                            className="pl-9 h-11 rounded-lg bg-white border-gray-200 focus:border-[#d97706] transition-all"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                        <Input
                            type="tel"
                            placeholder="Nomor WhatsApp"
                            className="pl-9 h-11 rounded-lg bg-white border-gray-200 focus:border-[#d97706] transition-all"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                        <Input
                            placeholder="Lokasi Penjemputan"
                            className="pl-9 h-11 rounded-lg bg-white border-gray-200 focus:border-[#d97706] transition-all cursor-pointer hover:bg-gray-50"
                            value={pickupLocation}
                            readOnly
                            onClick={() => setMapOpen(true)}
                            required
                        />

                        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
                            <DialogContent
                                className="sm:max-w-[500px] w-[95%] p-0 overflow-hidden max-h-[90vh] flex flex-col"
                                onInteractOutside={(e) => {
                                    const target = e.target as Element;
                                    if (target.closest(".pac-container")) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <DialogHeader className="p-4 pb-2 bg-white z-10 relative">
                                    <DialogTitle>Pilih Lokasi via Google Maps</DialogTitle>
                                    <DialogDescription>
                                        Cari lokasi atau geser pin ke titik jemput.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="w-full relative bg-gray-100 p-4 pb-0 flex flex-col gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleUseCurrentLocation}
                                        disabled={isLocating}
                                        className="w-full bg-white border-dashed border-primary/50 text-primary hover:bg-primary/5 hover:text-primary gap-2"
                                    >
                                        <LocateFixed className={cn("w-4 h-4", isLocating && "animate-spin")} />
                                        {isLocating ? "Mencari Lokasi..." : "Gunakan Lokasi Saya Saat Ini"}
                                    </Button>

                                    <Suspense fallback={<div className="flex items-center justify-center h-[350px] text-sm text-gray-500">Memuat Google Maps...</div>}>
                                        <GoogleMapPicker
                                            value={coords}
                                            onChange={onMapChange}
                                        />
                                    </Suspense>
                                </div>
                                <div className="p-4 pt-2 bg-white">
                                    <Button onClick={handleMapConfirm} className="w-full bg-[#1f3b61] text-white">
                                        Konfirmasi Lokasi Penjemputan
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="relative group">
                        <Map className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                        <Input
                            placeholder="Tujuan Perjalanan"
                            className="pl-9 h-11 rounded-lg bg-white border-gray-200 focus:border-[#d97706] transition-all"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <StickyNote className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                        <Textarea
                            placeholder="Catatan Tambahan (Opsional)"
                            className="pl-9 min-h-[60px] rounded-lg bg-white border-gray-200 focus:border-[#d97706] transition-all resize-y"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold h-12 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        Kirim ke WhatsApp
                    </Button>
                    <p className="text-[10px] text-center text-[#6a7381] mt-3">
                        Anda akan diarahkan ke WhatsApp admin
                    </p>
                </div>
            </div>
        </form>
    )
}
