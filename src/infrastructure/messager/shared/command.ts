import { MessageIn } from "./message-in"

export interface Command extends MessageIn {
    getArg(i: number): string
    getCommand(): string;
}