#!/bin/bash

ICON_DIR="public/assets/weather-icons"
mkdir -p "$ICON_DIR"

icons=(
  01d 01n
  02d 02n
  03d 03n
  09d 09n
  10d 10n
  11d 11n
  13d 13n
  50d 50n
)

for icon in "${icons[@]}"; do
  url="http://openweathermap.org/img/wn/${icon}@2x.png"
  output="${ICON_DIR}/${icon}@2x.png"
  echo "Downloading $url -> $output"
  curl -s -o "$output" "$url"
done

echo "✅ All the icons have downloaded to $ICON_DIR"
