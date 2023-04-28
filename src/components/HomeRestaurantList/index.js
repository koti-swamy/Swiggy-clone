import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import {BsFilterLeft} from 'react-icons/bs'

import RestaurantItem from '../RestaurantItem/index'

import Counter from '../Counter/index'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class HomRestaurantList extends Component {
  state = {
    restaurantStatus: apiStatusConstants.initial,
    restaurantList: [],
    pages: 0,
    activePage: 1,
    searchText: '',
    sortBy: 'Lowest',
    searchBtnTxt: '',
  }

  componentDidMount() {
    this.setState({
      restaurantStatus: apiStatusConstants.loading,
    })
    this.getActivePageRestaurantData()
    this.getTotalPagesRestaurantData()
  }

  onLeftBtn = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1, searchBtnTxt: ''}),
        this.getActivePageRestaurantData,
      )
    }
  }

  onRightBtn = () => {
    const {activePage, pages} = this.state
    if (activePage < pages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1, searchBtnTxt: ''}),
        this.getActivePageRestaurantData,
      )
    }
  }

  getActivePageRestaurantData = async () => {
    const {activePage, searchBtnTxt, sortBy} = this.state
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchBtnTxt}&offset=${offset}&limit=9&sort_by_rating=${sortBy}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const convertedData = fetchedData.restaurants.map(eachItem =>
        this.convertSnakeToPascalRestaurant(eachItem),
      )

      this.setState({
        restaurantList: convertedData,
        restaurantStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({restaurantStatus: apiStatusConstants.failure})
    }
  }

  getTotalPagesRestaurantData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      this.setState({
        pages: Math.ceil(fetchedData.total / 9),
      })
    }
  }

  convertSnakeToPascalRestaurant = data => ({
    hasOnlineDelivery: data.has_online_delivery,

    ratingText: data.user_rating.rating_text,
    ratingColor: data.user_rating.rating_color,
    totalReviews: data.user_rating.total_reviews,
    rating: data.user_rating.rating,
    name: data.name,
    hasTableBooking: data.has_table_booking,
    isDeliveringNow: data.is_delivering_now,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    id: data.id,
    menuType: data.menu_type,
    location: data.location,
  })

  getSuccessView = () => {
    const {restaurantList, sortBy, searchText, pages, activePage} = this.state

    return (
      <div className="home-bottom-container">
        <div className="home-search-container">
          <div className="home-head-card">
            <h1 className="home-head-style">Popular Restaurants</h1>
            <p className="home-para-style">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="search-sort-container">
            <div className="searchCard">
              <input
                type="search"
                placeholder="search"
                className="search-input-style"
                value={searchText}
                onChange={this.onSearchInput}
              />
              <button
                type="button"
                className="search-btn-style"
                onClick={this.onSearchBtn}
              >
                <AiOutlineSearch />
              </button>
            </div>
            <div className="sortCard">
              <BsFilterLeft />
              <p className="sort-para">Sort By</p>
              <select
                className="select-style"
                onChange={this.onSelect}
                value={sortBy}
              >
                {sortByOptions.map(eachItem => (
                  <OptionItem optionItem={eachItem} key={eachItem.id} />
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr style={{borderColor: '#CBD2D9'}} />
        {restaurantList.length === 0 ? (
          <div className="no-restaurants-card">
            <img
              src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682507322/restaurant-shop-store_18591-28627_psfl7j.avif"
              alt="no restaurant"
              className="no-restaurant-img"
            />
            <h1 className="no-restaurant-head">No Restaurants Found</h1>
            <p className="no-restaurant-para">
              We could not find any restaurants. Try other filters.
            </p>
          </div>
        ) : (
          <ul type="none" className="restaurant-list">
            {restaurantList.map(eachItem => (
              <RestaurantItem restaurantItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}

        <Counter
          pages={pages}
          activePage={activePage}
          onLeftBtn={this.onLeftBtn}
          onRightBtn={this.onRightBtn}
        />
      </div>
    )
  }

  getLoadingView = () => (
    <div
      className="restaurants-offers-loader1"
      testid="restaurants-list-loader"
    >
      <Loader color="#f7931e" type="TailSpin" width={50} height={50} />
    </div>
  )

  getFailureView = () => (
    <div className="restaurant-failure-container">
      <img
        src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682507672/hand-drawing-404-error-page-vector-illustration-doodle-character-style-landing-web-page_73637-718_sgg9dj.avif"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Oops! Something Went Wrong </h1>
      <p className="failure-para">
        We Cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getActivePageRestaurantData}
        className="failure-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  onSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onSearchBtn = () => {
    const {searchText} = this.state
    this.setState({searchBtnTxt: searchText}, this.getActivePageRestaurantData)
  }

  onSelect = event => {
    this.setState(
      {sortBy: event.target.value},
      this.getActivePageRestaurantData,
    )
  }

  render() {
    const {restaurantStatus} = this.state

    let ui
    switch (restaurantStatus) {
      case 'LOADING':
        ui = this.getLoadingView()
        break
      case 'SUCCESS':
        ui = this.getSuccessView()
        break
      case 'FAILURE':
        ui = this.getFailureView()
        break
      default:
        return null
    }
    return ui
  }
}

const OptionItem = props => {
  const {optionItem} = props
  const {displayText, value} = optionItem
  return <option value={value}>{displayText}</option>
}

export default HomRestaurantList
