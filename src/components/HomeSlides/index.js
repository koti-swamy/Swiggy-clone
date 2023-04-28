import {Component} from 'react'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import 'reactjs-popup/dist/index.css'

import './index.css'

class HomeSlides extends Component {
  getSuccessView = () => {
    const {slidesList} = this.props

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'slide-container',
    }

    return (
      <div>
        <Slider {...settings}>
          {slidesList.map(eachItem => (
            <SlideItem slideItem={eachItem} key={eachItem.id} />
          ))}
        </Slider>
      </div>
    )
  }

  getLoadingView = () => (
    <div
      className="restaurants-offers-loader"
      testid="restaurants-offers-loader"
    >
      <Loader color="#f7931e" type="TailSpin" width={50} height={50} />
    </div>
  )

  getFailureView = () => {
    const {getSlidesData} = this.props
    return (
      <div className="failure-slide-card">
        <button
          type="button"
          className="failure-slide-btn"
          onClick={getSlidesData}
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {slidesStatus} = this.props

    let ui

    switch (slidesStatus) {
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

const SlideItem = props => {
  const {slideItem} = props

  const {imageUrl} = slideItem

  return (
    <div>
      <img src={imageUrl} alt="offer" className="offer-img" />
    </div>
  )
}

export default HomeSlides
