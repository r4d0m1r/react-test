import type { ReadonlySignal } from '@preact/signals-react';
import type { FunctionComponent, SVGProps } from 'react';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform: ReadonlySignal<string>;
} & Omit<SVGProps<SVGLineElement>, 'transform'>;

export const Hand: FunctionComponent<HandProps> = ({
  className = '',
  length = 0,
  limit = 94,
  stationary,
  transform,
  ...rest
}) => (
  <line
    className={`stroke-cap-round ${className}`}
    transform={transform.value}
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    {...rest}
  />
);
