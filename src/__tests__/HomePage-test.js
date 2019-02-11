import React from 'react'
import Enzyme from 'enzyme'
import Home from '../pages/Home'
import SubmitButton from '../components/SubmitButton'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('Must have minimum number of items before proceeding to step 4', () => {
  const home = Enzyme.mount(<Home />)

  home.setState({
    part: 3,
  })

  home.find(SubmitButton).simulate('click')

  expect(home.state().part).toEqual(3)
})

test('Cannot have same dish twice before proceeding to step 4', () => {
  const home = Enzyme.mount(<Home />)

  home.setState({
    part: 3,
    number_of_people: 1,
    order: [['Coffee', 1],['Coffee', 1]]
  })

  home.find(SubmitButton).simulate('click')

  expect(home.state().part).toEqual(3)
})

test('Can proceed to step 4 with correct number of dishes and no repeating dishes', () => {
  const home = Enzyme.mount(<Home />)

  home.setState({
    part: 3,
    number_of_people: 1,
    order: [['Coffee', 1]]
  })

  home.find(SubmitButton).simulate('click')

  expect(home.state().part).toEqual(4)
})
