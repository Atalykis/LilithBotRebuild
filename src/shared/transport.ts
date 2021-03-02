import { Controller } from './controller'

export interface Transport {
  start(): void
  addController(controller: Controller): void
}