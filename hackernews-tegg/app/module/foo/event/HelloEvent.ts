import { Event,EventContext,} from "egg";

@Event('hello')
@Event('hi')
export class Handler {
  async handle(@EventContext() ctx: any,message: string): Promise<void> {
    console.log(ctx)
    console.log('Received event message:', message);
  }
}

