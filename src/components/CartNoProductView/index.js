import {Link} from 'react-router-dom'

import './index.css'

const CartNoProductView = () => (
  <div className="no-ordered-view-bg">
    <img
      src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682691657/cooking_1noProduct_xswh3n.png"
      alt="empty cart"
    />
    <h1 className="payment-status1">No Order Yet!</h1>
    <p className="payment-desc1">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="link-home1">
      <button type="button" className="link-home-btn1">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartNoProductView
