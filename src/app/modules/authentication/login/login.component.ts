import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserLogin } from 'src/app/models/userLogin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newUser: User = new User(0, "", "", "", "");
  loginUser: UserLogin = new UserLogin("", "");
  submitted: boolean = false;
  confirmPassword = "";

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.newUser.password == this.confirmPassword && this.newUser.password != "" && this.confirmPassword != "") {
      this.submitted = true;
      this.userService.addUser(this.newUser).subscribe(result => {
        console.log(result);
      });
    }
  }

  async onLogin() {
    try {
      const result = await this.userService.authenticate(this.loginUser);
      console.log(result);
      this.router.navigate([""]);
    } catch (error) {
      if (error.statusText == "Bad Request") {
        console.log("error");
      }
    }
  }
}
