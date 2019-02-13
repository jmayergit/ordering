import React from 'react'
import PropTypes from 'prop-types'
import SelectInput from './SelectInput'
import './Item.css'

class Item extends React.Component {
  render() {
    // item [dish, servings]
    const { item, dishes, id } = this.props
    return (
      <div className="item">
        <select value={item[0]} onChange={(e) => this.props.handleDish(e, id)}>
          {dishes.map(dish_no =>
            <option key={dish_no} value={dish_no}>{dish_no}</option>
          )}
        </select>
        <SelectInput value={item[1]} values={[1,2,3,4,5,6,7,8,9,10]} handleChange={(e) => this.props.handleServings(e, id)} />
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.array,
  dishes: PropTypes.array,
  id: PropTypes.number
}

export default Item
