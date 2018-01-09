
export type Constructor<T> = new(...args: any[]) => T

export interface HasProps<P> {
  props: P
}

export function createElement(type: "middle", props: {x: string}, ...children: any[]): any
export function createElement<P>(type: Constructor<HasProps<P>>, props: P, ...children: any[]): any

export function createElement(type: any, props: any, ...children: any[]) {
  props =  {...props, children}
  return {type, props}
}
