import React, { FC, useState } from 'react'
import cn from 'classnames'

type PaginatorProps = {
  totalElems: number
  portionSize: number
  pageSize: number
  changePage: (page: number) => void
  page: number
}

const Paginator: FC<PaginatorProps> = ({ totalElems, portionSize, pageSize, changePage, page }) => {
  const pagesNb = Math.ceil(totalElems / pageSize)
  const halfwayPoint = page - Math.floor(portionSize / 2)

  const calcPagesBeginning = () => {
    if (halfwayPoint > 1) {
      if (halfwayPoint > pagesNb - portionSize) return pagesNb - portionSize + 1
      return halfwayPoint
    }

    return 1
  }

  const [currentPagesBeginning, setCurrentPages] = useState(calcPagesBeginning())

  const changeOnClick = (page: number) => {
    const portionBeginning = page - Math.floor(portionSize / 2)
    const portion = portionBeginning > 1 ? portionBeginning : 1
    setCurrentPages(portion)
    changePage(page)
  }

  let mappedPages = []
  for (let i = 1; i <= pagesNb; i++) {
    mappedPages[i] = (
      <span
        key={i}
        onClick={() => changeOnClick(i)}
        className={cn(
          `mx-1 cursor-pointer transition-colors 
          p-0.5
          border-b-2`,
          {
            'border-onPrimaryBg': i === page,
            'border-transparent hover:border-onPrimaryBg': !(i === page),
          },
        )}
      >
        {`${i} `}
      </span>
    )
  }

  let currentPages = []
  for (let i = currentPagesBeginning, lim = i + portionSize; i < lim; i++) {
    currentPages[i] = mappedPages[i]
  }

  const moveToExtreme = (pagesBeginning: number, page: number, symbol: string) => (
    <span
      onClick={() => {
        setCurrentPages(pagesBeginning)
        changePage(page)
      }}
      className='mx-1 cursor-pointer transition-colors
          border-b-2 border-transparent hover:border-onPrimaryBg p-0.5'
    >
      {symbol}
    </span>
  )

  const firstPage = moveToExtreme(1, 1, '<< ')
  const lastPage = moveToExtreme(pagesNb - portionSize + 1, pagesNb, ' >>')

  const moveOnePage = (page: number, symbol: string) => (
    <span
      onClick={() => changeOnClick(page)}
      className='mx-1 cursor-pointer transition-colors
          border-b-2 border-transparent hover:border-onPrimaryBg p-0.5'
    >
      {symbol}
    </span>
  )

  const moveLeft = moveOnePage(page - 1, '< ')

  const moveRight = moveOnePage(page + 1, ' >')

  return (
    <div
      className='flex justify-center
    font-semibold text-xl
    mb-4'
    >
      {page !== 1 && firstPage}
      {page !== 1 && moveLeft}
      {currentPages}
      {page !== pagesNb && moveRight}
      {page !== pagesNb && lastPage}
    </div>
  )
}

export default Paginator
