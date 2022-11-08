import {World} from "@xboyminemc/server-plus"
import entityDeadByHurt from "./entityDeadByHurt"
import { fishingHookSpawned, fishingHookDespawned } from "./fishingHookSpawned"
import playerJoined from "./playerJoined"
import playerJoining from "./playerJoining"
import tick from "./tick"
import beforePlayerSleep from "./beforePlayerSleep"






export default (world:World)=>{
    world.events.entityDeadByHurt = entityDeadByHurt
    world.events.fishingHookSpawned = fishingHookSpawned
    world.events.fishingHookDespawned = fishingHookDespawned
    world.events.playerJoined = playerJoined
    world.events.playerJoining = playerJoining
    if(!world.events.tick)world.events.tick = tick
    world.events.beforePlayerSleep = beforePlayerSleep

}
