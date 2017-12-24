// libs
import PropTypes from 'prop-types'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

// src
import styles from './styles'

const Header = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image style={styles.icon} source={require('./images/gear.png')}/>
    </TouchableOpacity>
  </View>
)

Header.propTypes = {
  onPress: PropTypes.func
}

export default Header
