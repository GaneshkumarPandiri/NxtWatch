import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {WiDaySunny} from 'react-icons/wi'

import {GiNightSky} from 'react-icons/gi'

import Popup from 'reactjs-popup'

import Context from '../../Context'

import './index.css'

const Header = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode, onDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'
      const onChangeMode = () => {
        onDarkMode()
      }

      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <nav className={`${theme} nav-container`}>
          <div>
            {isDarkMode ? (
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                  className="logo-home"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="logo-home"
                />
              </Link>
            )}
          </div>
          <div className="nav-items-container">
            <button type="button" onClick={onChangeMode} data-testid="theme">
              {isDarkMode ? (
                <GiNightSky className="mode-icon" />
              ) : (
                <WiDaySunny className="mode-icon" />
              )}
            </button>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />

            <Popup modal trigger={<button type="button">Logout</button>}>
              {close => (
                <div className="popup-container">
                  <div>
                    <p>Are you sure, you want to logout?</p>
                  </div>
                  <hr />
                  <div className="popup-button-group">
                    <button
                      type="button"
                      className="close-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={onLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default withRouter(Header)
