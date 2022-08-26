import { useEffect, useState } from 'react';
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
            transform={`rotate(${(360 * index) / length})`}
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

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

const ClockHands: FunctionComponent = () => {
  const [time, setTime] = useState(getSecondsSinceMidnight());

  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      setTime(getSecondsSinceMidnight());
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Hand
        transform={rotate(time % 1, 0)}
        className="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 change-transform"
        length={83}
      />
      <Hand
        transform={rotate(((time / 60 / 60) % 12) / 12)}
        className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
        length={50}
      />
      <Hand
        transform={rotate(((time / 60) % 60) / 60)}
        className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
        length={70}
      />
      <Hand
        transform={rotate((time % 60) / 60)}
        className="stroke-red-500 stroke-width-2"
        length={77}
      />
    </>
  );
};
