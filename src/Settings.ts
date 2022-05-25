import { DEFAULT_VOLUME } from "./Constants";

export class Settings{
    public volume:number;

    constructor(){
        this.volume = DEFAULT_VOLUME;
    } 

    update(value:number):void{
        this.volume = value/10;
    }
}