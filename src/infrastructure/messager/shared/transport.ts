
export interface Transport {
  start(): void
  addController(controller: any): void
}