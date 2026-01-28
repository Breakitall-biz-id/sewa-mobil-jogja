export interface BookingData {
    carType: string;
    startDate: string;
    endDate: string;
    pickupTime: string;
    pickupLocation: string;
    destination: string;
    name: string;
    phone: string;
    email?: string;
    notes?: string;
}

const WHATSAPP_NUMBER = '628812725610';

export function generateWhatsAppLink(booking: BookingData): string {
    const message = `
Halo Admin SMJ Trans Jogja! 👋

Saya ingin booking mobil:
━━━━━━━━━━━━━━━━━━━━
🚗 Mobil: ${booking.carType}
📅 Tanggal: ${booking.startDate} - ${booking.endDate}
⏰ Jam Jemput: ${booking.pickupTime}
📍 Lokasi Jemput: ${booking.pickupLocation}
📍 Tujuan: ${booking.destination}
━━━━━━━━━━━━━━━━━━━━

👤 Nama: ${booking.name}
📱 No. HP: ${booking.phone}
${booking.email ? `✉️ Email: ${booking.email}` : ''}
${booking.notes ? `📝 Catatan: ${booking.notes}` : ''}

Mohon konfirmasi ketersediaan dan total biaya. Terima kasih! 🙏
  `.trim();

    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export function generateSimpleWhatsAppLink(message?: string): string {
    const defaultMessage = 'Halo admin, saya mau Sewa Mobil\n\nhttps://sewamobiljogjaku.id';
    const finalMessage = message || defaultMessage;
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(finalMessage)}`;
}
