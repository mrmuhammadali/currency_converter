// libs
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

// src
import { changePrimaryColor } from '../actions'
import { ListItem, Separator } from '../components/List'

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $green: '$primaryGreen',
  $orange: '$primaryOrange',
  $purple: '$primaryPurple',
})

const mapStateToProps = state => {
  const { primaryColor } = state.theme

  return { primaryColor }
}

class Themes extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  handleThemePress = color => {
    const { dispatch, navigation } = this.props
    dispatch(changePrimaryColor(color))
    navigation.goBack()
  }

  render() {
    const { primaryColor } = this.props

    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Blue"
          selected
          checkmark={primaryColor === styles.$blue}
          iconBackground={styles.$blue}
          onPress={() => this.handleThemePress(styles.$blue)}
        />
        <Separator />
        <ListItem
          text="Green"
          selected
          checkmark={primaryColor === styles.$green}
          iconBackground={styles.$green}
          onPress={() => this.handleThemePress(styles.$green)}
        />
        <Separator />
        <ListItem
          text="Orange"
          selected
          checkmark={primaryColor === styles.$orange}
          iconBackground={styles.$orange}
          onPress={() => this.handleThemePress(styles.$orange)}
        />
        <Separator />
        <ListItem
          text="Purple"
          selected
          checkmark={primaryColor === styles.$purple}
          iconBackground={styles.$purple}
          onPress={() => this.handleThemePress(styles.$purple)}
        />
        <Separator />
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps)(Themes)
