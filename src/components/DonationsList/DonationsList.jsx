import { useState, useEffect, useCallback } from 'react';
import { DonationsDisplayList } from './DonationsDisplayList.jsx';

export function DonationsList() {
  return (
    <div className="container">
      <h1>Donations List</h1>
      <DonationsDisplayList/>
    </div>
  );
}
