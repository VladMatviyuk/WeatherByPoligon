import { useState } from 'react';

export const useDrawingFeatures = () => {
  const [features, setFeatures] = useState([]);

  return {features, setFeatures};
}