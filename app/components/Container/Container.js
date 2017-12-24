// libs
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

// src
import styles from './styles'

const Container = ({ backgroundColor, children }) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.root, backgroundColor && { backgroundColor }]}>
      { children }
    </View>
  </TouchableWithoutFeedback>

Container.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.any
}

export default Container
