import { type FC, useState } from 'react';

export type WeatherApiType = 'OpenWeatherMap' | 'YandexApi' | 'TomorrowIo';

interface IProps {
  readonly onChange: (value: WeatherApiType) => void;
}

export const SelectorApi: FC<IProps> = ({onChange}) => {
  const [selectedApi, setSelectedApi] = useState<WeatherApiType>('OpenWeatherMap');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as WeatherApiType;
    setSelectedApi(value);
    onChange(value); // Пробрасываем изменение наружу
  };

  return (
    <select value={ selectedApi } onChange={ handleChange } style={{padding: '6px'}}>
      <option value="OpenWeatherMap">OpenWeatherMap</option>
      <option value="YandexApi">Yandex Weather</option>
    </select>
  )
}