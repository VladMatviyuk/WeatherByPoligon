import { toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';

export const fetchFromYandexMap = async (coordinates: Coordinate[][]) => {
  const polygonPoints = coordinates[0];

  let sumX = 0;
  let sumY = 0;

  for (const point of polygonPoints) {
    sumX += point[0];
    sumY += point[1];
  }

  const centerX = sumX / polygonPoints.length;
  const centerY = sumY / polygonPoints.length;

  const [lon, lat] = toLonLat([centerX, centerY]);
  const response = await fetch(
    `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&lang=ru`, {
      headers: {
        'X-Yandex-API-Key': 'f37f5e78-bfa2-46c9-a334-7dab3dd7513c'
      }
    }
  );
  return await response.json();
};