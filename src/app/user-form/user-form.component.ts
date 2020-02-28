import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { Toast } from '../common/swal';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  userId: string = null;
  user: User = {
    user_fullname: '',
    user_email: '',
    user_address: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      if (!this.userId) {
        return;
      }

      this.userService
        .getuser(this.userId)
        .subscribe(user => (this.user = user));
    });
    this.userForm = this.formBuilder.group({
      user_fullname: [this.user.user_fullname, Validators.required],
      user_email: [
        this.user.user_email,
        [Validators.required, Validators.email]
      ],
      user_address: [this.user.user_fullname, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      Toast.fire({ icon: 'error', title: `Opps, something wasn't right!` });
      return;
    }

    const method = this.userId ? 'updateUser' : 'addUser';

    this.userService[method](this.user as User).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
