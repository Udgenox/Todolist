import {combineReducers, createStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";
// import {TaskStateType} from "../App.tsx";
// import {TodolistType} from "../AppWithReducers.tsx";

// type AppRootState = {
//     todolists: Array<TodolistType>,
//     tasks: TaskStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store