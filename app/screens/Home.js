// libs
import { connect } from 'react-redux'
import get from 'lodash/get'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { StatusBar, KeyboardAvoidingView } from 'react-native'

// src
import { changeCurrencyAmount, getConversion, swapCurrency } from '../actions'
import { ClearButton } from '../components/Buttons'
import Container from '../components/Container'
import { hasPropChanged } from '../utils'
import Header from '../components/Header'
import { LastConverted } from '../components/Text'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'

@connect(state => {
  const isLoading = get(state, `currencies.isLoading`, false)
  const amount = get(state, 'currencies.data.amount', 100)
  const baseCurrency = get(state, 'currencies.data.baseCurrency', 'USD')
  const quoteCurrency = get(state, 'currencies.data.quoteCurrency', 'GBP')
  const conversionRate = get(state, `currencies.data.conversions[${baseCurrency}].rates[${quoteCurrency}]`, null)
  const lastConvertedDate = moment(get(state, `currencies.data.conversions[${baseCurrency}].date`, moment()))
  const primaryColor = get(state, 'theme.primaryColor')
  const isDataAvailable = !!conversionRate

  return {
    isLoading,
    amount,
    baseCurrency,
    quoteCurrency,
    conversionRate,
    lastConvertedDate,
    primaryColor,
    isDataAvailable
  }
})
export default class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const { baseCurrency, dispatch } = this.props
    dispatch(getConversion(baseCurrency))
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('baseCurrency', this.props, nextProps)) {
      const { baseCurrency, dispatch, isDataAvailable, conversionRate } = nextProps
      console.log(isDataAvailable, conversionRate)
      dispatch(getConversion(baseCurrency))
    }
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base'
    })
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote'
    })
  }

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount))
  }

  handlePressReverseCurrencies = () => {
    this.props.dispatch(swapCurrency())
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options')
  }

  render() {
    const {
      isLoading,
      isDataAvailable,
      amount,
      baseCurrency,
      quoteCurrency,
      conversionRate,
      lastConvertedDate,
      primaryColor
    } = this.props
    const quotePrice = isLoading || !isDataAvailable ? '...' : (amount * conversionRate).toFixed(2)

    return (
      <Container backgroundColor={primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={primaryColor} />
          <TextInput
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={amount.toString()}
            keyboardType="numeric"
            textColor={primaryColor}
            onChangeText={this.handleTextChange} />
          <TextInput
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={primaryColor} />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            date={lastConvertedDate}
            conversionRate={conversionRate} />
          <ClearButton
            text="Reverse Currencies"
            onPress={this.handlePressReverseCurrencies} />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}