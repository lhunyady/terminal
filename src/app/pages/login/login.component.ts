import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { getSHA256Hash as hash } from 'boring-webcrypto-sha256';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    //Login page should only be accessible to users who are not logged in already.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/game']);
    }
  }

  //FIXME do not make a valid users email and pass the default value for the inputs :)
  protected loginForm = new FormGroup({
    email: new FormControl('admin@admin.hu', [
      Validators.required,
      Validators.email,
    ]),
    pass: new FormControl('admin', [Validators.required]),
  });

  async onSubmit() {
    const { valid, value: valueWithPlainPass } = this.loginForm;

    hash(valueWithPlainPass.pass ?? '').then((hashedPass) => {
      const value = {
        email: valueWithPlainPass.email ?? '',
        pass: hashedPass,
      };

      if (valid) {
        this.authService.login(value).subscribe((data: boolean) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/game']);
          }
        });
      }
    });
  }
}
