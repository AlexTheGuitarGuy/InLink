import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({
  totalUsers,
  portionSize,
  pageSize,
  changePage,
  page,
}) => {
  const pagesNb = Math.ceil(totalUsers / pageSize);

  const calcPagesBeginning = () => {
    if (page - Math.floor(portionSize / 2) > 1) {
      if (page - Math.floor(portionSize / 2) > pagesNb - portionSize)
        return pagesNb - portionSize + 1;
      return page - Math.floor(portionSize / 2);
    }

    return 1;
  };

  const [currentPagesBeginning, setCurrentPages] = useState(
    calcPagesBeginning(),
  );

  const changeOnClick = (i) => {
    const portionBeginning = i - Math.floor(portionSize / 2);
    const portion = portionBeginning > 1 ? portionBeginning : 1;
    setCurrentPages(portion);
    changePage(i);
  };

  let mappedPages = [];
  for (let i = 1; i <= pagesNb; i++) {
    mappedPages[i] = (
      <span
        key={i}
        onClick={() => changeOnClick(i)}
        className={cn({ [s.chosenPage]: i === page })}
      >
        {`${i} `}
      </span>
    );
  }

  let currentPages = [];
  for (
    let i = currentPagesBeginning, lim = i + portionSize;
    i < lim;
    i++
  ) {
    currentPages[i] = mappedPages[i];
  }

  const moveToExtreme = (pagesBeginning, page, symbol) => (
    <span
      onClick={() => {
        setCurrentPages(pagesBeginning);
        changePage(page);
      }}
    >
      {symbol}
    </span>
  );

  const firstPage = moveToExtreme(1, 1, '<< ');
  const lastPage = moveToExtreme(
    pagesNb - portionSize + 1,
    pagesNb,
    ' >>',
  );

  const moveOnePage = (i, symbol) => (
    <span onClick={() => changeOnClick(i)}>{symbol}</span>
  );

  const moveLeft = moveOnePage(page - 1, '< ');

  const moveRight = moveOnePage(page + 1, ' >');

  return (
    <span className={s.pages}>
      <div align="center">
        {page !== 1 && firstPage}
        {page !== 1 && moveLeft}
        {currentPages}
        {page !== pagesNb && moveRight}
        {page !== pagesNb && lastPage}
      </div>
    </span>
  );
};

export default Paginator;
