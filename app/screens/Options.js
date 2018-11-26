// libs
import { Ionicons } from '@expo/vector-icons'
import { Platform, ScrollView, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { WebBrowser } from 'expo'

// src
import { connectAlert } from '../components/Alert'
import { ListItem, Separator } from '../components/List'

const ICON_COLOR = '#838383'
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md'
const ICON_SIZE = 23

class Options extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  }

  handleThemesPress = () => {
    this.props.navigation.navigate('Themes')
  }

  handleSitePress = () => {
    WebBrowser.openBrowserAsync('https://fixer.io')
    // .catch(() => this.props.alertWithType('error', 'Sorry!', `Fixer.io can't be opened at the moment.`))
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-link`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
      </ScrollView>
    )
  }
}

export default connectAlert(Options)
