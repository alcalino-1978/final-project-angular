import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { StorageService } from '@shared/services/storage.service';
import { passwordPattern, emailRegx } from '@utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public strength = 0;

  public userLoginForm!: FormGroup;
  public emailFormControl!: FormControl;
  public passwordFormControl!: FormControl;
  public passwordRepeatFormControl!: FormControl;

  public isSubmitted: boolean = false;
  public isLoading: boolean = false;

  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];

	constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
    ) {}


	ngOnInit() {
    this.initForm();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  private initForm(): void {
    // FormGroup
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    }),

    // FormControls
    this.emailFormControl = this.userLoginForm.get('email') as FormControl;
    this.passwordFormControl = this.userLoginForm.get('password') as FormControl;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.userLoginForm);

    if (this.userLoginForm.valid) {
      this.isLoading = true;

      const user = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      }

      console.log(user);
      this.authService.login(user.email, user.password).subscribe({
        next: response => {
          this.storageService.saveUser(response.data.user);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log(response)
          this.router.navigate(['/profile']);
          // this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.log(err.error.message)
          this.isLoginFailed = true;
        }
      });
      setTimeout(() => {
        this.userLoginForm.reset();
        this.isLoading = false;
      }, 3000);
    }
  }
}
