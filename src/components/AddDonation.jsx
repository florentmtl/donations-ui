import { Link } from 'react-router-dom';

export function AddDonation() {
  return (
    <div className="container">
      <div className="mt-2">
        <Link to="/" className="btn btn-primary">
          Back to donations list
        </Link>
      </div>
      <h1>Add Donation</h1>
    </div>
  );
}
