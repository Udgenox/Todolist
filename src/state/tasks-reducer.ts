import {TaskStateType} from "../App.tsx";
import {v1} from "uuid";
import {AddTotodlistActionType, RemoveTodoListActionType, todolistId1, todolistId2} from "./todolists-reducer.ts";


// type StateType = {
//     age: number
//     childrenCount: number
//     name: string
// }

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string

}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    todolistId: string
    title: string
}


type ActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTitleActionType
    | AddTotodlistActionType
    | RemoveTodoListActionType




// type ActionType = {
//     type: string
//     [key: string]: any
// }


const initialState: TaskStateType = {
    [todolistId1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolistId2]: [
        { id: v1(), title: 'Book', isDone: false },
        { id: v1(), title: 'Milk', isDone: true },
    ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(task => task.id !==  action.taskId );
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks

            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId)
            if (task) {
                task.isDone = action.isDone

            }
            return stateCopy

        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(task => task.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST':{
            const stateCopy = {...state};

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId : string, todolistId:string) : RemoveTaskActionType => {
    return { type: 'REMOVE-TASK' , todolistId, taskId}
}
export const addTaskAC = (title:string, todolistId: string) : AddTaskActionType => {
    return { type: 'ADD-TASK' , title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean, todolistId: string) : ChangeTaskActionType => {
    return { type: 'CHANGE-TASK-STATUS' , taskId, todolistId, isDone}
}
export const changeTaskTitleAC = (taskId:string, title: string, todolistId: string) : ChangeTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE' , taskId, todolistId, title}
}
