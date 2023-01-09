import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import Context from '../../Context'

import './index.css'

const TrendingVideoItem = props => (
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
          <li className="list-item-trending">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="specifications-trending">
              <p>{title}</p>
              <p>{channel.name}</p>
              <div>
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

export default TrendingVideoItem
