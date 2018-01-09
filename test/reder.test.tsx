import * as React from "../src/create.element"
import {createRenderer} from "../src/render"
import {MyRouter} from "../example/my.router"
import {should} from "chai"
import {express} from "./express.mock"
should()

describe("render", function () {

  const render = createRenderer(express)
  const app = express()

  it("should", () => {
    app.use("root", render(<MyRouter/>));
    (typeof app.routes["root"][0].routes["/api"][0][0] === "function").should.be.true
  })
})
