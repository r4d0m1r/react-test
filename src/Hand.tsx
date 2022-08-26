import type { FunctionComponent, SVGProps } from 'react';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & SVGProps<SVGLineElement>;

export const Hand: FunctionComponent<HandProps> = ({
  className = '',
  length = 0,
  limit = 94,
  stationary,
  ...rest
}) => {
  return (
    <line
      {...(stationary && { y1: length - limit })}
      y2={-(stationary ? limit : length)}
      className={`stroke-cap-round ${className}`}
      {...rest}
    />
  );
};
