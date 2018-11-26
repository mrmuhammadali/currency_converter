// libs
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'
import getOr from 'lodash/fp/getOr'
import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

// src
import { hasPropChanged } from '../../utils'

const mapStateToProps = ({ errorMessage }) => ({ errorMessage })

class AlertProvider extends React.Component {
  static childContextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  }

  static propTypes = {
    children: PropTypes.any,
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('errorMessage', this.props, nextProps)) {
      const error = getOr(null, 'errorMessage.error')(nextProps)
      error && this.dropdown.alertWithType('error', 'Error', error)
    }
  }

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          ref={ref => {
            this.dropdown = ref
          }}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(AlertProvider)
