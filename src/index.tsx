import 'uno.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClockFace } from 'ClockFace';

const root = document.querySelector('#root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ClockFace />
    </StrictMode>
  );
else throw new Error('#root element not found!');
