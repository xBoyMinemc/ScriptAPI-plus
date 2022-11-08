import { world, Player,Entity,MinecraftBlockTypes } from "@minecraft/server"
import EventSignal from './EventSignal'
class BeforePlayerSleepEventSignal extends EventSignal{}
class BeforePlayerSleepEvent {
    player?: Player | Entity;
    cancel = false;
}
const signal = new BeforePlayerSleepEventSignal();
world.events.beforeItemUseOn.subscribe(beforeItemUseOnEvent => {
    let block = beforeItemUseOnEvent.source.dimension.getBlock(beforeItemUseOnEvent.blockLocation);
    if(
       !beforeItemUseOnEvent.source.isSneaking
    && block?.typeId === MinecraftBlockTypes.bed.id
    && block?.dimension.id === "minecraft:overworld"
    && world.getTime() >= 13000 && world.getTime() <= 23456
    ) {
        let event = new BeforePlayerSleepEvent;
        // event.player = Array.from(world.getPlayers({name: beforeItemUseOnEvent.source.nameTag}))[0];
        event.player = beforeItemUseOnEvent.source;
        signal.trigger(event);
        beforeItemUseOnEvent.cancel = event.cancel;
    }
});

export {
    BeforePlayerSleepEventSignal,
    BeforePlayerSleepEvent,
    signal as beforePlayerSleep
}
export default signal
