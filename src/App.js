import {Switch, Route} from 'react-router-dom'

import {Component} from 'react'

import TastyKitchenContext from './TastyKitchenContext/index'

import Login from './components/Login/index'

import ProtectedRoute from './components/ProtectedRoute/index'

import Home from './components/Home/Index'

import RestaurantDetail from './components/RestaurantDetail/index'

import Cart from './components/Cart/index'

import NotFound from './components/NotFound/index'

import './App.css'

class App extends Component {
  state = {cartList: []}

  componentDidMount() {
    this.getLocalStorage()
  }

  getLocalStorage = () => {
    const getLocalStorage = localStorage.getItem('cartData')
    if (getLocalStorage !== null) {
      const parseLocalStorage = JSON.parse(getLocalStorage)
      this.setState({cartList: parseLocalStorage})
    }
  }

  onPlaceOrderBtn = () => {
    this.setState({cartList: []})
  }

  onAdd1 = (id, imageUrl, cost, name) => {
    const {cartList} = this.state

    const getLocalStorage = localStorage.getItem('cartData')

    const boolean = cartList.some(eachItem => eachItem.id === id)

    if (getLocalStorage !== null) {
      const parseLocalStorage = JSON.parse(getLocalStorage)
      const localBoolean = parseLocalStorage.some(
        eachItem => eachItem.id === id,
      )
      if (localBoolean === true) {
        this.setState(
          {
            cartList: parseLocalStorage.map(eachItem => {
              if (eachItem.id === id) {
                return {...eachItem, quantity: eachItem.quantity + 1}
              }
              return eachItem
            }),
          },
          this.setToLocalStorage,
        )
      } else {
        this.setState(
          {
            cartList: [
              ...parseLocalStorage,
              {id, imageUrl, cost, name, quantity: 1},
            ],
          },
          this.setToLocalStorage,
        )
      }
    } else if (boolean === true) {
      this.setState(
        prevState => ({
          cartList: prevState.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity: eachItem.quantity + 1}
            }
            return eachItem
          }),
        }),
        this.setToLocalStorage,
      )
    } else {
      this.setState(
        prevState => ({
          cartList: [
            ...prevState.cartList,
            {id, imageUrl, cost, name, quantity: 1},
          ],
        }),
        this.setToLocalStorage,
      )
    }
  }

  onMinus1 = (quantity, id) => {
    const {cartList} = this.state
    const boolean = cartList.some(eachItem => eachItem.id === id)
    const getLocalStorage = localStorage.getItem('cartData')
    if (getLocalStorage !== null) {
      const parseLocalStorage = JSON.parse(getLocalStorage)
      const localBoolean = parseLocalStorage.some(
        eachItem => eachItem.id === id,
      )

      const checkQuantity = parseLocalStorage.every(
        eachItem => eachItem.quantity > 1,
      )

      if (checkQuantity === true) {
        if (localBoolean === true) {
          this.setState(
            {
              cartList: parseLocalStorage.map(eachItem => {
                if (eachItem.id === id) {
                  return {...eachItem, quantity: eachItem.quantity - 1}
                }
                return eachItem
              }),
            },
            this.setToLocalStorage,
          )
        }
      } else {
        this.setState(
          {
            cartList: parseLocalStorage.filter(
              eachItem => eachItem.quantity !== 1,
            ),
          },
          this.setToLocalStorage,
        )
      }
    } else if (boolean === true) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity: eachItem.quantity - 1}
            }
            return eachItem
          }),
        }),
        this.setToLocalStorage,
      )
    }
  }

  onPlus1 = (quantity, id) => {
    const {cartList} = this.state
    const boolean = cartList.some(eachItem => eachItem.id === id)

    if (boolean === true) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity: eachItem.quantity + 1}
            }
            return eachItem
          }),
        }),
        this.setToLocalStorage,
      )
    }
  }

  onCartMinus = id => {
    const getLocalStorage = localStorage.getItem('cartData')
    const parseLocalStorage = JSON.parse(getLocalStorage)
    const checkQuantity = parseLocalStorage.every(
      eachItem => eachItem.quantity > 1,
    )

    if (checkQuantity === true) {
      this.setState(
        {
          cartList: parseLocalStorage.map(eachItem => {
            if (eachItem.id === id) {
              return {...eachItem, quantity: eachItem.quantity - 1}
            }
            return eachItem
          }),
        },
        this.setToLocalStorage,
      )
    } else {
      this.setState(
        {
          cartList: parseLocalStorage.filter(eachItem => eachItem.id !== id),
        },
        this.setToLocalStorage,
      )
    }
  }

  onCartPlus = id => {
    const getLocalStorage = localStorage.getItem('cartData')
    const parseLocalStorage = JSON.parse(getLocalStorage)
    this.setState(
      {
        cartList: parseLocalStorage.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity + 1}
          }
          return eachItem
        }),
      },
      this.setToLocalStorage,
    )
  }

  setToLocalStorage = () => {
    const {cartList} = this.state

    const stingifiedData = JSON.stringify(cartList)

    localStorage.setItem('cartData', stingifiedData)
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <TastyKitchenContext.Provider
        value={{
          onMinus1: this.onMinus1,
          onPlus1: this.onPlus1,
          onAdd1: this.onAdd1,
          cartList,
          onCartMinus: this.onCartMinus,
          onCartPlus: this.onCartPlus,
          onPlaceOrderBtn: this.onPlaceOrderBtn,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetail}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </TastyKitchenContext.Provider>
    )
  }
}

export default App
