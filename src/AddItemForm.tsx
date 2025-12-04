import {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input value={title}
               onChange={onNewTitleChanheHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}