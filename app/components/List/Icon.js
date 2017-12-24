// libs
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'

// src
import styles from './styles'

const Icon = ({ checkmark, visible, iconBackground }) => {
  const iconStyles = [styles.icon]
  visible && iconStyles.push(styles.iconVisible)
  iconBackground && iconStyles.push({ backgroundColor: iconBackground })

  return (
    <View style={iconStyles}>
      <If condition={checkmark}>
        <Image style={styles.checkIcon} source={require('./images/check.png')}/>
      </If>
    </View>
  )
}

Icon.propTypes = {
  checkmark: PropTypes.bool,
  visible: PropTypes.bool,
  iconBackground: PropTypes.string
}

export default Icon
