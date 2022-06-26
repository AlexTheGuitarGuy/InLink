import React, { useState } from 'react';
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
        className={cn(
          `mx-1 cursor-pointer transition-colors 
          hover:text-gray-600 active:text-gray-500
          border-b-2`,
          { 'border-gray-600': i === page },
          {
            'border-transparent hover:border-gray-600': !(i === page),
          },
        )}
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
      className="mx-1 cursor-pointer transition-colors
          hover:text-gray-600 active:text-gray-500
          border-b-2 border-transparent hover:border-gray-600"
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
    <span
      onClick={() => changeOnClick(i)}
      className="mx-1 cursor-pointer transition-colors
          hover:text-gray-600 active:text-gray-500
          border-b-2 border-transparent hover:border-gray-600"
    >
      {symbol}
    </span>
  );

  const moveLeft = moveOnePage(page - 1, '< ');

  const moveRight = moveOnePage(page + 1, ' >');

  return (
    <div
      className="flex justify-center
    font-semibold text-xl
    mb-4"
    >
      {page !== 1 && firstPage}
      {page !== 1 && moveLeft}
      {currentPages}
      {page !== pagesNb && moveRight}
      {page !== pagesNb && lastPage}
    </div>
  );
};

export default Paginator;
