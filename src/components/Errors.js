import React from 'react'
import PropTypes from 'prop-types'

class Errors extends React.Component {
  render() {
    return (
      <ul className="errors">
        {this.props.messages.map(message =>
          <li key={message}>{message}</li>
        )}
      </ul>
    )
  }
}

Errors.propTypes = {
  messages: PropTypes.arr
}

export default Errors
