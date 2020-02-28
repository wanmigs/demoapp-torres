import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.fetchUsers().subscribe();
  }

  filterUsers(): User[] {
    const search = this.userService.search;

    if (!search) {
      return this.userService.users;
    }

    const regex = new RegExp(search, 'gi');

    return this.userService.users.filter(
      user =>
        user.user_fullname.match(regex) ||
        user.user_email.match(regex) ||
        user.user_address.match(regex)
    );
  }
}
