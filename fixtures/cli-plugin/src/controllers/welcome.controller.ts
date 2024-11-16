import { RpcController } from '@nailyjs/rpc'
import { WelcomeController } from '../common/welcome.protocol'

@RpcController(WelcomeController)
export class WelcomeControllerImpl implements WelcomeController {
  sayHello(): string {
    return 'Hello, World!'
  }
}
