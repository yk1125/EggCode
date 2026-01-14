/* EventController.ts */
import { HTTPController ,Inject,HTTPMethod,HTTPMethodEnum} from "egg";
import { EventService } from "../service/event.js";

@HTTPController({path: '/'})
export default class EventController {
    @Inject()
    eventService: EventService;
    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/hello'
    })
    async helloEventHandler() {
        this.eventService.eventTest();
        this.eventService.eventTest2();
    }
}