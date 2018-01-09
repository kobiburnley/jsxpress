
import * as React from "../src/create.element"
import {Get} from "../src/render"
import {MyHandler} from "./handler"

export class Hello {
  helloRequest: MyHandler = (req, res, next) => {
    res.json({
      message: "hello!",
      user: req.user
    })
  }


  adminHelloRequest: MyHandler = (req, res, next) => {
    res.json({
      message: "hello admin!",
      user: req.user
    })
  }

  adminOnly: MyHandler = async (req, res, next) => {
    if (req.user.admin) {
      next()
    } else {
      res.sendStatus(403)
    }
  }

  render() {
    return <middle>
      <Get path="/hello" onHandle={this.helloRequest}/>

      <middle path="/admin" onHandle={this.adminOnly}>
        <Get path="/hello" onHandle={this.adminHelloRequest}/>
      </middle>
    </middle>
  }
}