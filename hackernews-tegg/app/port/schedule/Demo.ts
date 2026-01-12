import { Inject, Logger } from 'egg';
import { IntervalParams, Schedule, ScheduleType } from 'egg/schedule';

@Schedule<IntervalParams>({
  type: ScheduleType.WORKER,
  /* worker 模式：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
all 模式：每台机器上的每个 worker 都会执行这个定时任务。 */
  scheduleData: {
    interval: 100, // 每 100ms 执行一次
    // interval: '5s', // 每 5s 执行一次
  },
},
{
    immediate: true, // 在应用启动并 ready 后立刻执行一次
    // disable: true, // 为 true 时，定时任务不会被启动
    env: ['devserver', 'test'], // 仅在线下环境运行
  },
)
export class IntervalScheduler {
  @Inject()
  private logger: Logger;
    //必须是这个命名
  async subscribe() {
    this.logger.info('schedule called');
  }
}