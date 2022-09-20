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
}) => (
  <line
    className={`stroke-cap-round ${className}`}
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    {...rest}
  />
);
