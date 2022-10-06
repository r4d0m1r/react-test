import { useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import { ClockHand } from 'ClockHand';

export const ClockFace = () => {
  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  const time = useSignal(getSecondsSinceMidnight());

  const rotate = (rotate: number, fractionDigits = 1) =>
    `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
  const miliseconds = useComputed(() => rotate(time.value % 1, 0));
  const seconds = useComputed(() => rotate((time.value % 60) / 60));
  const minutes = useComputed(() => rotate(((time.value / 60) % 60) / 60));
  const hours = useComputed(() => rotate(((time.value / 60 / 60) % 12) / 12));

  useSignalEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      time.value = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  });

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
            <ClockHand
              key={index}
              transform={{ value: rotate(index / length, 0) }}
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
          <ClockHand
            transform={miliseconds}
            className="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform"
            length={83}
          />
          <ClockHand
            transform={hours}
            className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
            length={50}
          />
          <ClockHand
            transform={minutes}
            className="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
            length={70}
          />
          <ClockHand
            transform={seconds}
            className="stroke-red-500 stroke-width-2"
            length={77}
          />
        </g>
      </svg>
    </div>
  );
};
