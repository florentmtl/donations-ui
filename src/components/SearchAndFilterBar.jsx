import { useState, useEffect } from 'react';

export function SearchAndFilterBar({ donations, setDonationsFiltered }) {
  const [sortOrder, setSortOrder] = useState('don-asc');
  const [sortProp, setSortProp] = useState('not-sorted');
  const [searchValue, setSearchValue] = useState('');

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortFunction = (a, b) => {
    if (sortProp === 'date') {
      return (a.donation.createdAtUtc - b.donation.createdAtUtc) * (sortOrder === 'don-asc' ? 1 : -1);
    } else if (sortProp === 'amount') {
      return (a.donation.amount - b.donation.amount) * (sortOrder === 'don-asc' ? 1 : -1);
    } else if (sortProp === 'contact') {
      const aFullName = a.donation.firstName.toLowerCase() + ' ' + a.donation.lastName.toLowerCase();
      const bFullName = b.donation.firstName.toLowerCase() + ' ' + b.donation.lastName.toLowerCase();
      return aFullName.localeCompare(bFullName) * (sortOrder === 'don-asc' ? 1 : -1);
    }
  };

  useEffect(
    () =>
      setDonationsFiltered(
        donations
          .filter((item) => {
            const fullName = item.donation.firstName.toLowerCase() + ' ' + item.donation.lastName.toLowerCase();
            return fullName.includes(searchValue) || !searchValue;
          })
          .sort(sortFunction),
      ),
    [searchValue, donations, sortProp, sortOrder],
  );

  return (
    <div className="mb-3 d-flex align-self-center">
      <div className="me-3">
        <input
          type="text"
          name="search-bar"
          id="search-donations"
          placeholder="Search contact name..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="me-3 d-flex align-self-center">
        <select
          name="filter-donations"
          id="filter-donations"
          value={sortProp}
          onChange={(e) => setSortProp(e.target.value)}
        >
          <option value="not-sorted">Sort by…</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="contact">Contact name</option>
        </select>
      </div>
      <div className="d-flex align-self-center">
        <div className="me-2">
          <input
            className="form-check-input"
            type="radio"
            name="donations-order"
            id="donations-ascending"
            value="don-asc"
            checked={sortOrder === 'don-asc'}
            onChange={handleSortOrderChange}
            disabled={sortProp === 'not-sorted'}
          />
          <label className="form-check-label" htmlFor="donations-ascending">
            Ascending
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="donations-order"
            id="donations-descending"
            value="don-desc"
            checked={sortOrder === 'don-desc'}
            onChange={handleSortOrderChange}
            disabled={sortProp === 'not-sorted'}
          />
          <label className="form-check-label" htmlFor="donations-descending">
            Descending
          </label>
        </div>
      </div>
    </div>
  );
}
