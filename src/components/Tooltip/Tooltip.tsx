import { FC } from 'react';

interface IProps {
  readonly tooltipRef: any;
  readonly tooltipContent: any;
}

export const Tooltip: FC<IProps> = ({tooltipRef, tooltipContent}) => {
  return (
    <div
      ref={ tooltipRef }
      className='tooltipContainer'
      style={ {display: tooltipContent ? 'block' : 'none'} }
      dangerouslySetInnerHTML={ {__html: tooltipContent} }
    />
  )
}