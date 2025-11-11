import {FilterValuesType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;

}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title:string) => void;
}

export const Todolist = (props: PropsType ) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChanheHandler = (e:ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
    const onKeyPressHandler = (e : KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');}}
    const addTask= () => {props.addTask(newTaskTitle);
        setNewTaskTitle('')}

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter ("completed");

            return (
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input value={newTaskTitle} onChange={onNewTitleChanheHandler} onKeyPress={onKeyPressHandler}/>
                        <button onClick={addTask}>+</button>
                    </div>
                    <ul>
                        {
                            props.tasks.map((task: TaskType) => {
                                const onRemoveHandler = () => {
                                    props.removeTask(task.id)
                                }

                                return <li key={task.id}><input type='checkbox' checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>
                            })}

                    </ul>
                    <div>
                        <button onClick={onAllClickHandler}>All</button>
                        <button onClick={onActiveClickHandler}>Active</button>
                        <button onClick={onCompletedClickHandler}>Completed
                        </button>
                    </div>
                </div>
            );
        }