// libs
import { connect } from 'react-redux'
import { FlatList, StatusBar, View } from 'react-native'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import sortBy from 'lodash/sortBy'
import without from 'lodash/without'

// src
import { changeBaseCurrency, changeQuoteCurrency } from '../actions'
import { ListItem, Separator } from '../components/List'

const mapStateToProps = (state, ownProps) => {
  const baseCurrency = get(state, 'currencies.data.baseCurrency', 'USD')
  const quoteCurrency = get(state, 'currencies.data.quoteCurrency', 'EUR')
  const currencyType = get(ownProps, 'navigation.state.params.type', 'base')
  const primaryColor = get(state, 'theme.primaryColor')
  const unSortedCurrencyList = Object.keys(
    get(state, `currencies.data.conversions[${baseCurrency}].rates`, {}),
  )
  let currencyList = []

  if (currencyType === 'base') {
    currencyList = sortBy(
      without([baseCurrency, ...unSortedCurrencyList], quoteCurrency),
    )
  } else if (currencyType === 'quote') {
    currencyList = sortBy(unSortedCurrencyList)
  }

  return {
    baseCurrency,
    quoteCurrency,
    currencyType,
    primaryColor,
    currencyList,
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
