import { List } from './list.model';
import { Vote } from './vote.model';

export class Item {
   constructor(public itemID: number,
    public listID: number,
    public name: string,
    public description: string,
    public picture: string,
    public votes: Vote[]
    ){} 
}
