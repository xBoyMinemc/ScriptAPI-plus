import EventSignal from "./EventSignal";
import {system,world} from "@minecraft/server"


const tick = new EventSignal();


const ticking = (event)=>(system.run(event=>ticking(event)),tick.trigger(event))

system.run(ticking)


export default tick
