import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

function App() {
    // let tasks = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false },
    //     { id: 4, title: 'Redux', isDone: false },
    // ]
    //
    // const tasks2 = [
    //     { id: 1, title: 'Hello word', isDone: true },
    //     { id: 2, title: 'I am happy', isDone: false },
    //     { id: 3, title: 'Yo', isDone: false },
    // ]
    //
    // let [tasks, setTask] = useState<Array<TaskType>>([
    //     { id: v1(), title: 'HTML&CSS', isDone: true },
    //     { id: v1(), title: 'JS', isDone: true },
    //     { id: v1(), title: 'ReactJS', isDone: false },
    //     { id: v1(), title: 'Redux', isDone: false },
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>('all');




    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter((task) => task.id != id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    const addTask = (title:string, todolistId: string) => {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId )
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId1, title: 'What to learn', filter: 'active' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' },
    ])

    let removeTodolist = (todolistId: string) => {
        debugger
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists([...filteredTodolist]);

        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }


    let [tasksObj, setTasks] = useState({
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
    })



  return (
      <div className="app">
          {
              todolists.map((tl) => {
                  let tasksTodolist = tasksObj[tl.id];
                  if (tl.filter==='completed') {
                      tasksTodolist = tasksTodolist.filter((task: TaskType) => task.isDone === true);
                  }
                  if (tl.filter==='active') {
                      tasksTodolist = tasksTodolist.filter((task: TaskType) => task.isDone === false);
                  }

                  return <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                  />
              })
          }

          {/*<Todolist title='Songs' tasks={tasks}  />*/}
      </div>
  )
}

export default App
