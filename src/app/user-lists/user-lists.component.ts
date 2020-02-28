import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";

import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-lists",
  templateUrl: "./user-lists.component.html",
  styleUrls: ["./user-lists.component.scss"]
})
export class UserListsComponent implements OnInit {
  selected: Array<string> = [];
  @Input() users: User[] = [];
  @Output() toggleSelect = new EventEmitter();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.selected = this.userService.getSelected();
  }

  onToggleSelect(evt): void {
    this.selected = evt.target.checked
      ? [...this.users.map(user => user._id)]
      : [];

    this.userService.setSelected(this.selected);
  }

  onSelect(evt, id): void {
    if (evt.target.checked) {
      this.selected.push(id);
    } else {
      let index = this.selected.indexOf(id);
      this.selected.splice(index, 1);
    }
    this.userService.setSelected(this.selected);
  }
}
