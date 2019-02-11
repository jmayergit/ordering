import React from 'react'
import PropTypes from 'prop-types'

class SubmitButton extends React.Component {
  render() {
    const { text } = this.props
    return (
      <button onClick={this.props.handleSubmit}>{text}</button>
    )
  }
}

SubmitButton.propTypes = {
  text: PropTypes.string,
  handleSubmit: PropTypes.func
}

export default SubmitButton
