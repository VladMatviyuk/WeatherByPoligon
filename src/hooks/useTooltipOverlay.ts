import { useEffect, useState } from 'react';
import { Overlay } from 'ol';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useTooltipOverlay = (map, tooltipRef) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  useEffect(() => {
    if (!map) return;

    const tooltipOverlay = new Overlay({
      element: tooltipRef?.current,
      offset: [10, 0],
      positioning: 'center-left',
    });

    map.addOverlay(tooltipOverlay);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    map.on('pointermove', (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const hoveredFeature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (hoveredFeature && hoveredFeature?.get('data')) {
        const coords = e.coordinate;
        tooltipOverlay.setPosition(coords);

        const data = hoveredFeature.get('data');

        setTooltipContent(`
            <div style="color:black; display: flex; flex-direction: column; font-size: 12px">
              <div>${data.name}</div>
              <div>${data.coord.lon}, ${data.coord.lat}</div>
              <div>Температура ${data.temp}</div>
              <div>Ощущается как  ${data.feels_like}</div>
              <div>Атмосферное давление ${data.pressure}</div>
              <div>Влажность ${data.humidity}</div>
              <div>Давление на уровне земли ${data.grnd_level}</div>
              <div>Давление на уровне моря ${data.sea_level}</div>
              <div>Видимость в метрах ${data.visibility}</div>
              <div>Скорость ветра ${data.speed}</div>
              <div>Направление ветра ${data.deg}</div>
              <div>Облачность ${data.clouds.all}</div>
            </div>
          `);
      } else {
        tooltipOverlay.setPosition(undefined);
        setTooltipContent(null);
      }
    });
  }, [map])


  return {tooltipContent};
}