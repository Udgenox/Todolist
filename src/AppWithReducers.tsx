import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
// import {useReducer} from "react";
// import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFiltertAC,
    changeTodolistTitletAC,
    removeTodoListAC
} from "./state/todolists-reducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";

export type FilterValuesType = "all" | "completed" | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
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

    // let todolistId1 = v1();
    // let todolistId2 = v1();

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);





    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action)
        // let tasks = tasks[todolistId];
        // let filteredTasks = tasks.filter((task) => task.id != id)
        // tasks[todolistId] = filteredTasks;
        // setTasks({...tasks});
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFiltertAC(value, todolistId)
        dispatch(action)
    }
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists]);
        // }

    const addTask = (title:string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action)
        // let task = { id: v1(), title: title, isDone: false };
        // let tasks = tasks[todolistId];
        // let newTasks = [task, ...tasks];
        // tasks[todolistId] = newTasks;
        // setTasks({...tasks});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action)
        // let tasks = tasks[todolistId];
        // let task = tasks.find(t => t.id === taskId )
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action)
        // let todolisTasks = tasks[todolistId];
    //     //найдем нужную таску
    //     let task = todolisTasks.find(t => t.id === taskId )
    //     if (task) {
    //         task.title = newTitle
    //         setTasks({...tasks})
    //     }
    }


    let removeTodolist = (id: string) => {
        const action = removeTodoListAC(id);
        dispatch(action)

        // let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        // setTodolists([...filteredTodolist]);
        //
        // delete tasks[todolistId];
        // setTasks({...tasks});
    }

    const changeTodolistTitle = (id:string, title: string) => {
        const action = changeTodolistTitletAC(id, title);
        dispatch(action)
        // const todolist = todolists.find(tl => tl.id === id)
        // if (todolist) {
        //     todolist.title = newTitle;
        //     setTodolists([...todolists]);
        // }
    }




const addTodolist = (title: string) => {
        debugger
    const action = addTodolistAC(title);
    dispatch(action)
        // let todolist : TodolistType = {
        //     id: v1(),
        //     filter: 'all',
        //     title: title
        // }
        // setTodolists([todolist, ...todolists])
        // setTasks({...tasks,[todolist.id]:[]});
}

  return (
      <div className="app">
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                  >
                      <MenuIcon/>
                  </IconButton>
                  <Typography variant="h6">
                      News
                  </Typography>
                  <Button color={"inherit"}>Login</Button>
              </Toolbar>
          </AppBar>
          <Container>
              <Grid container style={ { padding: '20px'} }>
                  <AddItemForm addItem={addTodolist}/>
              </Grid>
              <Grid container spacing={3}>
                  {
                      todolists.map((tl) => {
                          let tasksTodolist = tasks[tl.id];
                          if (tl.filter === 'completed') {
                              tasksTodolist = tasksTodolist.filter((task: TaskType) => task.isDone === true);
                          }
                          if (tl.filter === 'active') {
                              tasksTodolist = tasksTodolist.filter((task: TaskType) => task.isDone === false);
                          }

                          return <Grid>
                              <Paper style={ { padding: '10px'} }>
                                  <Todolist
                                      key={tl.id}
                                      id={tl.id}
                                      title={tl.title}
                                      tasks={tasksTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      changeTaskTitle={changeTaskTitle}
                                      filter={tl.filter}
                                      removeTodolist={removeTodolist}
                                      changeTodolistTitle={changeTodolistTitle}
                                  />
                              </Paper>
                          </Grid>
                      })
                  }
              </Grid>
          </Container>
          {/*<Todolist title='Songs' tasks={tasks}  />*/}
      </div>
  )
}

 export default AppWithReducers
