import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isCheckbox: false,
    isError: false,
    errorMsg: '',
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onCheckbox = () => {
    this.setState(prevState => ({isCheckbox: !prevState.isCheckbox}))
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.getSuccessView(fetchedData.jwt_token)
    } else {
      this.setState({isError: true, errorMsg: fetchedData.error_msg})
    }
  }

  getSuccessView = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  render() {
    const {username, password, isError, errorMsg, isCheckbox} = this.state

    const passwordType = isCheckbox ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-bg-container">
          <div className="login-card">
            <div className="login-top-card">
              <img
                src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682334208/Vectorlogin_hat_1_wiyoyz.png"
                alt="website logo"
                className="login-website-logo"
              />
              <h1 className="login-top-tasty-head">Tasty Kitchens</h1>
              <h1 className="login-top-head">Login</h1>
            </div>

            <form className="login-bottom-card" onSubmit={this.onLogin}>
              <div className="input-container">
                <label htmlFor="username" className="login-input-label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={this.onUsername}
                  placeholder="Enter Username"
                  value={username}
                  className="login-input-style"
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="login-input-label">
                  PASSWORD
                </label>
                <input
                  type={passwordType}
                  id="password"
                  onChange={this.onPassword}
                  placeholder="Enter Password"
                  value={password}
                  className="login-input-style1"
                />
              </div>
              {isError && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-btn-style">
                Login
              </button>
            </form>
          </div>
          <div className="login-img-container">
            <img
              src="https://res.cloudinary.com/djjtzlcrx/image/upload/v1682330181/Rectangle_1456_1x_udpbb1.png"
              alt="website login"
              className="login-img"
            />
          </div>
        </div>
      </>
    )
  }
}

export default Login
