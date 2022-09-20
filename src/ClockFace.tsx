import { ClockHands, rotate } from 'ClockHands';
import { Hand } from 'Hand';
import type { FunctionComponent } from 'react';

export const ClockFace: FunctionComponent = () => (
  <div className="flex items-center justify-center h-full @dark:bg-neutral-700">
    <svg viewBox="0 0 200 200" className="h-95vmin">
      <g className="translate-100px">
        <circle
          className="stroke-neutral-900 @dark:stroke-neutral-100 fill-none"
          r="99"
        />
        {Array.from({ length: 60 }, (_, index) => ({
          isHour: index % 5 === 0,
        })).map(({ isHour }, index, { length }) => (
          <Hand
            key={index}
            transform={rotate(index / length, 0)}
            className={
              isHour
                ? 'stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2'
                : 'stroke-neutral-400 @dark:stroke-neutral-600'
            }
            length={isHour ? 7 : 3}
            stationary
          />
        ))}
      </g>
      <g className="translate-100px">
        <ClockHands />
      </g>
    </svg>
  </div>
);
