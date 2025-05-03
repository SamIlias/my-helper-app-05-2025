import axios from 'axios';

export async function getCoordinates(city: string) {
  const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const data = await res.data;

  if (data.results && data.results.length > 0) {
    // todo find by country too or get variants to choose
    // console.log(data.results);
    const { latitude, longitude, country, name } = data.results[0];
    return { latitude, longitude, country, name };
  } else {
    throw new Error('City not found');
  }
}
