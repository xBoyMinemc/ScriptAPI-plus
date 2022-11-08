import { world, Player } form "@minecraft/server"
import { EventSignal } from './EventSignal'
export class BeforePlayerSleepEventSignal {}
export class BeforePlayerSleepEvent {
    player?: Player;
    cancel = false;
}
export default const signal = new BeforePlayerSleepEventSignal();
world.beforeItemUseOn.subscribe(arg => {
    let block = arg.source.dimension.getBlock(arg.blockLocation);
    if(!arg.source.isSneaking
    && block?.typeId === MinecraftBlockTypes.bed.id
    && block?.dimension.id === "minecraft:overworld"
    && world.getTime() >= 13000 && world.getTime() <= 23456) {
        let event = new BeforePlayerSleepEvent;
        event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
        signal.trigger(event);
        arg.cancel = event.cancel;
    }
});

export {
    BeforePlayerSleepEventSignal,
    BeforePlayerSleepEvent,
    signal as beforePlayerSleep
}
