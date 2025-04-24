import { FC } from 'react';
import { Feature } from 'ol';

interface IProps {
  readonly features: Feature[];
}

export const WeatherList: FC<IProps> = ({features}) => {
  return (
    <div className='polygonList'>
      <div>Сохраненные полигоны: { features.length }</div>
      <ul>
        { features.map((feature, idx) => (
          <li key={ idx } className='polygonItemInfo'>
            <div><strong>{ feature.get('data')?.name }</strong></div>
            <div>Температура: { feature.get('data')?.temp }</div>
            <div>Направление ветра: { feature.get('data')?.deg}</div>
            <div>Облачность: { feature.get('data')?.clouds }</div>
          </li>
        )) }
      </ul>
    </div>
  )
}