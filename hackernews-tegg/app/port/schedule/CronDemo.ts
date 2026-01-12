import { Inject, Logger } from 'egg';
import { CronParams, Schedule, ScheduleType } from 'egg/schedule';

@Schedule<CronParams>({
  type: ScheduleType.WORKER,
  scheduleData: {
    // 每日 3 点执行一次
    cron: '0 0 3 * * *',
    // 每 5 秒执行一次
    // cron: '*/5 * * * * *',
    /* test：如果是每周一的八点 那就是 '0 0 20 * * 1'
    每一小时一次 那就是 '0 0 * * * *' 
    */
  },
})
export class CronSubscriber {
  @Inject()
  private logger: Logger;

  async subscribe() {
    this.logger.info('schedule called');
  }
}