import React from 'react'
import PropTypes from 'prop-types'

class SelectInput extends React.Component {
  render() {
    const { values } = this.props
    return (
      <select onChange={this.props.handleChange}>
        {values.map(value =>
          <option key={value} value={value}>{value}</option>
        )}
      </select>
    )
  }
}

SelectInput.propTypes = {
  values: PropTypes.array,
  handleChange: PropTypes.func
};

export default SelectInput
