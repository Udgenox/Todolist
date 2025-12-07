import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, Checkbox, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";

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
    changeTaskStatus : (taskId:string, isDone:boolean, todolistId: string) => void;
    changeTaskTitle : (taskId:string, newTitle:string, todolistId: string) => void;
    filter: FilterValuesType
    removeTodolist: (todolistId:string) => void;
    changeTodolistTitle: (id:string, newTitle:string) => void;
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

    //функция-обвертка, где мы избавляемся от id
    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter ("completed", props.id);


            return (
                <div>
                    <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>  <IconButton onClick={removeTodolist}><Delete/></IconButton></h3>
                    <AddItemForm addItem={addTask} />
                    <div>
                        {
                            props.tasks.map((task: TaskType) => {
                                const onRemoveHandler = () => {
                                    props.removeTask(task.id, props.id);
                                }
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                                }

                                const onChangeTitleHandler = (newValue:string) => {
                                    props.changeTaskTitle(task.id, newValue, props.id);
                                }

                                return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <Checkbox
                                    onChange={onChangeStatusHandler}
                                    checked={task.isDone}
                                />
                                    {/*<span>{task.title}</span>*/}
                                    <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                    <IconButton onClick={onRemoveHandler}><Delete /></IconButton>
                                </div>
                            })}

                    </div>
                    <div>
                        <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                                onClick={onAllClickHandler}>All</Button>
                        <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                            onClick={onActiveClickHandler}>Active</Button>
                        <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                        </Button>
                    </div>
                </div>
            );
}

