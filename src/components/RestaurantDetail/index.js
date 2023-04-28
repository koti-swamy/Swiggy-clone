import {Component} from 'react'

import Cookies from 'js-cookie'

import RestaurantDetailItem from '../RestaurantDetailItem/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class RestaurantDetail extends Component {
  state = {
    foodItemsList: [],
    restaurantDetails: {},
    restaurantDetailStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState({restaurantDetailStatus: apiStatusConstants.loading})
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props

    const {params} = match

    const {id} = params

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const convertedRestaurantDetails = this.convertRestaurantDetailsSnakeToPascal(
        fetchedData,
      )

      const convertFoodList = fetchedData.food_items.map(eachItem =>
        this.convertFoodListSnakeToPascal(eachItem),
      )
      this.setState({
        foodItemsList: convertFoodList,
        restaurantDetails: convertedRestaurantDetails,
        restaurantDetailStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({restaurantDetailStatus: apiStatusConstants.failure})
    }
  }

  convertRestaurantDetailsSnakeToPascal = data => ({
    rating: data.rating,
    id: data.id,
    name: data.name,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    reviewsCount: data.reviews_count,
    opensAt: data.opens_at,
    location: data.location,
    itemsCount: data.items_count,
  })

  convertFoodListSnakeToPascal = data => ({
    name: data.name,
    cost: data.cost,
    foodType: data.food_type,
    imageUrl: data.image_url,
    id: data.id,
    rating: data.rating,
  })

  render() {
    const {
      restaurantDetailStatus,
      restaurantDetails,
      foodItemsList,
    } = this.state
    return (
      <RestaurantDetailItem
        restaurantDetails={restaurantDetails}
        foodItemsList={foodItemsList}
        restaurantDetailStatus={restaurantDetailStatus}
        getRestaurantDetails={this.getRestaurantDetails}
      />
    )
  }
}

export default RestaurantDetail
