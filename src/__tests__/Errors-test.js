import React from 'react'
import Enzyme from 'enzyme'
import Errors from '../components/Errors'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('Errors renders correctly without messages', () => {
  const errors = Enzyme.shallow(<Errors messages={[]}/>)

  expect(errors.find('li')).toHaveLength(0)
});

test('Errors renders correctly with messages', () => {
  const errors = Enzyme.shallow(<Errors messages={['OH NO!','NOT THE SHOES!']} />)

  expect(errors.find('li')).toHaveLength(2)
})
