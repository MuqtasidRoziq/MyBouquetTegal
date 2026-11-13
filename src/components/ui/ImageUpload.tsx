'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, FileImage } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (publicUrl: string) => void;
  label?: string;
  maxSizeMB?: number;
  folder?: 'products' | 'store';
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Foto Produk (Upload Gambar Fisik)',
  maxSizeMB = 5,
  folder = 'products',
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Mengompres gambar menjadi WebP dan memperkecil dimensi (Max 1200px)
   */
  const compressToWebP = (file: File): Promise<{ dataUrl: string; sizeKB: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ dataUrl: event.target?.result as string, sizeKB: Math.round(file.size / 1024) });
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Kompresi ke format WebP dengan kualitas 80% (sangat jernih & ukuran kecil)
          const webpDataUrl = canvas.toDataURL('image/webp', 0.8);
          // Estimasi ukuran file
          const sizeKB = Math.round((webpDataUrl.length * (3 / 4)) / 1024);

          resolve({ dataUrl: webpDataUrl, sizeKB });
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Ukuran file asal maksimal ${maxSizeMB}MB.`);
      return;
    }

    setLoading(true);
    try {
      // 1. Kompresi ke WebP
      const { dataUrl, sizeKB } = await compressToWebP(file);

      // 2. Kirim ke API backend untuk ditulis sebagai file fisik di public/uploads/{folder}/
      const cleanFileName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: dataUrl,
          filename: cleanFileName,
          folder,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onChange(data.url); // Menyimpan URL fisik, e.g. "/uploads/produk-1234.webp"
        setFileDetails({
          name: data.filename,
          size: `${sizeKB} KB (WebP)`,
        });
      } else {
        setError(data.message || 'Gagal menyimpan file ke server.');
      }
    } catch {
      setError('Terjadi kesalahan saat memproses gambar.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setFileDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-neutral-700 text-xs sm:text-sm">
          {label}
        </label>
        {fileDetails && (
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Tersimpan: {fileDetails.size}
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900/5 flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview Gambar"
            className="w-auto h-auto max-w-full max-h-[360px] object-contain rounded-xl shadow-xs"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-white text-neutral-800 text-xs font-semibold shadow-md hover:bg-neutral-100 transition cursor-pointer"
            >
              Ganti File
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-xl bg-rose-600 text-white shadow-md hover:bg-rose-700 transition cursor-pointer"
              title="Hapus File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-6 sm:p-8 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-rose-400 bg-neutral-50/50 hover:bg-rose-50/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-100 group-hover:bg-rose-200 text-rose-600 flex items-center justify-center mb-2.5 transition">
            {loading ? (
              <span className="w-5 h-5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <p className="text-xs sm:text-sm font-semibold text-neutral-700">
            {loading ? 'Mengompres ke .webp & menyimpan fisik...' : 'Pilih File Gambar'}
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            Otomatis dikonversi ke <span className="font-semibold text-rose-500">.webp</span> fisik di folder <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">public/uploads/</code>
          </p>
        </div>
      )}

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
