import Header from '../Header'
import Sidebar from '../Sidebar'

import Context from '../../Context'

const NotFound = () => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'

      return (
        <>
          <Header />
          <div className={`${theme} home-container`}>
            <Sidebar />
            <div className={`${theme} not-found-page`}>
              {isDarkMode ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                  alt="not found"
                  className="not-found"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                  alt="not found"
                  className="not-found"
                />
              )}
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </>
      )
    }}
  </Context.Consumer>
)

export default NotFound
