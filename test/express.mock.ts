export class MockExpressRouter {
  routes: any = {}

  use(path: string, ...handlers: any[]) {
    this.routes[path] = this.routes[path] || []
    this.routes[path] = [...this.routes[path], ...handlers]
    return this
  }
}


export function express() {
  return new MockExpressRouter()
}

(express as any).Router = () => new MockExpressRouter()
