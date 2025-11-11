import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | 'active';

function App() {
    // let tasks = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false },
    //     { id: 4, title: 'Redux', isDone: false },
    // ]

    // const tasks2 = [
    //     { id: 1, title: 'Hello word', isDone: true },
    //     { id: 2, title: 'I am happy', isDone: false },
    //     { id: 3, title: 'Yo', isDone: false },
    // ]

    let [tasks, setTask] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (id: string) => {
      let filteredTasks = tasks.filter((task) => task.id !== id)
        setTask(filteredTasks);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
    const addTask = (title:string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTask(newTasks);
    }

    let tasksTodolist = tasks
    if (filter==='completed') {
        tasksTodolist = tasks.filter((task: TaskType) => task.isDone === true);
    }
    if (filter==='active') {
        tasksTodolist = tasks.filter((task: TaskType) => task.isDone === false);
    }
  return (
      <div className="app">
          <Todolist title='What you learn'
                    tasks={tasksTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
          />
          {/*<Todolist title='Songs' tasks={tasks}  />*/}
      </div>
  )
}

export default App
