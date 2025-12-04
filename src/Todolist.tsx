import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type PropsType = {
    id: string;
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId:string) => void;
    addTask: (title:string, todolistId: string) => void;
    changeStatus : (taskId:string, isDone:boolean, todolistId: string) => void;
    filter: FilterValuesType
    removeTodolist: (todolistId:string) => void;
}

export const Todolist = (props: PropsType ) => {
    // const [title, setNewTaskTitle] = useState('');
    // const [error, setError] = useState<string | null>(null);

    // const addTask= () => {
    //     if (title.trim() !== '') {
    //         props.addTask(title.trim(), props.id);
    //         setNewTaskTitle('')
    //     } else {
    //         setError('Field is required')}
    // }
    // const onNewTitleChanheHandler = (e:ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e : KeyboardEvent<HTMLInputElement>) => {
    //     // setError(null)
    //     // if (e.key === 'Enter') {
    //     //     props.addTask(title);
    //     //     setNewTaskTitle('');}}
    //     setError(null)
    //     if (e.key === 'Enter') {
    //         addTask();
    //     }
    // }


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter ("completed", props.id);
    const removeTodolis = () => {
        props.removeTodolist(props.id)
    }

    //функция-обвертка, где мы избавляемся от id
    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

            return (
                <div>
                    <h3>{props.title} <button onClick={removeTodolis}>x</button></h3>
                    <AddItemForm addItem={addTask} />
                    <ul>
                        {
                            props.tasks.map((task: TaskType) => {
                                const onRemoveHandler = () => {
                                    props.removeTask(task.id, props.id);
                                }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(task.id, e.currentTarget.checked, props.id);
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