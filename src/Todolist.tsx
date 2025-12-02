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
    changeStatus : (taskId:string, isDone:boolean) => void;
    filter: FilterValuesType
}

export const Todolist = (props: PropsType ) => {
    const [title, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask= () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setNewTaskTitle('')
        } else {
            setError('Field is required')}
    }
    const onNewTitleChanheHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e : KeyboardEvent<HTMLInputElement>) => {
        // setError(null)
        // if (e.key === 'Enter') {
        //     props.addTask(title);
        //     setNewTaskTitle('');}}
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }


    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter ("completed");


            return (
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input value={title}
                               onChange={onNewTitleChanheHandler}
                               onKeyPress={onKeyPressHandler}
                                className={error ? 'error' : ''}
                        />
                        <button onClick={addTask}>+</button>
                        {error && <div className={'error-message'}>{error}</div>}
                    </div>
                    <ul>
                        {
                            props.tasks.map((task: TaskType) => {
                                const onRemoveHandler = () => {
                                    props.removeTask(task.id)
                                }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(task.id, e.currentTarget.checked)
                                }

                                return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type='checkbox'
                                    onChange={onChangeHandler}
                                    checked={task.isDone}
                                />
                                    <span>{task.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>
                            })}

                    </ul>
                    <div>
                        <button className={props.filter === 'all' ? 'active-filter' : ''}
                                onClick={onAllClickHandler}>All</button>
                        <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active</button>
                        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                        </button>
                    </div>
                </div>
            );
        }