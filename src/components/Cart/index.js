import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'

import TastyKitchenContext from '../../TastyKitchenContext/index'

import Header from '../Header/index'

import Footer from '../Footer/index'

import OrderedSuccessFull from '../OrderedSuccessFull/index'

import CartNoProductView from '../CartNoProductView/index'

import './index.css'

class Cart extends Component {
  state = {isOrdered: false}

  onPlaceOrder = () => {
    this.setState({isOrdered: true})
    localStorage.clear()
  }

  render() {
    const {isOrdered} = this.state

    const ui = isOrdered ? (
      <OrderedSuccessFull />
    ) : (
      <TastyKitchenContext.Consumer>
        {value => {
          const {cartList, onPlaceOrderBtn} = value
          let totalPrice
          console.log(cartList)

          if (cartList !== null && cartList.length !== 0) {
            const totalPriceList = cartList.map(
              eachItem => eachItem.quantity * eachItem.cost,
            )

            totalPrice = totalPriceList.reduce(
              (arr, currentVal) => arr + currentVal,
            )
            console.log(totalPrice)
          }

          const subUi =
            cartList !== null && cartList.length !== 0 ? (
              <>
                <div className="cart-bg-container">
                  <div className="cart-head-card">
                    <p className="cart-head-para1">Items</p>
                    <p className="cart-head-para2">Quantity</p>
                    <p className="cart-head-para3">Price</p>
                  </div>
                  <ul type="none" className="cart-ul-container">
                    {cartList.map(eachItem => (
                      <CartItem cartItem={eachItem} key={eachItem.id} />
                    ))}
                  </ul>
                  <hr className="cart-hr-style" />
                  <div className="cart-bottom-part">
                    <h1 className="cart-order-style">Order Total:</h1>
                    <div className="total-price-card">
                      <div className="total-rupees">
                        <BiRupee />
                        <p testid="total-price">{totalPrice}.00</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            this.onPlaceOrder()
                            onPlaceOrderBtn()
                          }}
                          className="place-order-btn"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <CartNoProductView />
            )

          return (
            <>
              <Header isCart />
              {subUi}
            </>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
    return ui
  }
}

const CartItem = props => {
  const {cartItem} = props
  const {id, name, cost, quantity, imageUrl} = cartItem

  return (
    <TastyKitchenContext.Consumer>
      {value => {
        const {onCartPlus, onCartMinus} = value
        return (
          <li testid="cartItem" className="cart-list-card">
            <div className="image-card">
              <img src={imageUrl} alt={name} className="cart-item-img" />
              <h1 className="cart-img-name">{name}</h1>
            </div>
            <div className="cart-counter-card">
              <button
                className="cart-btn-style"
                type="button"
                testid="decrement-quantity"
                onClick={() => {
                  onCartMinus(id)
                }}
              >
                -
              </button>
              <p className="quantity-style-cart" testid="item-quantity">
                {quantity}
              </p>
              <button
                type="button"
                className="cart-btn-style"
                testid="increment-quantity"
                onClick={() => {
                  onCartPlus(id)
                }}
              >
                +
              </button>
            </div>
            <div className="price-cart-item-card">
              <BiRupee />
              <p>{quantity * cost}.00</p>
            </div>
            <div className="cart-style-medium">
              <div>
                <p className="cart-img-name1">{name}</p>
              </div>
            </div>
          </li>
        )
      }}
    </TastyKitchenContext.Consumer>
  )
}

export default Cart
