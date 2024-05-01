import { useState, useEffect, useCallback } from 'react';
import { DonationsDisplayList } from './DonationsDisplayList.jsx';

export function DonationsList() {
  const [donations, setDonations] = useState([]);

  const fetchDonations = useCallback(() => {
    fetch('http://localhost:4000/donations', {
      headers: {
        Accept: 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setDonations(data);
        }
      });
  }, []);

  useEffect(() => {
    fetchDonations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Donations List</h1>
      <DonationsDisplayList donations={donations} />
    </div>
  );
}
