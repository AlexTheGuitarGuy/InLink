import { fireEvent, render, screen } from '../../../test-utils'
import Paginator from './Paginator'

const totalElems = 1000
const portionSize = 5
const pageSize = 10
const changePageMock = jest.fn()
const page = 10

describe('Paginator component', () => {
  it('should render the correct number of pages', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const pageButtons = screen.getAllByRole('button')

    expect(pageButtons.length).toBe(portionSize + 4) // "+ 4" for the "<", ">", "<<" and ">>" buttons
  })

  it('should call the "changePage" function when a page button is clicked', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const pageButton = screen.getByText('8')
    fireEvent.click(pageButton)

    expect(changePageMock).toHaveBeenCalledWith(8)
  })

  it('should move one page to the left when the "<" button is clicked', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const moveLeftButton = screen.getByText('<')
    fireEvent.click(moveLeftButton)

    expect(changePageMock).toHaveBeenCalledWith(page - 1)
  })

  it('should move one page to the right when the ">" button is clicked', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const moveRightButton = screen.getByText('>')
    fireEvent.click(moveRightButton)

    expect(changePageMock).toHaveBeenCalledWith(page + 1)
  })

  it('should move to the beginning of the pagination when the "<<" button is clicked', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const moveToBeginningButton = screen.getByText('<<')
    fireEvent.click(moveToBeginningButton)

    expect(changePageMock).toHaveBeenCalledWith(1)
  })

  it('should move to the end of the pagination when the ">>" button is clicked', () => {
    render(
      <Paginator
        totalElems={totalElems}
        portionSize={portionSize}
        pageSize={pageSize}
        changePage={changePageMock}
        page={page}
      />,
    )

    const moveToEndButton = screen.getByText('>>')
    fireEvent.click(moveToEndButton)

    expect(changePageMock).toHaveBeenCalledWith(Math.ceil(totalElems / pageSize))
  })
})
