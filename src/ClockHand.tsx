import { memo, type SVGProps } from 'react';

interface ClockHandProps extends SVGProps<SVGLineElement> {
  length: number;
  limit?: number;
  stationary?: boolean;
}

const Hand = ({
  length = 0,
  limit = 94,
  stationary,
  ...rest
}: ClockHandProps) => (
  <line
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    strokeLinecap="round"
    {...rest}
  />
);

export const ClockHand = memo(Hand);
