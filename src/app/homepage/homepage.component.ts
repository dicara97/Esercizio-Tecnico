import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loading = false;
  user!: User

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.loading = false;
      this.authenticationService.user.subscribe(res => this.user = res);

  }

}
