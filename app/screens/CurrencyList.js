// @flow
// libs
import { connect } from 'react-redux'
import { FlatList, StatusBar, View } from 'react-native'
import filter from 'lodash/fp/filter'
import getOr from 'lodash/fp/getOr'
import PropTypes from 'prop-types'
import React from 'react'

// src
import { changeBaseCurrency, changeQuoteCurrency } from '../actions'
import { ListItem, Separator } from '../components/List'

const mapStateToProps = (state, ownProps) => {
  const currencyType = getOr('base', 'navigation.state.params.type')(ownProps)
  const primaryColor = getOr('', 'theme.primaryColor')(state)
  const data = getOr({}, 'currencies.data')(state)
  const { baseCurrency, quoteCurrency, currencyList, conversions } = data
  const withoutCurrency = currencyType === 'base' ? quoteCurrency : baseCurrency

  return {
    baseCurrency,
    quoteCurrency,
    currencyType,
    primaryColor,
    currencyList: filter(item => item !== withoutCurrency)(currencyList),
  }
}

class CurrencyList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  handleListItemPress = currency => {
    const { currencyType, dispatch, navigation } = this.props

    if (currencyType === 'base') {
      dispatch(changeBaseCurrency(currency))
    } else if (currencyType === 'quote') {
      dispatch(changeQuoteCurrency(currency))
    }
    navigation.goBack(null)
  }

  render() {
    const {
      baseCurrency,
      quoteCurrency,
      currencyType,
      primaryColor,
      currencyList,
    } = this.props

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencyList}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={
                item ===
                (currencyType === 'base' ? baseCurrency : quoteCurrency)
              }
              iconBackground={primaryColor}
              onPress={() => this.handleListItemPress(item)}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(CurrencyList)
