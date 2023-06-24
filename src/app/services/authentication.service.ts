import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')|| '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value
  }

  login(username: any, password: any){
    return this.http.post<any>(`${environment.api}/users/authenticate`, {username, password})
    .pipe(map((user: User )=> {
      user.authData = window.btoa(username + ':' + password)
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user
    }))
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login'])
  }
}
