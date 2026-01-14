import { SingletonProto,EventBus,Inject } from "egg";

@SingletonProto()
export class EventService {
    @Inject()
    eventBus: EventBus;

    async eventTest() {
        // 发布事件
        this.eventBus.emit('hello', 'This is a hello event message');
    }
    async eventTest2() {
        // 发布事件
        this.eventBus.emit('hi', 'This is another hi event message');
    }
}