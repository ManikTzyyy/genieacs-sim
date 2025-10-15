#!/bin/bash
ACS_URL="http://192.168.3.254:7547"
i=0

for f in SIM-FTTH-*.csv; do
  echo "Starting simulator for $f ..."
  ./genieacs-sim -u "$ACS_URL" -m "$f" -s "$i" -p 1 -w 500 &
  ((i++))
  sleep 0.5
done

echo "Semua simulator udah dijalankan!"

