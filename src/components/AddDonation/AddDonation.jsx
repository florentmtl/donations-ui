import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function AddDonation() {
  const handleSubmit = () => {};

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
              <input className="form-control" type="text" name="first-name" id="first-name" placeholder="First name" />
            </div>
            <div className="col">
              <input className="form-control" type="text" name="last-name" id="last-name" placeholder="Last name" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="amount-form">Amount</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="text" id="amount-form" className="form-control" />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="refunded-amount-form">Refunded amount</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="text" id="refunded-amount-form" className="form-control" />
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="type-donation">
              Type
            </label>
            <div className="col-sm-9">
              <select className="form-select" name="type-donation" id="type-donation">
                <option value="charge">Charge</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3" htmlFor="date-donation">
              Date
            </label>
            <div className="col-sm-9">
              <DatePicker id="date-donation" />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="thank-you">
              Thank you comment
            </label>
            <div className="col-sm-9">
              <textarea className="form-control" name="thank-you" id="thank-you" rows="2" />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="company-name">
              Company name
            </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="company-name" id="company-name" />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input className="form-check-input" type="checkbox" value="" id="anonymous-donation" />
            <label className="form-check-label" htmlFor="anonymous-donation">
              Anonymous donation
            </label>
          </div>
          <input className="btn btn-primary" type="submit" value="Add donation" />
        </form>
      </div>
    </div>
  );
}
