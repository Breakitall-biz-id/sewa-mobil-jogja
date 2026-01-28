"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface QuickSearchFormProps {
    lang?: "id" | "en"
    theme?: "light" | "dark"
}

const translations = {
    id: {
        bookingTitle: "Cari Ketersediaan Mobil",
        pickupDate: "Tanggal Ambil",
        returnDate: "Tanggal Kembali",
        serviceType: "Tipe Layanan",
        selfDrive: "Lepas Kunci",
        withDriver: "Dengan Supir",
        carCategory: "Kategori Mobil",
        allCategories: "Semua Kategori",
        searchBtn: "Cari Mobil Sekarang",
        datesLabel: "Tanggal Sewa (Ambil - Kembali)"
    },
    en: {
        bookingTitle: "Check Car Availability",
        pickupDate: "Pickup Date",
        returnDate: "Return Date",
        serviceType: "Service Type",
        selfDrive: "Self Drive",
        withDriver: "With Driver",
        carCategory: "Car Category",
        allCategories: "All Categories",
        searchBtn: "Search Cars Now",
        datesLabel: "Rental Dates (Pickup - Return)"
    },
}

const carCategories = {
    id: [
        { value: "all", label: "Semua Kategori" },
        { value: "city-car", label: "City Car (Brio, Agya)" },
        { value: "mpv", label: "MPV (Avanza, Xenia)" },
        { value: "premium", label: "Premium (Innova Reborn)" },
        { value: "luxury", label: "Luxury (Alphard, Pajero)" },
    ],
    en: [
        { value: "all", label: "All Categories" },
        { value: "city-car", label: "City Car (Brio, Agya)" },
        { value: "mpv", label: "MPV (Avanza, Xenia)" },
        { value: "premium", label: "Premium (Innova Reborn)" },
        { value: "luxury", label: "Luxury (Alphard, Pajero)" },
    ],
}

export function QuickSearchForm({ lang = "id", theme = "light" }: QuickSearchFormProps) {
    const t = translations[lang]
    const categories = carCategories[lang]

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 3),
    })
    const [serviceType, setServiceType] = React.useState("self-drive")
    const [category, setCategory] = React.useState("all")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()

        if (date?.from) {
            params.set("pickup", format(date.from, "yyyy-MM-dd"))
        }
        if (date?.to) {
            params.set("return", format(date.to, "yyyy-MM-dd"))
        }

        params.set("type", serviceType)
        params.set("category", category)
        window.location.href = `/armada?${params.toString()}`
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Dates */}
            <div className="flex flex-col gap-1">
                <Label className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {t.datesLabel}
                </Label>
                <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    theme={theme}
                    className="w-full"
                />
            </div>

            {/* Service Type */}
            <div className="flex flex-col gap-1">
                <span id="service-type-label" className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {t.serviceType}
                </span>
                <RadioGroup
                    value={serviceType}
                    onValueChange={setServiceType}
                    aria-labelledby="service-type-label"
                    className={`grid grid-cols-2 gap-2 p-1 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}
                >
                    <label className="cursor-pointer">
                        <RadioGroupItem value="self-drive" id="self-drive" className="peer sr-only" />
                        <div
                            className={`w-full text-center py-2 rounded-md bg-transparent text-xs font-semibold transition-all ${theme === 'dark' ? 'text-slate-400 peer-data-[state=checked]:bg-slate-700 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-sm' : 'text-slate-500 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-[#1f3b61] peer-data-[state=checked]:shadow-sm'}`}
                        >
                            {t.selfDrive}
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <RadioGroupItem value="with-driver" id="with-driver" className="peer sr-only" />
                        <div
                            className={`w-full text-center py-2 rounded-md bg-transparent text-xs font-semibold transition-all ${theme === 'dark' ? 'text-slate-400 peer-data-[state=checked]:bg-slate-700 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-sm' : 'text-slate-500 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-[#1f3b61] peer-data-[state=checked]:shadow-sm'}`}
                        >
                            {t.withDriver}
                        </div>
                    </label>
                </RadioGroup>
            </div>

            {/* Car Category */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="category-select" className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {t.carCategory}
                </Label>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category-select" className={`w-full border h-auto py-2 text-xs ${theme === 'dark' ? 'bg-white/10 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-1 focus:ring-[#1f3b61]'}`}>
                        <SelectValue placeholder={t.allCategories} />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white border border-slate-200 shadow-lg">
                        {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-xs">
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className={`mt-2 w-full font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 group text-sm ${theme === 'dark' ? 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-yellow-500/20' : 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-yellow-500/20'}`}
            >
                <Search className="size-[18px] group-hover:animate-bounce" />
                {t.searchBtn}
            </Button>
        </form>
    )
}
