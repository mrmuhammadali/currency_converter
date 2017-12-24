// libs
import PropTypes from 'prop-types'
import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

const connectAlert = (WrappedComponent) => {
  class ConnectedAlert extends React.Component {
    static contextTypes = {
      alertWithType: PropTypes.func,
      alert: PropTypes.func
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          alertWithType={this.context.alertWithType}
          alert={this.context.alert}
        />
      )
    }
  }

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent)
}

export default connectAlert
