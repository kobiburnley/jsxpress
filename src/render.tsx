
import * as React from "./create.element"
import {Constructor} from "./create.element"
import {Handler} from "express"

export interface MiddleProps {
  path?: string;
  onHandle?: Handler;
}

declare global {
  namespace JSX {
    type Element<P> = Constructor<P>
    interface IntrinsicElements {
      middle: MiddleProps
    }
  }
}


export function createRenderer(express: any) {
  function render<T>({type, props}: any) {
    let retVal: any
    switch (type) {
      case "middle":
        const children = getChildren(props)
        const handlers = [props.onHandle, ...Array.prototype.concat.apply([], children.map(render))].filter(e => e)
        if (props.path) {
          retVal = express.Router().use(props.path, handlers)
        } else {
          retVal = handlers
        }
        break
      default:
        const inst = createComponent(type)
        inst.props = props
        retVal = render(inst.render())
        break
    }
    return retVal
  }

  return render
}

function getChildren(props: { children?: any | any[] }) {
  return props.children ? props.children instanceof Array ? props.children : [props.children] : []
}

function createComponent(Ctor: any) {
  return new Ctor()
}


export class MethodMiddle {
  props: { method: string, onHandle: any }

  handle: Handler = (req, res, next) => {
    const {method, onHandle} = this.props
    if (req.method === method) {
      onHandle(req, res, next)
    } else {
      next()
    }
  }

  render() {
    const {onHandle, method, ...props} = this.props
    return <middle onHandle={this.handle} {...props} />
  }
}

export class Get {
  props: { onHandle: any, path: string }

  render() {
    return <MethodMiddle method={"GET"} {...this.props}/>
  }
}

export class Post {
  props: { onHandle: any, path: string }

  render() {
    return <MethodMiddle method={"POST"} {...this.props} />
  }
}
