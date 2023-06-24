import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user: any;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(res => this.user = res);
  }

  logout() {
      this.authenticationService.logout();
  }
}
