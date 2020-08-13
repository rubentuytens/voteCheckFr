import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Item } from 'src/app/models/item.model';
import { ListService } from 'src/app/services/list.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.scss']
})
export class NewlistComponent implements OnInit {
  newList: List = new List(0, "", "", null, null, null, null, true, 0);
  newItem: Item = new Item(0, null, "", "", "", null);
  newCategory: Category = new Category(0, "");

  newItems: Item[] = [];

  categories: Category[];
  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {
    this.listService.getCategories().subscribe(result => {
      this.categories = result;
      console.log(this.categories);
    });
  }

  addList() {
    this.newList.userID = +localStorage.getItem("userID");
    if (this.newList.categoryID == 0 || this.newList.categoryID == null) {
      this.listService.addCategory(this.newCategory).subscribe(result => {
        this.newList.categoryID = result.categoryID;

        this.listService.addList(this.newList).then(result => {
          this.newItems.forEach(element => {
            element.listID = result.listID;
          }
          );
          this.listService.addItems(this.newItems).then(result => {
            console.log(result);
          });
          this.router.navigate(["/dashboard"]);
        });
      });
    } else {
      this.listService.addList(this.newList).then(result => {
        this.newItems.forEach(element => {
          element.listID = result.listID;
        }
        );
        this.listService.addItems(this.newItems).then(result => {
          console.log(result);
        });
        this.router.navigate(["/dashboard"]);
      });
    }
  }

  addItem() {
    var newItem: Item = new Item(0, null, this.newItem.name, this.newItem.description, "", null);
    this.newItems.push(newItem);
    this.newItem.name = "";
    this.newItem.description = "";
  }
  onSubmit() {

  }
}
