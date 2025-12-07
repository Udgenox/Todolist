import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint } from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChanheHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null)
        // if (e.key === 'Enter') {
        //     props.addTask(title);
        //     setNewTaskTitle('');}}
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

    return <div>
        <TextField value={title}
                   variant="outlined"
                   label="Type value"
               onChange={onNewTitleChanheHandler}
               onKeyPress={onKeyPressHandler}
               // className={error ? 'error' : ''} вместо 42 строки
               error={!!error}
                   helperText={error} // вместо 46 строки
        />
        <IconButton onClick={addTask} color={'primary'}><ControlPoint/></IconButton>
        {/*{error && <div className={'error-message'}>{error}</div>}*/}
    </div>
}