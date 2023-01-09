import Context from '../../Context'
import './index.css'

const SearchResultsNotFound = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'
      const {onRetryVideos} = props
      const onRetry = () => {
        onRetryVideos()
      }
      return (
        <div className={`${theme} failure-view-container`}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="failure-image"
          />

          <h1>No Search results found</h1>
          <p>Try different keywords or remove search filter</p>
          <button type="button" className="retry-button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )
    }}
  </Context.Consumer>
)

export default SearchResultsNotFound
