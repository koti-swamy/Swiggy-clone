import {Component} from 'react'

import Cookies from 'js-cookie'

import TastyKitchenContext from '../../TastyKitchenContext/index'

import Header from '../Header'

import Footer from '../Footer/index'

import HomeSlides from '../HomeSlides/index'

import HomRestaurantList from '../HomeRestaurantList/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    slidesStatus: apiStatusConstants.initial,
    slidesList: [],
  }

  componentDidMount() {
    this.setState({
      slidesStatus: apiStatusConstants.loading,
    })
    this.getSlidesData()
  }

  getSlidesData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const convertedData = fetchedData.offers.map(eachItem =>
        this.convertSnakeToPascalSlide(eachItem),
      )
      this.setState({
        slidesList: convertedData,
        slidesStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({slidesStatus: apiStatusConstants.failure})
    }
  }

  convertSnakeToPascalSlide = data => ({
    id: data.id,
    imageUrl: data.image_url,
  })

  render() {
    const {slidesStatus, slidesList} = this.state

    return (
      <TastyKitchenContext.Consumer>
        {value => (
          <>
            <Header isHome />
            <div className="home-bg-container">
              <HomeSlides
                slidesList={slidesList}
                slidesStatus={slidesStatus}
                getSlidesData={this.getSlidesData}
              />
              <HomRestaurantList />
            </div>
            <Footer />
          </>
        )}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default Home
