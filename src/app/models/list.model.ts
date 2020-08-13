import { Item } from './item.model';
import { User } from './user.model';

export class List {
    constructor(
        public listID: number,
        public name: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public userID: number,
        public items: Item[],
        public active: boolean,
        public categoryID: number
    ){}
}
