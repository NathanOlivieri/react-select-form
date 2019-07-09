import { getYearList } from './Utils/index'
import { mainReducer } from './State/State'
import React from "react";
import { create } from "react-test-renderer";
import Button from './Components/Button'

test('Provides array of dates within range provided, inclusive', () => {
  let result = getYearList(10, 20)
  let resultLength = result.length
  expect(resultLength).toBe(11)
  expect(result).toEqual([10,11,12,13,14,15,16,17,18,19,20])
})

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

//REDUCER_TESTS
let reducerCopy = mainReducer
const stateSimulator = {
  value_one: 'one',
  value_two: 'two',
  value_three: false,
  formIsValid: true
}

describe("Reducer test", () => {
  test("Returns spread state if no case match", () => {
    const result = reducerCopy(stateSimulator, {type: 'DEFAULT', payload: false})
    expect(result).toEqual({ 
      value_one: 'one',
      value_two: 'two',
      value_three: false,
      formIsValid: true
    })
  });
  test("Modifies and returns state based on matched case", () => {
    const result = reducerCopy(stateSimulator, {type: 'SET_FORM_VALIDITY', payload: false})
    expect(result).toEqual({ 
      value_one: 'one',
      value_two: 'two',
      value_three: false,
      formIsValid: false
    })
  });
});
