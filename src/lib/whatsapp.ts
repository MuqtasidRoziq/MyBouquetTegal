import { Product } from '@/types';

/**
 * Format angka ke format mata uang Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format string tanggal (YYYY-MM-DD atau ISO) ke format Indonesia dengan hari:
 * Contoh: "Senin, 15 - 11 - 2026"
 */
export function formatIndonesianDateWithDay(dateStr: string): string {
  if (!dateStr) return 'Segera / Sesuai kesepakatan';
  
  // Format YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);

    if (!isNaN(dateObj.getTime())) {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = days[dateObj.getDay()];
      const dd = String(day).padStart(2, '0');
      const mm = String(month + 1).padStart(2, '0');
      const yyyy = String(year);
      return `${dayName}, ${dd} - ${mm} - ${yyyy}`;
    }
  }

  return dateStr;
}

/**
 * Generate Direct WhatsApp Link dengan prefilled pesan terstruktur
 */
export interface WhatsAppOrderPayload {
  product: Product;
  customerName: string;
  quantity: number;
  deliveryDate?: string;
  greetingCardText?: string;
  notes?: string;
}

export function buildWhatsAppOrderUrl(
  whatsappNumber: string,
  payload: WhatsAppOrderPayload,
  storeName: string = 'My Bouquet Tegal'
): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const totalEstimate = formatRupiah(payload.product.price * payload.quantity);
  const typeLabel = payload.product.productType === 'parcel' ? 'Parcel / Hampers' : 'Buket';

  const messageLines = [
    `Halo Admin ${storeName}! 🌸✨`,
    `Saya tertarik untuk memesan ${typeLabel} dengan rincian berikut:`,
    ``,
    `*Detail Pesanan:*`,
    `• Jenis: *${typeLabel}*`,
    `• Produk: *${payload.product.name}*`,
    `• Harga Satuan: ${formatRupiah(payload.product.price)}`,
    `• Jumlah: *${payload.quantity} pcs*`,
    `• Total Estimasi: *${totalEstimate}*`,
    ``,
    `*Data Pemesan:*`,
    `• Nama Pemesan: ${payload.customerName || '-'}`,
    `• Rencana Tanggal Pakai/Kirim: ${formatIndonesianDateWithDay(payload.deliveryDate || '')}`,
    ``,
    payload.greetingCardText ? `*Request Kartu Ucapan:*\n"${payload.greetingCardText}"\n` : `*Kartu Ucapan:* (Tidak pakai/isi nanti)`,
    payload.notes ? `*Catatan Tambahan:* ${payload.notes}\n` : '',
    `Apakah pesanan ini masih bisa diproses? Mohon infonya ya min. Terima kasih! 🙏`
  ].filter(Boolean);

  const fullText = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
}
