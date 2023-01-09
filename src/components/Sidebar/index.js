import {Link} from 'react-router-dom'

import Context from '../../Context'

import './index.css'

const tabsList = [
  {id: 'HOME', displayText: 'Home', link: '/'},
  {id: 'TRENDING', displayText: 'Trending', link: '/trending'},
  {id: 'GAMING', displayText: 'Gaming', link: '/gaming'},
  {id: 'SAVED_VIDEOS', displayText: 'Saved videos', link: '/saved-videos'},
]

const Sidebar = () => (
  <Context.Consumer>
    {value => {
      const {isDarkMode, activeTab, onChangeActiveTab} = value
      const onTabSelect = event => {
        onChangeActiveTab(event.target.value)
      }

      const theme = isDarkMode ? 'dark' : 'light'
      /*
      const home = activeTab === 'HOME' && 'active-tab'
      const gaming = activeTab === 'GAMING' && 'active-tab'
      const trending = activeTab === 'TRENDING' && 'active-tab'
      const saved = activeTab === 'SAVED_VIDEOS' && 'active-tab'
      */
      return (
        <div className={`${theme} sidebar-container`}>
          <ul>
            {tabsList.map(item => (
              <Link
                to={item.link}
                key={item.id}
                className={`${theme} link-item`}
              >
                <li>
                  <button
                    type="button"
                    className={`${theme} tabs`}
                    onClick={onTabSelect}
                    value={item.id}
                  >
                    {item.displayText}
                  </button>
                </li>
              </Link>
            ))}
          </ul>
          <div className="contact-container">
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="icon-contact"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="icon-contact"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo logo"
                className="icon-contact"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default Sidebar
