export function MultiPageFooter({
  rowsPerPage,
  setRowsPerPage,
  pageNum,
  setPageNum,
  numTotalElements,
  isPageMin,
  isPageMax,
}) {
  const handleRowsChange = (e) => {
    // aggressive solution
    setPageNum(1);
    setRowsPerPage(parseInt(e.target.value));
  };

  return (
    <div className="d-flex flex-row justify-content-center align-self-center">
      <div className="me-3 d-flex align-self-center">
        <label className="me-2" htmlFor="select-pprows-donations">
          Rows per page
        </label>
        <select name="select-pprows" id="select-pprows-donations" value={rowsPerPage} onChange={handleRowsChange}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="me-3 d-flex align-self-center">
        {1 + (pageNum - 1) * rowsPerPage}-{Math.min(pageNum * rowsPerPage, numTotalElements)} of {numTotalElements}
      </div>

      <div className="d-flex align-self-center">
        <button
          className="btn btn-secondary"
          //disabled={pageNum === 1 ? true : false}
          disabled={isPageMin}
          onClick={() => {
            setPageNum(1);
          }}
        >
          {'<<'}
        </button>

        <button
          className="btn btn-secondary"
          // disabled={pageNum === 1 ? true : false}
          disabled={isPageMin}
          onClick={() => {
            setPageNum(Math.max(1, pageNum - 1));
          }}
        >
          {'<'}
        </button>

        <button
          className="btn btn-secondary"
          // disabled={pageNum * rowsPerPage >= numTotalElements ? true : false}
          disabled={isPageMax}
          onClick={() => {
            //setPageNum(Math.min(Math.ceil(numTotalElements / rowsPerPage), pageNum + 1));
            setPageNum(pageNum + 1);
          }}
        >
          {'>'}
        </button>

        <button
          className="btn btn-secondary"
          //disabled={pageNum * rowsPerPage >= numTotalElements ? true : false}
          disabled={isPageMax}
          onClick={() => {
            setPageNum(Math.ceil(numTotalElements / rowsPerPage));
          }}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}
