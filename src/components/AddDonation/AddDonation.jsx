import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { MoneyInput } from '../forms/MoneyInput.jsx';

export function AddDonation() {
  const [inputs, setInputs] = useState({ type: 'Manual', firstName: '', lastName: '' });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationDate, setDonationDate] = useState(new Date());
  const [enterAmount, setEnterAmount] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.amount) {
      setEnterAmount(true);
    } else {
      const fullInfo = { ...inputs, createdAtUtc: donationDate.getTime(), isAnonymous: isAnonymous };
      fetch('http://localhost:4000/donations', {
        method: 'POST',
        body: JSON.stringify(fullInfo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        });
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px' }}>
      <div className="mt-2">
        <Link to="/" className="btn btn-primary">
          Back to donations list
        </Link>
      </div>
      <h1>Add Donation</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="firstName"
                id="first-name"
                placeholder="First name"
                value={inputs.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="lastName"
                id="last-name"
                placeholder="Last name"
                value={inputs.lastName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <MoneyInput
              className="col-md-6"
              nameText="Amount"
              name="amount"
              onChange={handleChange}
              value={inputs.amount || ''}
            />
            <MoneyInput
              className="col-md-6"
              nameText="Refunded amount"
              name="refundedAmount"
              onChange={handleChange}
              value={inputs.refundedAmount || ''}
            />
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="type-donation">
              Type
            </label>
            <div className="col-sm-9">
              <select
                className="form-select"
                name="type"
                id="type-donation"
                value={inputs.type}
                onChange={handleChange}
              >
                <option value="Charge">Charge</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3" htmlFor="date-donation">
              Date
            </label>
            <div className="col-sm-9">
              <DatePicker id="date-donation" selected={donationDate} onChange={(date) => setDonationDate(date)} />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="thank-you">
              Thank you comment
            </label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                name="thankYouComment"
                id="thank-you"
                rows="2"
                value={inputs.thankYouComment || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="company-name">
              Company name
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                name="companyName"
                id="company-name"
                value={inputs.companyName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="anonymous-donation"
              name="isAnonymous"
              value={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="anonymous-donation">
              Anonymous donation
            </label>
          </div>
          <div className="d-flex">
            <input className="btn btn-primary" type="submit" value="Add donation" />
            {enterAmount && <div>Please enter amount</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
