import { useEffect } from 'react';
import { computed, signal } from '@preact/signals-react';
import { Hand } from 'Hand';
import type { FunctionComponent } from 'react';

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

const time = signal(getSecondsSinceMidnight());
const miliseconds = computed(() => rotate(time.value % 1, 0));
const seconds = computed(() => rotate((time.value % 60) / 60));
const minutes = computed(() => rotate(((time.value / 60) % 60) / 60));
const hours = computed(() => rotate(((time.value / 60 / 60) % 12) / 12));

export const ClockFace: FunctionComponent = () => {
  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      time.value = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
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
              transform={computed(() => rotate(index / length, 0))}
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
          <Hand
            transform={miliseconds}
            className="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform"
            length={83}
          />
          <Hand
            transform={hours}
            className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
            length={50}
          />
          <Hand
            transform={minutes}
            className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
            length={70}
          />
          <Hand
            transform={seconds}
            className="stroke-red-500 stroke-width-2"
            length={77}
          />
        </g>
      </svg>
    </div>
  );
};
