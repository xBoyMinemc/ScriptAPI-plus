import { world } from "@minecraft/server"
import EventSignal from "./EventSignal"
import {EntityDeadByHurtEvent,EntityDeadByHurtEventSignal} from "@xBoyMinemc/server-plus"
  
const entityDeadByHurt : EntityDeadByHurtEventSignal = new EventSignal()



world.events.entityHurt.subscribe(event=>
  event.hurtEntity.getComponent("minecraft:health").current<=0
  ?
  entityDeadByHurt.trigger(event)
  :
  0
)


const test = (event : EntityDeadByHurtEvent)=>event.hurtEntity.dimension.runCommandAsync("me "+(event.hurtEntity.nameTag === '' ? event.hurtEntity.typeId : event.hurtEntity.nameTag)+"#x=>"+event.hurtEntity.location.x+"#y=>"+event.hurtEntity.location.y+"#z=>"+event.hurtEntity.location.z +"被杀死"+"\u000a触发自事件world.events.entityDeadByHurt" )

entityDeadByHurt.subscribe(event=>test(event))



export default  entityDeadByHurt