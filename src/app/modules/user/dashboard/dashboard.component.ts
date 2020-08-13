import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { Vote } from 'src/app/models/vote.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lists: List[] = [];
  inactiveLists: List[] = [];
  votedLists: List[] = [];
  votes: number[] = [];
  userID: number;
  lastListNumber: number = 0;
  categories: Category[];

  constructor(private router: Router, private listService: ListService) { }

  ngOnInit() {
    this.userID = +localStorage.getItem("userID");
    this.listService.getCategories().subscribe(result => {
      this.categories = result;
    });

    this.listService.getListsByUser(this.userID).subscribe(result => {
      result.forEach(r => {
        if (r.active == true) {
          this.lists.push(r);
        } else {
          this.inactiveLists.push(r);
        }
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

        })
      });

      this.inactiveLists.forEach(list => {
        list.items.sort((a, b) => {
          if (a.votes.length < b.votes.length) {
            return 1;
          }
          if (a.votes.length > b.votes.length) {
            return -1;
          } else {
            return 0;
          }
        })
      });
    });

    this.listService.getVotedLists(this.userID).subscribe(result => {
      this.votedLists = result;
    });
  }

  addList() {
    this.router.navigate(["/newlist"]);
  }

  

 

  closeList(list: List) {
    list.active = false;
    this.listService.inActiveList(list).subscribe(result => {
      const index = this.lists.indexOf(list);
      this.lists.splice(index, 1);
      this.inactiveLists.push(list);
    });

  }
  onSubmit() {
  }
}
