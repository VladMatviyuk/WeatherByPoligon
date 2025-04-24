import { useRef, useState } from 'react';
import 'ol/ol.css';
import { SelectorApi, WeatherApiType } from '../../components/SelectorApi/SelectorApi.tsx';
import { useToggleDraw } from '../../hooks/useToggleDraw.ts';
import { useInitialMap } from '../../hooks/useInitialMap.ts';
import { ToggleDrawingButton } from '../../components/ToggleDrawingButton/ToggleDrawingButton.tsx';
import { useDrawingFeatures } from '../../hooks/useDrawingFeatures.ts';
import { useTooltipOverlay } from '../..//hooks/useTooltipOverlay.ts';
import { WeatherList } from '../../components/WeatherList/WeatherList.tsx';
import { Tooltip } from '../../components/Tooltip/Tooltip.tsx';

const WeatherMap = () => {

  const [typeApi, setTypeApi] = useState<WeatherApiType>('OpenWeatherMap');
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const {map, vectorLayerRef} = useInitialMap();
  const {features, setFeatures} = useDrawingFeatures();
  const {toggleDrawing, isDrawing} = useToggleDraw(map, vectorLayerRef, setFeatures, typeApi);
  const {tooltipContent} = useTooltipOverlay(map, tooltipRef);


  return (
    <>
      <div id="map"/>

      <div className='actions'>
        <ToggleDrawingButton onClick={ toggleDrawing } isDrawing={ isDrawing }/>
        <SelectorApi onChange={ (value: WeatherApiType) => setTypeApi(value) }/>
      </div>

      <Tooltip tooltipRef={tooltipRef} tooltipContent={tooltipContent} />
      <WeatherList features={ features }/>
    </>
  );
};

export default WeatherMap;