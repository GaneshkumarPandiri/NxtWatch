import {Link} from 'react-router-dom'

import Context from '../../Context'

import './index.css'

const VideoThumbnailItem = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'
      const {videoItem} = props
      const {id, title, thumbnailUrl, channel} = videoItem
      return (
        <Link to={`/videos/${id}`} className={`${theme} link-item`}>
          <li className="list-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="specifications">
              <img
                src={channel.profile_image_url}
                alt="channel logo"
                className="logo"
              />
              <div>
                <p>{title}</p>
                <p>{channel.name}</p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </Context.Consumer>
)

export default VideoThumbnailItem
