import { Component, NgModule, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { getSHA256Hash as hash } from 'boring-webcrypto-sha256';
import { NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    RouterModule,
    NgFor,
    NzFormModule,
    NzButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  validateForm: FormGroup<{
    email: FormControl<string>;
    pass: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    //FIXME Setting the default values to a valid admin is not recommended :)
    email: ['admin@admin.hu', [Validators.required]],
    pass: ['admin', [Validators.required]],
    remember: [true],
  });

  constructor(private fb: NonNullableFormBuilder) {
    //Login page should only be accessible to users who are not logged in already.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/game']);
    }
  }

  passChanged() {
    this.validateForm.controls['pass'].setErrors(null);
  }

  getUsers(): string[] {
    return this.authService.users();
  }

  async submitForm() {
    const {
      value: { pass, email },
    } = this.validateForm;

    hash(pass ?? '').then((hashedPass) => {
      const value = {
        email: email ?? '',
        pass: hashedPass,
      };

      this.authService.login(value).subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/game']);
        } else {
          this.validateForm.controls['pass'].setErrors({
            wrongPassword: true,
          });
        }
      });
    });
  }
}
