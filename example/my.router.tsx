import * as React from "../src/create.element"
import {MyHandler} from "./handler"
import {Hello} from "./hello"

export class MyRouter {
  auth: MyHandler = async (req, res, next) => {
    req.user = {name: "Awesome User", admin: Math.random() > 0.5}
    next()
  }

  render() {
    return <middle path="/api" onHandle={this.auth}>
      <Hello />
    </middle>
  }
}
