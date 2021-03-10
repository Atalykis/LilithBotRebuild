export interface MessageIn {
  getUserId(): string;
  getChannelId(): string;
  getMessageId(): string;
}