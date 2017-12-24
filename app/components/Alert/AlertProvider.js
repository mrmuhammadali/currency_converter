// libs
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'
import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

// src
import { hasPropChanged } from '../../utils'

@connect(({ errorMessage }) => ({ errorMessage }))
export default class AlertProvider extends React.Component {
  static childContextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func
  }

  static propTypes = {
    children: PropTypes.any
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('errorMessage', this.props, nextProps)) {
      this.dropdown.alertWithType('error', 'Error', nextProps.errorMessage.error)
    }
  }

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          ref={(ref) => {
            this.dropdown = ref
          }}
        />
      </View>
    )
  }
}
