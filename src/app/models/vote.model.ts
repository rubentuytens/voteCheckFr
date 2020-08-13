import { Item } from './item.model';
import { User } from './user.model';

export class Vote {
    constructor(
        public voteID: number,
        public itemID: number,
        public userID: number
    ){}
}
