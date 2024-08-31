import React from 'react';
import { createRoot } from 'react-dom/client';
import RentalRequestForm from './components/RentalRequestForm/RentalRequestForm';
import './styles/index.css';

const container = document.getElementById('standalone-rental-form');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RentalRequestForm />
    </React.StrictMode>
  );
}