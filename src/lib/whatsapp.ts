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
    `• Rencana Tanggal Pakai/Kirim: ${payload.deliveryDate || 'Segera / Sesuai kesepakatan'}`,
    ``,
    payload.greetingCardText ? `*Request Kartu Ucapan:*\n"${payload.greetingCardText}"\n` : `*Kartu Ucapan:* (Tidak pakai/isi nanti)`,
    payload.notes ? `*Catatan Tambahan:* ${payload.notes}\n` : '',
    `Apakah pesanan ini masih bisa diproses? Mohon infonya ya admin. Terima kasih! 🙏`
  ].filter(Boolean);

  const fullText = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
