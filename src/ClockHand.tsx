import type { FunctionComponent, SVGProps } from 'react';

type SignalLike<T> = {
  value: T;
};

type ClockHandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform: SignalLike<string>;
} & Omit<SVGProps<SVGLineElement>, 'transform'>;

export const ClockHand: FunctionComponent<ClockHandProps> = ({
  className = '',
  length = 0,
  limit = 94,
  stationary,
  transform: { value },
  ...rest
}) => (
  <line
    className={`stroke-cap-round ${className}`}
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    transform={value}
    {...rest}
  />
);
