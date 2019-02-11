import React from 'react'
import PropTypes from 'prop-types'
import SelectInput from './SelectInput'

class Item extends React.Component {
  render() {
    // item [dish, servings]
    const { item, dishes, id } = this.props
    return (
      <div>
        <select onChange={(e) => this.props.handleDish(e, id)}>
          <option key={item[0]} value={item[0]}>{item[0]}</option>
          {dishes.map(dish_no =>
            <option key={dish_no} value={dish_no}>{dish_no}</option>
          )}
        </select>
        <SelectInput values={[1,2,3,4,5,6,7,8,9,10]} handleChange={(e) => this.props.handleServings(e, id)} />
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
