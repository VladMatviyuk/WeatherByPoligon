import { toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';

export const fetchFromOpenWeatherMap = async (coordinates: Coordinate[][]) => {
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
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=59876c826eccf5439d8cde07022032ee&units=metric&lang=ru`
  );
  return await response.json();
};