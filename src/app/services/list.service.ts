import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  async addList(newList: List){
    return this.http.post<List>("https://localhost:5001/api/lists", newList).toPromise();
  }

  async addItems(newItems: Item[]) {
    return this.http.post<Item[]>("https://localhost:5001/api/items/new", newItems).toPromise();
  }

  getListsByUser(userID: number): Observable<List[]> {
    return this.http.get<List[]>("https://localhost:5001/api/lists/user/" + userID);
  }
  
  getHomePageLists(userID: number): Observable<List[]> {
    return this.http.get<List[]>("https://localhost:5001/api/lists/home/" + userID);
  }
  
  getVotedLists(userID: number): Observable<List[]> {
    return this.http.get<List[]>("https://localhost:5001/api/votes/lists/" + userID);
  }

  inActiveList(list: List) {
    return this.http.put("https://localhost:5001/api/lists/" + list.listID, list);
  }

  addVote(vote: Vote) {
    return this.http.post("https://localhost:5001/api/votes", vote);
  }


  filterLists(str: string, category : number): Observable<List[]> {
    return this.http.get<List[]>("https://localhost:5001/api/lists/filter/" + str + "/" + category );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("https://localhost:5001/api/categories");
  }
  
  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>("https://localhost:5001/api/categories", newCategory);
  }
}
