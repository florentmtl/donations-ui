export function SearchAndFilterBar({ donations, setDonationsFiltered }) {
  const handleSearch = (e) => {
    setDonationsFiltered(
      donations.filter((item) => {
        const fullName = item.donation.firstName.toLowerCase() + ' ' + item.donation.lastName.toLowerCase();
        return fullName.includes(e.target.value) || !e.target.value;
      }),
    );
  };

  return (
    <div>
      <input
        type="text"
        name="search-bar"
        id="search-donations"
        placeholder="Search contact name..."
        onChange={handleSearch}
      />
    </div>
  );
}
