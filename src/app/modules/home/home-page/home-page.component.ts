import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { Vote } from 'src/app/models/vote.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  lists: List[] = [];
  votes: number[] = [];
  userID: number;
  filterString: string = "";
  lastListNumber: number = 0;
  searchCategory: number = 1;
  categories: Category[];
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.userID = +localStorage.getItem("userID");
    this.listService.getCategories().subscribe(result => {
      this.categories = result;
    });
    this.listService.getHomePageLists(this.userID).subscribe(result => {
      this.lists = result;
    });
    this.lists.forEach(list => {
      list.items.sort((a, b) => {
        if (a.votes.length < b.votes.length) {
          return 1;
        }
        if (a.votes.length > b.votes.length) {
          return -1;

        } else {
          return 0;
        }
      });
    });
  }

  check(event, listID: number) {


    if (event.target.checked == true) {
      if (this.lastListNumber == listID || this.lastListNumber == 0) {
        this.lastListNumber = listID;
        this.votes.push(event.target.value);
      }
    } else {
      const index: number = this.votes.indexOf(event.target.value);
      if (index != -1) {
        this.votes.splice(index, 1);
      }
    }
  }

  voteList(list: List) {
    const voteList: Vote[] = [];
    this.votes.forEach(vote => {
      const stem: Vote = new Vote(0, vote, this.userID);
      voteList.push(stem);
    });
    voteList.forEach(vote => {
      this.listService.addVote(vote).subscribe(result => {
        var voteCount = list.items.find(x => x.itemID == vote.itemID);
        voteCount.votes.push(vote);
      });
    });
    this.lists = this.lists.filter(item => item !== list);
  }

  filterLists() {
    this.listService.filterLists(this.filterString, this.searchCategory).subscribe(result => {
      console.log(result);
      this.lists = result;
    });
  }
}
