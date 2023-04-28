import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {restaurantItem} = props
  const {imageUrl, id, name, cuisine, rating, totalReviews} = restaurantItem

  return (
    <li testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-link-style">
        <div>
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-item-img"
          />
        </div>
        <div className="restaurant-item-desc-card">
          <h1 className="restaurant-item-name">{name}</h1>
          <p className="restaurant-item-cuisine">{cuisine}</p>
          <div className="rating-card">
            <AiFillStar size={12} color="#FFCC00" />
            <p className="restaurant-item-rating">{rating}</p>
            <h1 className="restaurant-item-reviews">
              ({totalReviews} ratings)
            </h1>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
