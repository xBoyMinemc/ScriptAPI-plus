import EventSignal from "./EventSignal";
import {system,TickEvent} from "@minecraft/server"


const tick = new EventSignal();


const ticking = (event:TickEvent)=>(system.run(event=>ticking(event)),tick.trigger(event))

system.run(ticking)


export default tick
