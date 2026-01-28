import { useState } from "react"
import { BookingForm } from "./BookingForm"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface MobileBookingDrawerProps {
    carName: string
    pricePerDay: number
    priceWithDriver?: number
}

export function MobileBookingDrawer({ carName, pricePerDay, priceWithDriver }: MobileBookingDrawerProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:hidden">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
                <div className="flex-shrink-0">
                    <p className="text-[10px] text-[#64748b] font-bold uppercase leading-none mb-1">
                        Harga Sewa
                    </p>
                    <p className="text-base font-black text-primary">
                        Rp {pricePerDay ? (pricePerDay / 1000) + ".000" : "Call"}
                        <span className="text-[10px] font-normal text-[#64748b]">
                            /hari
                        </span>
                    </p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="flex-1 bg-secondary hover:bg-secondary/90 text-primary font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 active:scale-95 transition-all"
                        >
                            <MessageCircle className="w-5 h-5 fill-current" />
                            Pesan Sekarang
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-[425px] p-0 overflow-y-auto max-h-[90vh] rounded-xl">
                        <DialogHeader className="p-4 pb-2 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <DialogTitle>Formulir Pemesanan</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 pt-2">
                            <BookingForm carName={carName} pricePerDay={pricePerDay} priceWithDriver={priceWithDriver} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
