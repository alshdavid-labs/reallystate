import { Subject, Subscription } from 'rxjs'
import { DevTools } from '../engine'

export class MockDevtools implements DevTools {
  onevent = new Subject()
  $ = new Subscription()

  constructor(
    private spies: any = {}
  ) {}

  connect(): DevTools {
    if (this.spies.connectSpy) {
      this.spies.connectSpy()
    }
    return this
  }  
  
  send(action: string, state: any): void {
    if (this.spies.sendSpy) {
      this.spies.sendSpy(action, state)
    }
    this.$.add(this.onevent.next({ action, state }))
  }

  subscribe(cb: (data: any) => void): void {
    if (this.spies.subscribeSpy) {
      this.spies.subscribeSpy(cb)
    }
    this.onevent.subscribe(cb)
  }
  
  init(value: any): void {
    if (this.spies.initSpy) {
      this.spies.initSpy(value)
    }
  }
  
  destroy() {
    this.$.unsubscribe()
  }
}