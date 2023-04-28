import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfound-bg-container">
    <img
      src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682706324/erroring_1notfound_hlkjnb.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="head-notfound">Page Not Found</h1>
    <p className="head-notfound-para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="link-style2">
      <button type="button" className="home-btn2">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
