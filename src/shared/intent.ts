export interface Intent {
  reply(answer: string): void;
  getArg(i: number): string | undefined;
  getCommand(): string;
  getUserId(): string;
}