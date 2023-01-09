import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Context from './Context/index'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkMode: false,
    showPassword: false,
    activeTab: 'HOME',
    savedVideosList: [],
    savedVideosDetails: [],
    likedList: [],
    disLikedList: [],
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  addToDisLiked = value => {
    const {likedList, disLikedList} = this.state
    if (disLikedList.includes(value)) {
      const updatedDisLikedList = disLikedList.filter(item => item !== value)
      this.setState({
        disLikedList: updatedDisLikedList,
        likedList: [...likedList, value],
      })
    } else {
      const updatedLiked = likedList.filter(item => item !== value)
      this.setState({
        disLikedList: [...disLikedList, value],
        likedList: updatedLiked,
      })
    }
  }

  addToLiked = value => {
    const {likedList, disLikedList} = this.state
    if (likedList.includes(value)) {
      const updatedLiked = likedList.filter(item => item !== value)
      this.setState({
        likedList: updatedLiked,
        disLikedList: [...disLikedList, value],
      })
    } else {
      const updatedDisLiked = disLikedList.filter(item => item !== value)
      this.setState({
        likedList: [...likedList, value],
        disLikedList: updatedDisLiked,
      })
    }
  }

  onDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  onChangeActiveTab = value => {
    this.setState({activeTab: value})
  }

  addSavedVideosRoute = value => {
    const {savedVideosDetails, savedVideosList} = this.state
    if (savedVideosDetails.length > 0) {
      if (savedVideosList.includes(value.id)) {
        const updateDetails = savedVideosDetails.filter(item => {
          const status = item.id === value.id
          if (status) {
            return null
          }
          return item
        })
        this.setState({savedVideosDetails: updateDetails})
      } else {
        this.setState({savedVideosDetails: [...savedVideosDetails, value]})
      }
    } else {
      this.setState({savedVideosDetails: [value]})
    }
  }

  addToSavedVideos = value => {
    const {savedVideosList} = this.state
    if (savedVideosList.includes(value)) {
      const updatedSavedVideos = savedVideosList.filter(item => item !== value)
      this.setState({savedVideosList: updatedSavedVideos})
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, value],
      }))
    }
  }

  render() {
    const {
      isDarkMode,
      showPassword,
      activeTab,
      savedVideosList,
      likedList,
      disLikedList,
      savedVideosDetails,
    } = this.state
    console.log(savedVideosDetails)
    return (
      <Context.Provider
        value={{
          isDarkMode,
          showPassword,
          activeTab,
          savedVideosList,
          likedList,
          disLikedList,
          savedVideosDetails,
          onChangeActiveTab: this.onChangeActiveTab,
          onShowPassword: this.onShowPassword,
          onDarkMode: this.onDarkMode,
          addToSavedVideos: this.addToSavedVideos,
          addToLiked: this.addToLiked,
          addToDisLiked: this.addToDisLiked,
          addSavedVideosRoute: this.addSavedVideosRoute,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute path="/saved-videos" component={SavedVideos} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </>
      </Context.Provider>
    )
  }
}

export default App
