// libs
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Text } from 'react-native'

// src
import styles from './styles'

const LastConverted = ({ base, quote, conversionRate, date }) => (
  <Text style={styles.smallText}>
    1 {base} = {conversionRate} {quote} as of {moment(date).format('MMM D, YYYY')}
  </Text>
)

LastConverted.propTypes = {
  date: PropTypes.object,
  base: PropTypes.string,
  quote: PropTypes.string,
  conversionRate: PropTypes.number
}

export default LastConverted
