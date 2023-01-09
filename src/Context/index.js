import React from 'react'

const Context = React.createContext({
  isDarkMode: '',
  showPassword: '',
  activeTab: '',
  savedVideosList: '',
  likedList: '',
  disLikedList: '',
  savedVideosDetails: '',
  onChangeActiveTab: () => {},
  onDarkMode: () => {},
  onShowPassword: () => {},
  addToSavedVideos: () => {},
  addToLiked: () => {},
  addToDisLiked: () => {},
  addSavedVideosRoute: () => {},
})

export default Context
