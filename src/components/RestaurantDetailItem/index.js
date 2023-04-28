import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import TastyKitchenContext from '../../TastyKitchenContext/index'

import Header from '../Header/index'

import Footer from '../Footer/index'

import FoodItemCounter from '../FoodItemCounter/index'

import './index.css'

const RestaurantDetailItem = props => {
  const {restaurantDetails, foodItemsList, restaurantDetailStatus} = props

  const getLoadingView = () => (
    <div
      className="restaurants-offers-loader2"
      testid="restaurant-details-loader"
    >
      <Loader color="#f7931e" type="TailSpin" width={50} height={50} />
    </div>
  )

  const getSuccessView = () => {
    const {
      rating,
      id,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      opensAt,
      location,
      itemsCount,
    } = restaurantDetails

    return (
      <div className="restaurantDetailBg">
        <div className="restaurantDetailCard">
          <div>
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-detail-img"
            />
          </div>
          <div className="restaurantDetailDescCard">
            <h1 className="restaurantDetailName">{name}</h1>
            <p className="restaurant-detail-para">{cuisine}</p>
            <p className="restaurant-detail-para">{location}</p>

            <div className="rating-cost-container">
              <div className="rating-container">
                <div className="rating-cost-top-card">
                  <p>
                    <AiFillStar />
                  </p>
                  <p className="rating-cost-item">{rating}</p>
                </div>
                <div className="rating-cost-bottom-card">
                  <p className="rating-cost-desc">{reviewsCount}+ Ratings</p>
                </div>
              </div>
              <hr style={{borderColor: '#E2E8F0'}} />
              <div className="rating-container">
                <div className="rating-cost-top-card">
                  <p>
                    <BiRupee />
                  </p>
                  <p className="rating-cost-item">{costForTwo}</p>
                </div>
                <div className="rating-cost-bottom-card">
                  <p className="rating-cost-desc">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul type="none" className="restaurant-food-items-container">
          {foodItemsList.map(eachItem => (
            <FoodItem foodItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  const getFailureView = () => {
    const {getRestaurantDetails} = props
    return (
      <div className="restaurant-failure-container1">
        <img
          src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682507672/hand-drawing-404-error-page-vector-illustration-doodle-character-style-landing-web-page_73637-718_sgg9dj.avif"
          alt="failure view"
          className="failure-img1"
        />
        <h1 className="failure-head1">Oops! Something Went Wrong </h1>
        <p className="failure-para1">
          We Cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          onClick={getRestaurantDetails}
          className="failure-retry-btn1"
        >
          Retry
        </button>
      </div>
    )
  }

  let ui

  switch (restaurantDetailStatus) {
    case 'LOADING':
      ui = getLoadingView()
      break
    case 'SUCCESS':
      ui = getSuccessView()
      break
    case 'FAILURE':
      ui = getFailureView()
      break
    default:
      return null
  }

  return (
    <>
      <Header isHome />
      {ui}
      <Footer />
    </>
  )
}

class FoodItem extends Component {
  state = {isAdd: false}

  onAdd = () => {
    this.setState({isAdd: true})
  }

  onMinus = quantity => quantity === 1 && this.setState({isAdd: false})

  render() {
    const {foodItem} = this.props
    const {name, cost, rating, imageUrl, id} = foodItem
    const {isAdd} = this.state
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {onAdd1} = value

          const onAdd3 = () => {
            onAdd1(id, imageUrl, cost, name)
          }

          const onAdd2 = this.onAdd

          return (
            <li className="food-list-container" testid="foodItem">
              <div>
                <img src={imageUrl} alt={name} className="food-item-img" />
              </div>
              <div className="food-item-rating-card">
                <h1 className="food-item-name">{name}</h1>
                <div className="rating-card">
                  <BiRupee className="food-star-icon-style1" />
                  <p className="food-cost-style">{cost}</p>
                </div>
                <div className="rating-card">
                  <AiFillStar className="food-star-icon-style" />
                  <p className="food-cost-style">{rating}</p>
                </div>
                <div>
                  {isAdd ? (
                    <FoodItemCounter
                      imageUrl={imageUrl}
                      id={id}
                      onMinus={this.onMinus}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onAdd2()
                        onAdd3()
                      }}
                      className="add-btn-style"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default RestaurantDetailItem
