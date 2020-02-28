import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Swal, Toast } from '../common/swal';

@Component({
  selector: 'app-table-topbar',
  templateUrl: './table-topbar.component.html',
  styleUrls: ['./table-topbar.component.scss']
})
export class TableTopbarComponent implements OnInit {
  search: string = '';

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  onChange() {
    console.log(this.search);
  }

  onDelete(): void {
    const subject = this.userService.selected.length > 1 ? 'Users' : 'User';
    const message = `Selected ${subject.toLowerCase()} will be permanently deleted.`;

    Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(46, 100%, 54%)',
      cancelButtonColor: '#ddd',
      confirmButtonText: 'Yes, delete it!',
      preConfirm: async () => {
        try {
          await Promise.all(
            this.userService.selected.map(id => {
              this.userService.deleteUser(id).subscribe();
            })
          );
          return true;
        } catch (error) {
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Toast.fire({ icon: 'info', title: `${subject} successfully deleted` });
        this.userService.setSelected([]);
      }
    });
  }
}
