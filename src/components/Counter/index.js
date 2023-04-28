import {GoChevronLeft, GoChevronRight} from 'react-icons/go'

import './index.css'

const Counter = props => {
  const {pages, activePage, onLeftBtn, onRightBtn} = props

  return (
    <div className="counter-bg-container">
      <button
        className="arrow-btn-style"
        type="button"
        testid="pagination-left-button"
        onClick={onLeftBtn}
      >
        <GoChevronLeft />
      </button>
      <p className="counter-para">
        <span testid="active-page-number">{activePage}</span> of {pages}.
      </p>
      <button
        className="arrow-btn-style"
        type="button"
        testid="pagination-right-button"
        onClick={onRightBtn}
      >
        <GoChevronRight />
      </button>
    </div>
  )
}

export default Counter
