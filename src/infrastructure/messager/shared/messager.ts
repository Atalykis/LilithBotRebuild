import { MessageOut } from './message-out';
import { MessageIn } from './message-in'

export type UserReactionFilter<T> = (emoji: string, userId: string) => Promise<T> | T

export interface Messager {
  sendOnChannel(channelId: string, message: MessageOut): Promise<MessageIn> 
  sendDm(userId: string, message : MessageOut): Promise<MessageIn> 
  waitUserReaction<T>(message: MessageIn, filter: UserReactionFilter<T>): Promise<T>
  tagUser(userId: string): string
}
