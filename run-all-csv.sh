#!/bin/bash
# /opt/genieacs/genieacs-sim/run-all.sh

ACS_URL="http://192.168.3.254:7547"
SIM_DIR="/opt/genieacs/genieacs-sim"
GENIE_SIM="$SIM_DIR/genieacs-sim"

cd "$SIM_DIR" || exit 1

i=0
PIDS=()

for f in SIM-FTTH-*.csv; do
  echo "$(date -Iseconds) Starting simulator for $f ..."
  # jalankan proses, log ke file per device
  mkdir -p "$SIM_DIR/logs"
  LOGFILE="$SIM_DIR/logs/${f%.csv}.log"

  # jalankan simulator; -p 1 artinya 1 device per proses; -s offset serial
  # gunakan nohup agar proses tetap hidup jika systemd restart script; output ke logfile
  nohup "$GENIE_SIM" -u "$ACS_URL" -m "$f" -s "$i" -p 1 -w 500 >> "$LOGFILE" 2>&1 &

  PIDS+=($!)
  ((i++))
  sleep 0.5
done

echo "$(date -Iseconds) Semua simulator udah dijalankan! PIDs: ${PIDS[*]}"

# Tunggu sampai semua child process selesai (agar service tidak exit)
# Sistemd akan melihat script ini masih berjalan — bagus.
wait
