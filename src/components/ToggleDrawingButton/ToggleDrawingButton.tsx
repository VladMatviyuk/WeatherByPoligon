import { type FC } from 'react';

interface IProps {
  readonly onClick: () => void;
  readonly isDrawing: boolean;
}

export const ToggleDrawingButton: FC<IProps> = ({onClick, isDrawing}) => {
  return (
    <button onClick={ onClick }>
      { isDrawing ? 'Stop drawing' : 'Start draw' }
    </button>
  )
}