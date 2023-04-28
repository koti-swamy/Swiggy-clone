import {Link} from 'react-router-dom'

import {TiTick} from 'react-icons/ti'

import Header from '../Header/index'

import './index.css'

const OrderedSuccessFull = () => (
  <>
    <Header />
    <div className="successFullBg">
      <p className="tick-style">
        <TiTick />
      </p>
      <h1 className="payment-status">Payment Successful</h1>
      <p className="payment-desc">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" className="link-home">
        <button className="link-home-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)

export default OrderedSuccessFull
