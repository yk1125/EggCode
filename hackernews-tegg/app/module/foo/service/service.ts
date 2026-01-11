import { ContextProto,AccessLevel } from 'egg';

@ContextProto({ accessLevel: AccessLevel.PUBLIC})
export class HelloService {
  async hello(): Promise<string> {
    return 'hello';
  }
}

@ContextProto({
  name: 'worldInterface',
})
export class WorldService {
  async world(): Promise<string> {
    return 'world!';
  }
}