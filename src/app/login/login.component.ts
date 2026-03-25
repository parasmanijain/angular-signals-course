import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  // TypeScript 6.0: Enhanced form with proper typing for exactOptionalPropertyTypes
  form = this.fb.group({
    email: [null as string | null],
    password: [null as string | null],
  });

  messagesService = inject(MessagesService);

  authService = inject(AuthService);

  router = inject(Router);

  // TypeScript 6.0: Enhanced login method with proper null checking
  async onLogin() {
    try {
      const { email, password } = this.form.value;

      // TypeScript 6.0: Enhanced null/undefined checking for exactOptionalPropertyTypes
      if (
        !email ||
        !password ||
        email.trim() === '' ||
        password.trim() === ''
      ) {
        this.messagesService.showMessage(
          'Enter an email and password.',
          'error',
        );
        return;
      }

      await this.authService.login(email.trim(), password.trim());
      await this.router.navigate(['/home']);
    } catch (err) {
      console.error(err);
      this.messagesService.showMessage(
        'Login failed, please try again',
        'error',
      );
    }
  }
}
