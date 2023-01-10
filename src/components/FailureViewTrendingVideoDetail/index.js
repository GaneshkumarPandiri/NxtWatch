import Context from '../../Context'
import './index.css'

const FailureViewTrendingVideoDetail = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const {onRetryTrendingVideos} = props
      const theme = isDarkMode ? 'dark' : 'light'
      const onRetry = () => {
        onRetryTrendingVideos()
      }
      return (
        <div className={`${theme} failure-view-container`}>
          {isDarkMode ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              alt="failure view"
              className="failure-image"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-image"
            />
          )}
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" className="retry-button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )
    }}
  </Context.Consumer>
)

export default FailureViewTrendingVideoDetail
