// libs
import color from 'color'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'

// src
import styles from './styles'

const InputWithButton = props => {
  const { onPress, buttonText, editable = true, textColor } = props
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier
  )

  return (
    <View style={[styles.container, !editable && styles.containerDisabled]}>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={onPress}
        underlayColor={underlayColor}>
        <Text style={[styles.buttonText, textColor && { color: textColor }]}>
          {buttonText}
        </Text>
      </TouchableHighlight>
      <View style={styles.border}/>
      <TextInput style={styles.input} underlineColorAndroid="transparent" {...props}/>
    </View>
  )
}

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  isEditable: PropTypes.bool,
  textColor: PropTypes.string
}

export default InputWithButton
