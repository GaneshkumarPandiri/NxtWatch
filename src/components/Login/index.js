import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LoginButton} from '../../styledComponents'
import Context from '../../Context/index'
import './index.css'

class Login extends Component {
  state = {isLoginFail: false, errorMessage: '', username: '', password: ''}

  onLoginAccount = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginAPIUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginAPIUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
    this.setState({username: '', password: ''})
  }

  onLoginFailure = errorMessage => {
    this.setState({isLoginFail: true, errorMessage, username: '', password: ''})
  }

  onUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isLoginFail, errorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <Context.Consumer>
        {value => {
          const {isDarkMode, showPassword, onShowPassword} = value
          const theme = isDarkMode ? 'dark' : 'light'
          const passwordType = showPassword ? 'text' : 'password'
          const onPassword = () => {
            onShowPassword()
          }
          return (
            <div className={`${theme} login-container`}>
              <form
                className={`${theme} form-control`}
                onSubmit={this.onLoginAccount}
              >
                {isDarkMode ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="logo-login"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="logo-login"
                  />
                )}

                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="input-type"
                  placeholder="Username"
                  id="username"
                  onChange={this.onUsernameInput}
                  value={username}
                />
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  type={passwordType}
                  className="input-type"
                  placeholder="Password"
                  id="password"
                  onChange={this.onPasswordInput}
                  value={password}
                />
                <div>
                  <input type="checkbox" onChange={onPassword} id="check" />
                  <label htmlFor="check">Show Password</label>
                </div>
                <LoginButton type="submit" className="login-button">
                  Login
                </LoginButton>
                {isLoginFail && <p className="error">{errorMessage}</p>}
              </form>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Login
