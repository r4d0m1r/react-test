import { useEffect, useState } from 'react';
import { Hand } from 'Hand';
import type { FunctionComponent } from 'react';

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

export const rotate = (rotate: number, fractionDigits = 1) =>
  `rotate(${(rotate * 360).toFixed(fractionDigits)})`;

export const ClockHands: FunctionComponent = () => {
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
        className="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform"
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
