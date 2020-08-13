import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserLogin } from '../models/userLogin.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private isLoggedin = new BehaviorSubject(false);
  public isLoggedin$ = this.isLoggedin.asObservable();
  userID = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem("userID");
    this.isLoggedin.next(token ? true : false);
    this.userID.next(Number(this.userID));
  }

  addUser(user: User) {
    console.log(user);
    return this.httpClient.post("https://localhost:5001/api/Users", user);
  }

  async authenticate(userLogin: UserLogin): Promise<User> {
    const result = await this.httpClient.post<User>("https://localhost:5001/api/user/authenticate", userLogin).toPromise();
    this.isLoggedin.next(result.token ? true : false);
    localStorage.setItem("token", result.token);
    localStorage.setItem("userID", result.userID.toString());
    return result;
  }
  async getMe(): Promise<User> {
    return this.httpClient.get<User>("https://localhost:5001/api/Users/me").toPromise();
  }

  async logout() {
    localStorage.clear();
    this.isLoggedin.next(false);
    this.userID.next(0);

  }
}
