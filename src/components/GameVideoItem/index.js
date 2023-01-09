import {Link} from 'react-router-dom'

import Context from '../../Context'

import './index.css'

const GamingVideoItem = props => (
  <Context.Consumer>
    {value => {
      const {isDarkMode} = value
      const theme = isDarkMode ? 'dark' : 'light'
      const {videoItem} = props
      const {id, title, thumbnailUrl, viewCount} = videoItem
      return (
        <Link to={`/videos/${id}`} className={`${theme} link-item`}>
          <li className="list-item-thumbnail">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image-gaming"
            />
            <div className="specifications-gaming">
              <p>{title}</p>
              <p>{viewCount}</p>
            </div>
          </li>
        </Link>
      )
    }}
  </Context.Consumer>
)

export default GamingVideoItem
