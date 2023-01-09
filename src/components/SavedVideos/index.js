import {Component} from 'react'

import {FaHotjar} from 'react-icons/fa'

import TrendingItem from '../TrendingItem'

import Context from '../../Context'
import Sidebar from '../Sidebar'

import Header from '../Header'

import './index.css'

class Gaming extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDarkMode, savedVideosDetails} = value
          const theme = isDarkMode ? 'dark' : 'light'
          return (
            <>
              <Header />
              <div className="home-container">
                <Sidebar />
                <div
                  className={`${theme} main-saved-video-container`}
                  data-testid="savedVideos"
                >
                  {savedVideosDetails.length <= 0 ? (
                    <div className="saved-video-container">
                      <div className="banner-saved-video">
                        <FaHotjar className="icon-trending" />
                        <h1>Saved Videos</h1>
                      </div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        className="saved-video-image"
                      />
                      <h1>No saved videos found</h1>
                      <p>You can save your videos while watching them</p>
                    </div>
                  ) : (
                    <div className="saved-video-heading-content">
                      <div className="banner-saved-video">
                        <FaHotjar className="icon-trending" />
                        <h1>Saved Videos</h1>
                      </div>
                      <ul className="videos-container">
                        {savedVideosDetails.map(item => (
                          <TrendingItem videoItem={item} key={item.id} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Gaming
