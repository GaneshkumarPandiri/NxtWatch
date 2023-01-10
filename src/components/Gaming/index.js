import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaGamepad} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Context from '../../Context'
import Sidebar from '../Sidebar'
import GameVideoItem from '../GameVideoItem'

import FailureViewGamingVideoDetail from '../FailureViewGamingVideoDetail'
import Header from '../Header'

import './index.css'

const gamingVideosListResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    isLoadingVideos: true,
    gamingVideosListResponseStatus: gamingVideosListResponse.initial,
  }

  componentDidMount() {
    this.getGamingVideosList()
  }

  getGamingVideosList = async () => {
    const gamingVideosListAPIUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(gamingVideosListAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedGamingVideosList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))
      this.setState({
        gamingVideosList: convertedGamingVideosList,
        isLoadingVideos: false,
        gamingVideosListResponseStatus: gamingVideosListResponse.success,
      })
    } else {
      this.setState({
        isLoadingVideos: false,
        gamingVideosListResponseStatus: gamingVideosListResponse.failure,
      })
    }
  }

  onRetryGamingVideos = () => {
    this.setState({isLoadingVideos: true}, this.getGamingVideosList)
  }

  onSuccessGamingVideosResponse = () => {
    const {gamingVideosList} = this.state
    return (
      <div>
        <div className="trending-heading-content">
          <FaGamepad className="icon-trending" />
          <h1>Gaming</h1>
        </div>
        <ul className="videos-container">
          {gamingVideosList.map(item => (
            <GameVideoItem videoItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  onFailureGamingVideosResponse = () => (
    <FailureViewGamingVideoDetail
      onRetryGamingVideos={this.onRetryGamingVideos}
    />
  )

  renderGamingVideos = () => {
    const {gamingVideosListResponseStatus} = this.state
    switch (gamingVideosListResponseStatus) {
      case gamingVideosListResponse.success:
        return this.onSuccessGamingVideosResponse()
      case gamingVideosListResponse.failure:
        return this.onFailureGamingVideosResponse()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoadingVideos} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {isDarkMode} = value
          const theme = isDarkMode ? 'dark' : 'light'
          return (
            <>
              <Header />
              <div className="home-container">
                <Sidebar />
                <div className={`${theme}`} data-testid="gaming">
                  <div className="sub-home-videos-container">
                    <div className="content-container">
                      {isLoadingVideos
                        ? this.renderLoader()
                        : this.renderGamingVideos()}
                    </div>
                  </div>
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
