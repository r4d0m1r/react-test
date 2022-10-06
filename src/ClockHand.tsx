import type { SVGProps } from 'react';

type SignalLike<T> = {
  value: T;
};

type ClockHandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform: SignalLike<string>;
} & Omit<SVGProps<SVGLineElement>, 'transform'>;

export const ClockHand = ({
  length = 0,
  limit = 94,
  stationary,
  transform: { value },
  ...rest
}: ClockHandProps) => (
  <line
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    strokeLinecap="round"
    transform={value}
    {...rest}
  />
);
