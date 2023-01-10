import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaHotjar} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Context from '../../Context'
import Sidebar from '../Sidebar'
import TrendingItem from '../TrendingItem'

import FailureViewTrendingVideoDetail from '../FailureViewTrendingVideoDetail'
import Header from '../Header'

import './index.css'

const trendingVideosListResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    isLoadingVideos: true,
    trendingVideosListResponseStatus: trendingVideosListResponse.initial,
  }

  componentDidMount() {
    this.getTrendingVideosList()
  }

  getTrendingVideosList = async () => {
    const trendingVideosListAPIUrl = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingVideosListAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedTrendingVideosList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: video.channel,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        trendingVideosList: convertedTrendingVideosList,
        isLoadingVideos: false,
        trendingVideosListResponseStatus: trendingVideosListResponse.success,
      })
    } else {
      this.setState({
        isLoadingVideos: false,
        trendingVideosListResponseStatus: trendingVideosListResponse.failure,
      })
    }
  }

  onRetryTrendingVideos = () => {
    this.setState({isLoadingVideos: true}, this.getTrendingVideosList)
  }

  onSuccessTrendingVideosResponse = () => {
    const {trendingVideosList} = this.state

    return (
      <div>
        <div className="trending-heading-content">
          <FaHotjar className="icon-trending" />
          <h1>Trending</h1>
        </div>
        <ul className="videos-container">
          {trendingVideosList.map(item => (
            <TrendingItem videoItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  onFailureTrendingVideosResponse = () => (
    <FailureViewTrendingVideoDetail
      onRetryTrendingVideos={this.onRetryTrendingVideos}
    />
  )

  renderTrendingVideos = () => {
    const {trendingVideosListResponseStatus} = this.state
    switch (trendingVideosListResponseStatus) {
      case trendingVideosListResponse.success:
        return this.onSuccessTrendingVideosResponse()
      case trendingVideosListResponse.failure:
        return this.onFailureTrendingVideosResponse()
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
                <div className={`${theme}`} data-testid="trending">
                  <div className="sub-home-videos-container">
                    <div className="content-container">
                      {isLoadingVideos
                        ? this.renderLoader()
                        : this.renderTrendingVideos()}
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

export default Trending
