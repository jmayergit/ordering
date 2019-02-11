import React from 'react'
import './Home.css'
import SelectInput from '../components/SelectInput'
import Item from '../components/Item'
import SubmitButton from '../components/SubmitButton'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      part: 3,

      meal_category: 'breakfast',
      number_of_people: 1,
      restaurant: '',

      restaurants: ['MyWoman','WoMan','Lutine'],

      dishes_not_ordered: ['Tuna', 'Sushi'],
      order: [['Steamed Ribs', 1]], // [[dish, servings]]
    }
  }

  handleMealCategory = (synEvent) => {

  }

  handleNumberOfPeople = (synEvent) => {
    const number_of_people = parseInt(synEvent.currentTarget.value)
    this.setState({
      number_of_people: number_of_people
    })
  }

  handlePart1Submit = () => {
    this.setState({
      part: 2
    })
  }

  handleRestaurantChange = (synEvent) => {
    const restaurant = synEvent.currentTarget.value
    this.setState({
      restaurant: restaurant
    })
  }

  handlePart2Submit = () => {
    this.setState({
      part: 3
    })
  }

  handleDish = (synEvent, id) => {
    const dish = synEvent.currentTarget.value
    let order = this.state.order
    order[id][0] = dish
    this.setState({
      order: order
    })
  }

  handleServings = (synEvent, id) => {
    const servings = parseInt(synEvent.currentTarget.value)
    let order = this.state.order
    order[id][1] = servings
    this.setState({
      order: order
    })
  }

  handlePart3Submit = (synEvent) => {
    
  }

  part1 = () => {
    return (
      <div>
        <div>Part 1</div>
        <div>
          <select handleChange={this.handleMealCategory}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div>
          <SelectInput values={[1,2,3,4,5,6,7,8,9,10]} handleChange={this.handleNumberOfPeople} />
        </div>
        <div>
          <SubmitButton text="Next" handleSubmit={this.handlePart1Submit} />
        </div>
      </div>
    )
  }

  part2 = (restaurants) => {
    return (
      <div>
        <div>
          Part 2
        </div>
        <select handleChange={this.handleRestaurantChange}>
          {restaurants.map(restaurant =>
            <option key={restaurant} value={restaurant}>{restaurant}</option>
          )}
        </select>
        <div>
          <SubmitButton text="Next" handleSubmit={this.handlePart2Submit} />
        </div>
      </div>
    )
  }

  part3 = (order, dishes_not_ordered) => {
    return (
      <div>
        <div>
          Part 3
        </div>
        {order.map((item, index) =>
          <Item
            item={item}
            id={index}
            dishes_not_ordered={dishes_not_ordered}
            handleDish={this.handleDish}
            handleServings={this.handleServings}/>
        )}
      </div>
    )
  }

  part4 = () => {
    return (
      <div>
        Part 4
      </div>
    )
  }

  presentForm = (part, restaurants, order, dishes_not_ordered) => {
    switch(part) {
      case 1:
        return this.part1()
      case 2:
        return this.part2(restaurants)
      case 3:
        return this.part3(order, dishes_not_ordered)
      case 4:
        return this.part4()
      default:
        return null
    }
  }

  render() {
    const { part, restaurants, order, dishes_not_ordered } = this.state
    return (
      <div className="Home">
        {this.presentForm(part, restaurants, order, dishes_not_ordered)}
      </div>
    );
  }
}

export default Home
