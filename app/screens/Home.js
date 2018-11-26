// libs
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
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

const mapStateToProps = state => {
  const isLoading = getOr(false, `currencies.isLoading`)(state)
  const data = getOr({}, 'currencies.data')(state)
  const { amount, baseCurrency, quoteCurrency, conversions } = data
  const conversionRate = getOr(null, [baseCurrency, 'rates', quoteCurrency])(
    conversions,
  )
  const lastConvertedDate = moment(
    getOr(moment(), [baseCurrency, 'date'])(conversions),
  )
  const primaryColor = getOr('', 'theme.primaryColor')(state)
  const isDataAvailable = !!conversionRate

  return {
    isLoading,
    amount,
    baseCurrency,
    quoteCurrency,
    conversionRate,
    lastConvertedDate,
    primaryColor,
    isDataAvailable,
  }
}

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { baseCurrency, dispatch } = this.props
    dispatch(getConversion(baseCurrency))
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('baseCurrency', this.props, nextProps)) {
      const { baseCurrency, dispatch, isDataAvailable } = nextProps
      !isDataAvailable && dispatch(getConversion(baseCurrency))
    }
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base',
    })
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote',
    })
  }

  handleTextChange = amount => {
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
      primaryColor,
    } = this.props
    const quotePrice =
      isLoading || !isDataAvailable
        ? '...'
        : (amount * conversionRate).toFixed(2)

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
            onChangeText={this.handleTextChange}
          />
          <TextInput
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={primaryColor}
          />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            date={lastConvertedDate}
            conversionRate={conversionRate}
          />
          <ClearButton
            text="Reverse Currencies"
            onPress={this.handlePressReverseCurrencies}
          />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default connect(mapStateToProps)(Home)
