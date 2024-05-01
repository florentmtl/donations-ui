import { useState, useEffect } from 'react';
import { SearchAndFilterBar } from './SearchAndFilterBar.jsx';

export function DonationsDisplayList({ donations }) {
  //  const [rowsPerPage, setRowsPerPage] = useState(30);
  //  const [pageNum, setPageNum] = useState(1);
  const [donationsFiltered, setDonationsFiltered] = useState(donations);

  useEffect(() => {
    return () => {
      setDonationsFiltered(donations);
    };
  }, [donations]);

  return (
    <div>
      <SearchAndFilterBar donations={donations} setDonationsFiltered={setDonationsFiltered} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Contact</th>
            <th scope="col">Date</th>
            <th scope="col">Thank you comment</th>
            <th scope="col">Anonymous</th>
            <th scope="col">Copmany name</th>
            <th scope="col">Refunded Amount</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {donationsFiltered.map((donation) => (
            <tr key={donation.id}>
              <td>${donation.donation.amount}</td>
              <td>{donation.type}</td>
              <td>
                {donation.donation.firstName} {donation.donation.lastName}
              </td>
              <td>{new Date(donation.donation.createdAtUtc).toDateString()}</td>
              <td style={{ maxWidth: '200px' }}>{donation.donation.thankYouComment}</td>
              <td>{donation.donation.isAnonymous ? 'Yes' : 'No'}</td>
              <td>{donation.donation.companyName}</td>
              <td>{donation.refundedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}