import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillCloseCircle} from 'react-icons/ai'

import {GiHamburgerMenu} from 'react-icons/gi'

import Popup from 'reactjs-popup'

import './index.css'

class Header extends Component {
  state = {isHam: true}

  onHamBtn = () => {
    this.setState({isHam: false})
  }

  onCLose = () => {
    this.setState({isHam: true})
  }

  onLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isHome, isCart} = this.props

    const {isHam} = this.state

    const homeStyle = isHome ? 'nav-menu1' : 'nav-menu'

    const cartStyle = isCart ? 'nav-menu1' : 'nav-menu'

    return (
      <>
        <div className="header-bg">
          <div className="head-img-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682334208/Vectorlogin_hat_1_wiyoyz.png"
                alt="website logo"
                className="website logo"
              />
            </Link>
            <h1 className="nav-tasty-head">Tasty Kitchens</h1>
          </div>
          <ul type="none" className="nav-right-medium-dev">
            <li>
              <Link className={homeStyle} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={cartStyle} to="/cart">
                Cart
              </Link>
            </li>

            <li>
              <button
                onClick={this.onLogoutBtn}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="ham-card">
            <button type="button" onClick={this.onHamBtn} className="ham-btn">
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        {!isHam && (
          <div className="small-head-bg">
            <ul type="none" className="nav-small-dev">
              <li>
                <Link className={homeStyle} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={cartStyle} to="/cart">
                  Cart
                </Link>
              </li>

              <li>
                <button
                  onClick={this.onLogoutBtn}
                  className="logout-btn"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
            <div>
              <button
                type="button"
                className="close-btn"
                onClick={this.onCLose}
              >
                <AiFillCloseCircle />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
