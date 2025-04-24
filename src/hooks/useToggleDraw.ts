import { fetchFromOpenWeatherMap } from '../api/openweathermap.api.ts';
import { useEffect, useRef, useState } from 'react';
import Draw from 'ol/interaction/Draw';
import { Polygon } from 'ol/geom';
import { fetchFromYandexMap } from '../api/yandexmap.api.ts';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useToggleDraw = (map, vectorLayerRef, setFeatures, typeApi) => {
  const drawRef = useRef<Draw | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);


  const toggleDrawing = () => {
    if (!map) return;

    if (isDrawing) {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current);
        drawRef.current = null;
      }
    } else {

      const source = vectorLayerRef.current?.getSource();
      if (!source) return;

      const draw = new Draw({
        source: source,
        type: 'Polygon'
      });

      draw.on('drawend', (e) => {
        const feature = e.feature;
        const polygon = feature.getGeometry() as Polygon;
        const coordinates = polygon.getCoordinates();
        console.log('typeApi', typeApi)
        if (typeApi === 'OpenWeatherMap') {
          fetchFromOpenWeatherMap(coordinates).then(res => {
            console.log('OpenWeatherMap res', res)
            const data = adapterOpenWeatherMap(res)
            feature.set('data', data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setFeatures(prev => [...prev, feature]);
          });
        } else if(typeApi === 'YandexApi') {
          fetchFromYandexMap(coordinates).then(res => {
            console.log('YandexApi', res)
            const data = adapterYandexMap(res);
            feature.set('data', data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setFeatures(prev => [...prev, feature]);
          })
        }else {
          alert('api not working...')
        }

        if (drawRef.current) {
          map.removeInteraction(drawRef.current);
          drawRef.current = null;
        }
        setIsDrawing(false);
      });

      map.addInteraction(draw);
      drawRef.current = draw;
    }

    setIsDrawing(!isDrawing);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (map && drawRef.current) {
        map.removeInteraction(drawRef.current);
      }
    };
  }, [map]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const adapterOpenWeatherMap = (data) => {
    return {
      name: data.name,
      coord: {
        lon: data.coord.lon,
        lat: data.coord.lat,
      },
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.pressure,
      grnd_level: data.main.grnd_level,
      sea_level: data.main.sea_level,
      visibility: data.visibility,
      speed: data.wind.speed,
      deg: data.wind.deg,
      clouds: data.clouds.all,
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const adapterYandexMap = (data) => {
    return {
      name: data.info.tzinfo.name,
      coord: {
        lon: data.info.lon,
        lat: data.info.lat,
      },
      temp: data.fact.temp,
      feels_like: data.fact.feels_like,
      pressure: data.fact.pressure_mm,
      humidity: data.fact.humidity,
      grnd_level: data.fact.pressure_mm,
      sea_level: data.fact?.sea_level,
      visibility: data?.visibility,
      speed: data.fact.wind_speed,
      deg: data.fact.wind_gust,
      clouds: data.fact.cloudness,
    }
  }

  return {toggleDrawing, isDrawing};
}