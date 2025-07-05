export async function getCityFromCoords(lat: number, lon: number): Promise<string | null> {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.city || data.locality;
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    return null;
  }
}
