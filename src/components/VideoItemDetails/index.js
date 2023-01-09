import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike, BiSave} from 'react-icons/bi'

import FailureViewVideoDetail from '../FailureView'
import Context from '../../Context'
import Header from '../Header'
import Sidebar from '../Sidebar'

import {LikeButton, DisLikeButton, SaveButton} from './styledComponents'

import './index.css'

const videoResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: [],
    isLoadingVideo: true,
    videoResponseStatus: videoResponse.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoDetailsUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoDetailsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const videoDetails = data.video_details
      const convertedVideoDetails = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channel: videoDetails.channel,
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }
      this.setState({
        videoDetails: convertedVideoDetails,
        isLoadingVideo: false,
        videoResponseStatus: videoResponse.success,
      })
    } else {
      this.setState({
        isLoadingVideo: false,
        videoResponseStatus: videoResponse.success,
      })
    }
  }

  onSuccessVideoDetails = () => (
    <Context.Consumer>
      {value => {
        const {
          addToSavedVideos,
          addSavedVideosRoute,
          savedVideosList,
          addToLiked,
          addToDisLiked,
          likedList,
          disLikedList,
        } = value

        const {videoDetails} = this.state
        const {
          id,
          title,
          videoUrl,
          channel,
          viewCount,
          publishedAt,
          description,
        } = videoDetails
        const date = formatDistanceToNow(new Date(publishedAt))
        const isSaved = savedVideosList.includes(id)
        const isLiked = likedList.includes(id)
        const isDisLiked = disLikedList.includes(id)

        const likeColor = isLiked ? '#2563eb' : '#64748b'
        const disLikeColor = isDisLiked ? '#2563eb' : '#64748b'
        const saveColor = isSaved ? '#2563eb' : '#64748b'

        const onLikeVideo = () => {
          addToLiked(id)
        }

        const onDislikeVideo = () => {
          addToDisLiked(id)
        }

        const onSaveVideo = () => {
          addToSavedVideos(id)
          addSavedVideosRoute(videoDetails)
        }

        return (
          <div className="video-item-container">
            <ReactPlayer url={videoUrl} controls width="100%" />
            <p>{title}</p>
            <div className="operations">
              <div className="view-details">
                <p>{viewCount}</p>
                <p>{date}</p>
              </div>
              <div className="button-group">
                <LikeButton
                  color={likeColor}
                  type="button"
                  onClick={onLikeVideo}
                >
                  <BiLike /> {isLiked ? 'Liked' : 'Like'}
                </LikeButton>
                <DisLikeButton
                  color={disLikeColor}
                  type="button"
                  onClick={onDislikeVideo}
                >
                  <BiDislike /> {isDisLiked ? 'Disliked' : 'Dislike'}
                </DisLikeButton>
                <SaveButton
                  color={saveColor}
                  type="button"
                  onClick={onSaveVideo}
                >
                  <BiSave />
                  {isSaved ? 'Saved' : 'Save'}
                </SaveButton>
              </div>
            </div>
            <hr />
            <div>
              <img
                src={channel.profile_image_url}
                alt="profile"
                className="logo"
              />
              <div>
                <p>{channel.name}</p>
                <p>{channel.subscriber_count}</p>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )

  onRetryVideoDetails = () => {
    this.setState({isLoadingVideo: true}, this.getVideoDetails)
  }

  onFailureVideoDetails = () => (
    <FailureViewVideoDetail onRetryVideoDetails={this.onRetryVideoDetails} />
  )

  renderVideoDetails = () => {
    const {videoResponseStatus} = this.state
    switch (videoResponseStatus) {
      case videoResponse.success:
        return this.onSuccessVideoDetails()
      case videoResponse.failure:
        return this.onFailureVideoDetails()
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
    const {isLoadingVideo} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {isDarkMode} = value
          const theme = isDarkMode ? 'dark' : 'light'

          return (
            <>
              <Header />
              <div className="video-details-container">
                <Sidebar />
                <div
                  className={`${theme} video-content`}
                  data-testid="videoItemDetails"
                >
                  {isLoadingVideo
                    ? this.renderLoader()
                    : this.renderVideoDetails()}
                </div>
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoItemDetails
