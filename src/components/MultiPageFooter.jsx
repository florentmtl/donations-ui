export function MultiPageFooter({ rowsPerPage, setRowsPerPage, pageNum, setPageNum, numTotalElements }) {
  // for rows per page define dropdown with predefined values

  const handleRows = (e) => {
    setRowsPerPage(e.target.value);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-self-center">
      <div className="me-3 d-flex align-self-center">
        <label htmlFor="donations-rows-per-page">Rows per page </label>
        <input
          style={{ width: '50px' }}
          type="number"
          name="rows-per-page"
          id="donations-rows-per-page"
          value={rowsPerPage}
          onChange={handleRows}
        />
      </div>
      <div className="me-3 d-flex align-self-center">
        {1 + (pageNum - 1) * rowsPerPage}-{Math.min(pageNum * rowsPerPage, numTotalElements)} of {numTotalElements}
      </div>
      <div className="d-flex align-self-center">
        <button
          className="btn"
          onClick={() => {
            setPageNum(Math.max(1, pageNum - 1));
          }}
        >
          {'<'}
        </button>
        <button
          className="btn"
          onClick={() => {
            setPageNum(Math.min(Math.ceil(numTotalElements / rowsPerPage), pageNum + 1));
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
