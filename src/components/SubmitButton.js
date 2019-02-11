import React from 'react'
import PropTypes from 'prop-types'

class SubmitButton extends React.Component {
  render() {
    const { text, disabled } = this.props
    return (
      <button disabled={disabled} onClick={this.props.handleSubmit}>{text}</button>
    )
  }
}

SubmitButton.propTypes = {
  text: PropTypes.string,
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool
}

export default SubmitButton
