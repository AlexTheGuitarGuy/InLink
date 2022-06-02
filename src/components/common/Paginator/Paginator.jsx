import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({
  totalElems,
  portionSize,
  pageSize,
  changePage,
  page,
}) => {
  const pagesNb = Math.ceil(totalElems / pageSize);
  const halfwayPoint = page - Math.floor(portionSize / 2);

  const calcPagesBeginning = () => {
    if (halfwayPoint > 1) {
      if (halfwayPoint > pagesNb - portionSize)
        return pagesNb - portionSize + 1;
      return halfwayPoint;
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
    <div className={s.pages}>
        {page !== 1 && firstPage}
        {page !== 1 && moveLeft}
        {currentPages}
        {page !== pagesNb && moveRight}
        {page !== pagesNb && lastPage}
    </div>
  );
};

export default Paginator;
