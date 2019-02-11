import React from 'react'
import Enzyme from 'enzyme'
import SelectInput from '../components/SelectInput'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('SelectInput renders the correct amount of options', () => {
  const selectInput = Enzyme.shallow(<SelectInput values={[1,2,3,4]} />)

  expect(selectInput.find('option')).toHaveLength(4)
})
