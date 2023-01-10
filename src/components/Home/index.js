import {Component} from 'react'
import Cookies from 'js-cookie'

import {ImCross} from 'react-icons/im'

import Loader from 'react-loader-spinner'

import Context from '../../Context'
import Sidebar from '../Sidebar'

import VideoThumbnailItem from '../VideoThumbnailItem'

import SearchResultsNotFound from '../SearchResultsNotFound'

import Header from '../Header'

import './index.css'
import FailureView from '../FailureView'

const videosListResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    videosList: [],
    isLoadingVideos: true,
    videosListResponseStatus: videosListResponse.initial,
    bannerHide: false,
  }

  componentDidMount() {
    this.getAllVideosList()
  }

  getAllVideosList = async () => {
    const {searchInput} = this.state
    const videosListAPIUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videosListAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedVideosList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: video.channel,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        videosList: convertedVideosList,
        isLoadingVideos: false,
        videosListResponseStatus: videosListResponse.success,
      })
    } else {
      this.setState({
        isLoadingVideos: false,
        videosListResponseStatus: videosListResponse.failure,
      })
    }
  }

  onSearchClick = () => {
    this.setState({isLoadingVideos: true})
    this.getAllVideosList()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  onRetryVideos = () => {
    this.setState({isLoadingVideos: true}, this.getAllVideosList)
  }

  onSuccessVideosResponse = () => (
    <Context.Consumer>
      {value => {
        const {isDarkMode} = value
        const {
          isLoadingVideos,
          videosList,
          searchInput,
          bannerHide,
        } = this.state
        const theme = isDarkMode ? 'dark' : 'light'

        return (
          <div className={`${theme}`} data-testid="home">
            {!bannerHide && (
              <div className="banner" data-testid="banner">
                <div className="banner-cross">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="logo-home"
                  />
                  <button
                    type="button"
                    onClick={this.onHideBanner}
                    data-testid="close"
                  >
                    <ImCross />
                  </button>
                </div>
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button" className="get-button">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="sub-home-videos-container">
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onSearchClick}
                  data-testid="searchButton"
                >
                  Search
                </button>
              </div>
            </div>
            <div>
              {videosList.length <= 0 ? (
                <SearchResultsNotFound onRetryVideos={this.onRetryVideos} />
              ) : (
                <ul className="videos-container">
                  {videosList.map(item => (
                    <VideoThumbnailItem videoItem={item} key={item.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )

  onFailureVideosResponse = () => (
    <FailureView onRetryVideos={this.onRetryVideos} />
  )

  renderVideos = () => {
    const {videosListResponseStatus} = this.state
    switch (videosListResponseStatus) {
      case videosListResponse.success:
        return this.onSuccessVideosResponse()
      case videosListResponse.failure:
        return this.onFailureVideosResponse()
      default:
        return null
    }
  }

  onHideBanner = () => {
    this.setState({bannerHide: true})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoadingVideos, searchInput, bannerHide} = this.state
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
                <div className={`${theme} content-container`}>
                  {isLoadingVideos ? this.renderLoader() : this.renderVideos()}
                </div>
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
