#!/bin/bash
echo "🔴 Menghentikan semua proses genieacs-sim..."

# Cari semua proses genieacs-sim dan hentikan
pkill -f "genieacs-sim"

# Tunggu sebentar biar semua proses mati
sleep 1

# Pastikan gak ada proses tersisa
if pgrep -f "genieacs-sim" > /dev/null; then
  echo "⚠️ Masih ada proses tersisa, coba hentikan paksa..."
  pkill -9 -f "genieacs-sim"
else
  echo "✅ Semua proses genieacs-sim berhasil dihentikan."
fi
