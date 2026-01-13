import tracerPlugin from '@eggjs/tracer';
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  ...tracerPlugin(),
}

export default plugin;