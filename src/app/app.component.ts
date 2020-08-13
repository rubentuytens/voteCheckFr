import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HerexamenProject';
  constructor(public userService: UserServiceService) { }

  logout() {
    this.userService.logout();
  }
}
