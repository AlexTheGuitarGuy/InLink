import s from './Paginator.module.css';
import React from 'react';

const Paginator = ({
  totalUsers,
  pageSize,
  currentPagesBeginning,
  setCurrentPages,
  changePage,
  page,
}) => {
  let pagesNb = Math.ceil(totalUsers / pageSize);

  let mappedPages = [];
  for (let i = 1; i <= pagesNb; i++) {
    mappedPages[i] = (
      <span
        key={i}
        onClick={() => {
          if (i === currentPagesBeginning) {
            if (currentPagesBeginning - 5 < 1) {
              setCurrentPages(1);
            } else setCurrentPages(currentPagesBeginning - 5);
          } else if (i === currentPagesBeginning + 9) {
            if (currentPagesBeginning + 4 > pagesNb - 10) {
              setCurrentPages(pagesNb - 9);
            } else setCurrentPages(currentPagesBeginning + 4);
          }
          changePage(i);
        }}
        className={i === page && s.chosenPage}
      >
        {`${i} `}
      </span>
    );
  }

  let currentPages = [];
  for (let i = currentPagesBeginning, lim = i + 10; i < lim; i++) {
    currentPages[i] = mappedPages[i];
  }

  const moveToExtreme = (currentPages, page, symbol) => (
    <span
      onClick={() => {
        setCurrentPages(currentPages);
        changePage(page);
      }}
    >
      {symbol}
    </span>
  );

  const firstPage = moveToExtreme(1, 1, '<< ');
  const lastPage = moveToExtreme(pagesNb - 9, pagesNb, ' >>');

  const moveOnePage = (
    check1,
    check2,
    check3,
    currentPagesCheck3,
    currentPagesCheck2,
    currentPagesCheck1,
    symbol,
  ) => (
    <span
      onClick={() => {
        if (check1) {
          if (check2)
            if (check3) {
              setCurrentPages(currentPagesCheck3);
            } else setCurrentPages(currentPagesCheck2);
          changePage(currentPagesCheck1);
        }
      }}
    >
      {symbol}
    </span>
  );

  const pagesBefore = moveOnePage(
    page > 1,
    page === currentPagesBeginning + 1,
    currentPagesBeginning - 5 < 1,
    1,
    currentPagesBeginning - 5,
    page - 1,
    '< ',
  );

  const pagesAfter =
    (page < pagesNb,
    page === currentPagesBeginning + 8,
    currentPagesBeginning + 4 > pagesNb - 10,
    pagesNb - 9,
    currentPagesBeginning + 4,
    currentPagesBeginning + 4,
    page + 1,
    ' >');

  return (
    <span className={s.pages}>
      <div align="center">
        {firstPage}
        {pagesBefore}
        {currentPages}
        {pagesAfter}
        {lastPage}
      </div>
    </span>
  );
};

export default Paginator;
