'use client';

import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-100 space-y-4 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300 mb-0 sm:my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg text-neutral-900">{title}</h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
            {message}
          </p>
          {itemName && (
            <div className="mt-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-neutral-800 break-words">
              {itemName}
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs sm:text-sm transition cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isLoading ? 'Menghapus...' : 'Ya, Hapus'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
