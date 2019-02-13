import React from 'react'
import './Home.css'
import SelectInput from '../components/SelectInput'
import Item from '../components/Item'
import SubmitButton from '../components/SubmitButton'
import Errors from '../components/Errors'
import RESTAURANTS from '../data/restaurants'
import DISHES from '../data/dishes'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      part: 1,

      meal_category: 'breakfast',
      number_of_people: 1,
      restaurant: '',

      restaurants: [],

      dishes: [],
      order: [], // [[dish, servings]],

      errors: []
    }
  }

  handleMealCategory = (synEvent) => {
    const meal_category = synEvent.currentTarget.value
    this.setState({
      meal_category: meal_category
    })
  }

  handleNumberOfPeople = (synEvent) => {
    const number_of_people = parseInt(synEvent.currentTarget.value)
    this.setState({
      number_of_people: number_of_people
    })
  }

  handleBackClick = () => {
    const part = this.state.part
    this.setState({
      part: part - 1
    })
  }

  handlePart1Submit = () => {
    const restaurants = RESTAURANTS[this.state.meal_category]
    this.setState({
      part: 2,
      restaurant: restaurants[0],
      restaurants: restaurants
    })
  }

  handleRestaurantChange = (synEvent) => {
    const restaurant = synEvent.currentTarget.value
    this.setState({
      restaurant: restaurant
    })
  }

  getDishes = () => {
    let dishes = []
    DISHES["dishes"].forEach((dish) => {
      if(dish["restaurant"] === this.state.restaurant && dish["availableMeals"].includes(this.state.meal_category)) {
        dishes.push(dish["name"])
      }
    })
    return dishes
  }

  handlePart2Submit = () => {
    // to do: don't reset order if restaurant stays the same
    const dishes = this.getDishes()
    this.setState({
      part: 3,
      dishes: dishes,
      order: []
    })
  }

  addItem = () => {
    let order = this.state.order
    order.push([this.state.dishes[0], 1])
    this.setState({
      order: order
    })
  }

  removeItem = (synEvent, index) => {
    let order = this.state.order
    order.splice(index, 1)
    this.setState({
      order: order
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

  rightNumberOfServings = () => {
    let total_servings = 0
    this.state.order.map(item =>
      total_servings += item[1]
    )
    return total_servings >= this.state.number_of_people && total_servings <= 10
  }

  repeatingDish = () => {
    let dishes = {}
    let repeat = false
    this.state.order.forEach((item) => {
      if(dishes[item[0]]) {
        repeat = true
      }else {
        dishes[item[0]] = true
      }
    })
    return repeat
  }

  handlePart3Submit = () => {
    let errors = []
    if(!this.rightNumberOfServings()) {
      errors.push("Must have at least one item for each person and the total number of items cannot be greater than ten.")
    }
    if(this.repeatingDish()) {
      errors.push("Cannot select the same dish twice, instead try adding more servings.")
    }

    this.setState({
      errors: errors
    })

    if(errors.length === 0) {
      this.setState({
        part: 4
      })
    }
  }

  handlePart4Submit = () => {
    console.log("________________");
    console.log("Order:");
    console.log(this.state.order);
    console.log("________________");
  }

  part1 = () => {
    return (
      <div>
        <h3>Select the type of meal and the number of people in your party</h3>
        <div>
          <select value={this.state.meal_category} onChange={this.handleMealCategory}>
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

  part2 = () => {
    return (
      <div>
        <h3>
          Select which restaurant
        </h3>
        <select value={this.state.restaurant} onChange={this.handleRestaurantChange}>
          {this.state.restaurants.map(restaurant =>
            <option key={restaurant} value={restaurant}>{restaurant}</option>
          )}
        </select>
        <div>
          <button onClick={this.handleBackClick}>Back</button>
          <SubmitButton text="Next" handleSubmit={this.handlePart2Submit} />
        </div>
      </div>
    )
  }

  part3 = () => {
    return (
      <div>
        <h3>
          Select dishes
        </h3>
        {this.state.order.map((item, index) =>
          <div>
            <Item
              item={item}
              id={index}
              key={index}
              dishes={this.state.dishes}
              handleDish={this.handleDish}
              handleServings={this.handleServings}/>
            <button onClick={(e) => this.removeItem(e, index)}>X</button>
          </div>
        )}
        <div>
          <button onClick={this.addItem}>Add Item</button>
          <button onClick={this.handleBackClick}>Back</button>
          <SubmitButton text="Review Order" handleSubmit={this.handlePart3Submit} />
        </div>
      </div>
    )
  }

  part4 = () => {
    return (
      <div>
        <h3>
        Review order
        </h3>
        <div>
          <ul>
            {this.state.order.map((item) => (
              <li key={item}>{item[0]}: {item[1]}</li>
            ))}
          </ul>
        </div>
        <button onClick={this.handleBackClick}>Back</button>
        <SubmitButton text="Place Your Order" handleSubmit={this.handlePart4Submit} />
      </div>
    )
  }

  presentForm = () => {
    switch(this.state.part) {
      case 1:
        return this.part1()
      case 2:
        return this.part2()
      case 3:
        return this.part3()
      case 4:
        return this.part4()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Home">
        {this.presentForm()}
        {this.state.errors.length > 0 && <Errors messages={this.state.errors} />}
      </div>
    );
  }
}

export default Home
