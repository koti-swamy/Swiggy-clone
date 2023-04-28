import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="img-container">
      <img
        src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682445816/Vectorwhite_hat_bntsxm.png"
        alt="website-footer-logo"
        className="website-footer-logo"
      />
      <h1 className="footer-tasty-head">Tasty Kitchens</h1>
    </div>
    <div>
      <p>The only thing we are serious about is food. Contact us on</p>
    </div>
    <div>
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="footer-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="footer-icon" />
      <FaTwitter testid="twitter-social-icon" className="footer-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="footer-icon" />
    </div>
  </div>
)

export default Footer
