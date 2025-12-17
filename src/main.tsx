import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App'
import AppWithReducers from "./AppWithReducers.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";

createRoot(document.getElementById('root')!).render(<Provider store={store}><AppWithReducers /></Provider>)
