// type StateType = {
//     age: number
//     childrenCount: number
//     name: string
// }

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType


import {FilterValuesType, TodolistType} from "../App.tsx";
import {v1} from "uuid";



export const todolistsReducer = (state: TodolistType[], action: ActionTypes):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state ]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state ]
        }

        default:
            throw new Error('Unknown action type')
    }
}

export const RemoveTodoListAC = (todolistId:string) : RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST' , id: todolistId}
}
export const addTodolistAC = (title:string) : AddTotodlistActionType => {
    return { type: 'ADD-TODOLIST' , title: title, todolistId: v1()}
}
export const ChangeTodolistTitletAC = (id:string, title: string) : ChangeTotodlistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE' , id: id, title : title}
}
export const ChangeTodolistFiltertAC = (id:string, filter: FilterValuesType) : ChangeTotodlistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER' , id: id, filter : filter}
}