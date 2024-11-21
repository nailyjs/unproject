import { RpcController } from '@nailyjs/rpc'
import { DebugController } from '../common/debug.protocol'

@RpcController(DebugController)
export class DebugControllerImpl implements DebugController {
}
