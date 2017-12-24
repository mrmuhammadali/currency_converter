// libs
import { Animated, Keyboard, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

// src
import styles from './styles'

const ANIMATION_DURATION = 250

export default class Logo extends React.Component {
  static propTypes = {
    tintColor: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.containerImageSize = new Animated.Value(styles.$largeContainerSize)
    this.imageSize = new Animated.Value(styles.$largeImageSize)
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShow)
    this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHide)
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
  }

  keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.containerImageSize, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageSize, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start()
  }

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.containerImageSize, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageSize, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start()
  }

  render() {
    const { tintColor } = this.props

    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.containerImage, { width: this.containerImageSize, height: this.containerImageSize }]}
          source={require('./images/background.png')}/>
        <Animated.Image
          style={[styles.logo, { width: this.imageSize, height: this.imageSize }, tintColor && { tintColor }]}
          source={require('./images/logo.png')}/>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    )
  }
}
