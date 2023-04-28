import {Component} from 'react'

import TastyKitchenContext from '../../TastyKitchenContext/index'

import './index.css'

class FoodItemCounter extends Component {
  state = {quantity: 1}

  render() {
    const {quantity} = this.state
    const {onMinus, id, imageUrl} = this.props
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {onMinus1, onPlus1, cartList} = value
          console.log(cartList)

          const onMinusCounter = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
          }

          const onPlusCounter = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
          }

          return (
            <div className="quantity-container">
              <button
                type="button"
                testid="decrement-count"
                className="quantity-btn-style"
                onClick={() => {
                  onMinusCounter()
                  onMinus(quantity)
                  onMinus1(quantity, id, imageUrl)
                }}
              >
                -
              </button>
              <p testid="active-count" className="quantity-counter">
                {quantity}
              </p>
              <button
                testid="increment-count"
                type="button"
                className="quantity-btn-style"
                onClick={() => {
                  onPlusCounter()
                  onPlus1(quantity, id, imageUrl)
                }}
              >
                +
              </button>
            </div>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default FoodItemCounter
