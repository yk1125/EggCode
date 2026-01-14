import 'egg';

declare module 'egg' {
  interface Events {
   
    'hello': (message: string) => Promise<void>;
    'hi': (message: string) => Promise<void>;
  }
}