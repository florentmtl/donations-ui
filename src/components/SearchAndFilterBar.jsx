export function SearchAndFilterBar({ sortOrder, setSortOrder, sortProp, setSortProp, searchValue, setSearchValue }) {
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="d-flex align-self-center">
      <div className="me-3">
        <input
          type="text"
          name="search-bar"
          id="search-donations"
          placeholder="Search contact name..."
          value={searchValue}
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
