import * as React from "../src/create.element"
import * as express from "express"
import {createRenderer} from "../src/render"
import {MyRouter} from "./my.router"

const renderer = createRenderer(express)
const app = express()

app.use(renderer(<MyRouter />))
const port = 8085
app.listen(port, () => {
  console.log(`listening at ${port}, try:
  http://localhost:${port}/api/hello
  http://localhost:${port}/api/admin/hello`)
})
