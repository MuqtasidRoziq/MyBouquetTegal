import { MapPin, Phone, Clock, ExternalLink, Camera } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';
import { WhatsAppIcon } from '@/components/icons';
import FadeIn from '@/components/ui/FadeIn';

interface ContactProps {
  store?: StoreInfo;
  contact?: ContactInfo;
}

// Helper untuk mengekstrak URL valid dari input Google Maps (baik full <iframe> tag maupun plain URL)
function extractGoogleMapsUrl(rawInput?: string): string {
  if (!rawInput) {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d109.13!3d-6.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTgnNDguMCJTIDEwOcKwMDcnNDguMCJF!5e0!3m2!1sid!2sid!4v1';
  }

  const trimmed = rawInput.trim();

  // Jika user memasukkan seluruh tag <iframe ... src="..." ...></iframe>
  const iframeMatch = trimmed.match(/src=["'](https?:\/\/[^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // Jika user memasukkan link maps biasa (bukan /embed), kita arahkan atau biarkan
  return trimmed;
}

export default function Contact({ store, contact }: ContactProps) {
  const storeName = store?.name || 'My Bouquet Tegal';
  const whatsappNumber = contact?.whatsappNumber || '6285742880000';
  const address = contact?.address || 'Slawi, Kabupaten Tegal, Jawa Tengah';
  const hours = contact?.operationalHours || '08.00 - 20.00 WIB';
  const instagramHandle = contact?.instagramHandle || '@mybouquettegal';
  const instagramUrl = contact?.instagramUrl || 'https://instagram.com/mybouquettegal';
  const mapsEmbed = extractGoogleMapsUrl(contact?.googleMapsFrameUrl);

  const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    `Halo Admin ${storeName}, saya mau tanya info lokasi / konsultasi buket... 🌿`
  )}`;

  return (
    <section className="py-20 bg-white" id="kontak">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Info Card */}
          <FadeIn direction="right" className="lg:col-span-5 h-full">
            <div className="bg-[#FAF9F5] p-8 sm:p-10 rounded-3xl border border-neutral-200/80 flex flex-col justify-between space-y-8 h-full">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
                  <span className="w-5 h-px bg-emerald-600/60" />
                  <span>Kunjungi Workshop Kami</span>
                  <span className="w-5 h-px bg-emerald-600/60" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight">
                  Lokasi &amp; Kontak
                </h2>

                <p className="mt-3 text-neutral-600 text-sm leading-relaxed font-light">
                  Workshop kami terbuka untuk konsultasi langsung dan pengambilan pesanan. Silakan hubungi kami sebelum berkunjung.
                </p>

                <div className="mt-8 space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                        Alamat Studio
                      </h4>
                      <p className="text-neutral-700 mt-0.5 font-light">{address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                        Jam Operasional
                      </h4>
                      <p className="text-neutral-700 mt-0.5 font-light">{hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                        WhatsApp Fast Response
                      </h4>
                      <p className="text-neutral-700 mt-0.5 font-light">+{whatsappNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                        Instagram Portofolio
                      </h4>
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 hover:underline inline-flex items-center gap-1 font-medium text-xs mt-0.5"
                      >
                        <span>{instagramHandle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat WhatsApp Admin Sekarang</span>
              </a>
            </div>
          </FadeIn>

          {/* Google Maps Embed Frame */}
          <FadeIn direction="left" delay={200} className="lg:col-span-7 h-full">
            <div className="bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200/80 min-h-[380px] h-full relative shadow-2xs">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
