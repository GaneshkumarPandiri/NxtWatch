import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Context from '../../Context'

import './index.css'

const VideoThumbnailItem = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'
      const {videoItem} = props
      const {
        id,
        title,
        thumbnailUrl,
        channel,
        viewCount,
        publishedAt,
      } = videoItem
      const date = formatDistanceToNow(new Date(publishedAt))
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
                <p>{viewCount}</p>
                <p>{date}</p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </Context.Consumer>
)

export default VideoThumbnailItem
