import EventSignal from "./EventSignal";
import { world, Player } from "@minecraft/server";

const debug = false;

const runCmd = (()=>{
    const overworld = world.getDimension("minecraft:overworld");
    return (cmd : string)=>{ overworld.runCommandAsync(cmd); };
})();

class PlayerJoiningEventSignal extends EventSignal { }
class PlayerJoiningEvent {
    player : Player;
    constructor(player : Player){
        Object.defineProperty(this, "player", {
            value: player,
            writable: false,
            enumerable: true
        });
    }
    set cancel(bool : boolean){
        if (bool){
            runCmd(`kick "${this.player.name}"`);
        }
    }
}

const signal = new PlayerJoiningEventSignal();

const fireEvent = (player: Player)=>{
    const event = new PlayerJoiningEvent(player);
    signal.trigger(event);
};

world.events.playerJoin.subscribe((event)=>{
    fireEvent(event.player);
});

//在这里导出的，得用import { xxxx } from xxxxx导入
export {
    PlayerJoiningEvent, //事件类
    PlayerJoiningEventSignal, //事件信号类
    signal as playerJoining //事件信号
};
//其实也可以直接import xxxxx from xxxx导入
export default signal;

if (debug){
    const send = (msg : string)=>{ runCmd(`say ${msg}`); };
    
    signal.subscribe((event : PlayerJoiningEvent)=>{
        send(`${event.player.name} 正在加入游戏`);
    });
}
