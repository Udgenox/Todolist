import {expect, test} from "vitest";
import {TaskStateType, TodolistType} from "../App.tsx";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodoistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})