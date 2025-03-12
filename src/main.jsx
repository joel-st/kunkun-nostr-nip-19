import { render } from "preact"
import { App } from "./App.jsx"
import "./index.css"
import { Provider } from 'unistore/preact'
import { store } from '@store'

render(<Provider store={store}><App /></Provider>, document.getElementById("root"))
