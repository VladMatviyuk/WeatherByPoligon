import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';

export const useInitialMap = () => {
  const [map, setMap] = useState<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer | null>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([53.203727, 56.849999]),
        zoom: 12,
      }),
    });

    // Create and add vector layer
    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(75, 137, 220, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(75, 137, 220, 1)',
          width: 2
        })
      })
    });

    initialMap.addLayer(vectorLayer);
    vectorLayerRef.current = vectorLayer;
    setMap(initialMap);

    return () => initialMap.removeLayer(vectorLayer);
  }, []);

  return {map, vectorLayerRef};
}