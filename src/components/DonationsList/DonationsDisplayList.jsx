import { useState, useCallback, useMemo, useEffect } from 'react';
import { SearchAndFilterBar } from './SearchAndFilterBar.jsx';
import { MultiPageFooter } from './MultiPageFooter.jsx';

export function DonationsDisplayList() {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [pageNum, setPageNum] = useState(1);
  const [sortOrder, setSortOrder] = useState('don-asc');
  const [sortProp, setSortProp] = useState('not-sorted');
  const [searchValue, setSearchValue] = useState('');
  const [dataBack, setDataBack] = useState({ donations: [] });

  const fetchDonations = () =>
    fetch('http://localhost:4000/donations?' + 'rowsPerPage=' + rowsPerPage + '&pageNum=' + pageNum, {
      headers: {
        Accept: 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setDataBack(data);
        }
      });

  useEffect(() => {
    fetchDonations();
  }, [rowsPerPage, pageNum]);

  const donations = dataBack.donations;
  const isPageMin = dataBack.isPageMin;
  const isPageMax = dataBack.isPageMax;

  const sortFunction = useCallback(
    (a, b) => {
      if (sortProp === 'date') {
        return (a.donation.createdAtUtc - b.donation.createdAtUtc) * (sortOrder === 'don-asc' ? 1 : -1);
      } else if (sortProp === 'amount') {
        return (a.donation.amount - b.donation.amount) * (sortOrder === 'don-asc' ? 1 : -1);
      } else if (sortProp === 'contact') {
        //issue with sorting names
        const aFullName = a.donation.firstName + ' ' + a.donation.lastName;
        const bFullName = b.donation.firstName + ' ' + b.donation.lastName;
        return aFullName.localeCompare(bFullName) * (sortOrder === 'don-asc' ? 1 : -1);
      }
    },
    [sortOrder, sortProp],
  );

  const donationsFiltered = useMemo(
    () =>
      donations
        .filter((item) => {
          const fullName = item.donation.firstName + ' ' + item.donation.lastName;
          return fullName.toLowerCase().includes(searchValue) || !searchValue;
        })
        .sort(sortFunction),
    [donations, searchValue, sortFunction],
  );

  return (
    <div className="mb-3">
      <div className="mb-3">
        <SearchAndFilterBar
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortProp={sortProp}
          setSortProp={setSortProp}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Contact</th>
            <th scope="col">Date</th>
            <th scope="col">Thank you comment</th>
            <th scope="col">Anonymous</th>
            <th scope="col">Company name</th>
            <th scope="col">Refunded Amount</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {donationsFiltered
            //.slice(
            //  Math.min((pageNum - 1) * rowsPerPage, donationsFiltered.length - 1),
            //  Math.min(pageNum * rowsPerPage, donationsFiltered.length),
            //)
            .map((donation) => (
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
      <MultiPageFooter
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        pageNum={pageNum}
        setPageNum={setPageNum}
        numTotalElements={donationsFiltered.length}
        isPageMin={isPageMin}
        isPageMax={isPageMax}
      />
    </div>
  );
}
