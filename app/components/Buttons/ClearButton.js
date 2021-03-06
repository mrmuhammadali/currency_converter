// libs
import PropTypes from 'prop-types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

// src
import styles from './styles'

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Image style={styles.icon} source={require('./images/icon.png')}/>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
)

ClearButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

export default ClearButton
