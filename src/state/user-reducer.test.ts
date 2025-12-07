import {expect, test} from "vitest";
import {userReducer} from "./user-reducer.ts";


test("should return the initial state",  () => {
    const startState = {age:20, childrenCount:2, name:'Dimych'}

    const endState = userReducer(startState, {type:'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Dimych')
})

test("should return the initial state with no name",  () => {
    const startState = {age:20, childrenCount:2, name:'Dimych'}

    const endState = userReducer(startState, {type:'INCREMENT_CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test("should return the initial state with no childrenCount",  () => {
    const startState = {age:20, childrenCount:2, name:'Dimych'}
    const newName = "Viktor"

    const endState = userReducer(startState, {type:'CHANGE-NAME',   newName:newName})
    expect(endState.name).toBe(newName)
})