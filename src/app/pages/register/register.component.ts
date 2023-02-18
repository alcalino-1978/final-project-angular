import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { StorageService } from '@shared/services/storage.service';
import { passwordPattern, emailRegx } from '@utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public strength = 0;

  public userLoginForm!: FormGroup;
  public nameFormControl!: FormControl;
  public lastNameFormControl!: FormControl;
  public emailFormControl!: FormControl;
  public phoneNumberFormControl!: FormControl;
  public passwordFormControl!: FormControl;
  public passwordRepeatFormControl!: FormControl;

  public isSubmitted: boolean = false;
  public isLoading: boolean = false;

  public isSuccessful = false;
  public isSignUpFailed = false;
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';

	constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
    ) {}


	ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    // FormGroup
    this.userLoginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(9)]],
    }),

    // FormControls
    this.nameFormControl = this.userLoginForm.get('name') as FormControl;
    this.lastNameFormControl = this.userLoginForm.get('lastName') as FormControl;
    this.emailFormControl = this.userLoginForm.get('email') as FormControl;
    this.passwordFormControl = this.userLoginForm.get('password') as FormControl;
    this.phoneNumberFormControl = this.userLoginForm.get('phoneNumber') as FormControl;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.userLoginForm);

    if (this.userLoginForm.valid) {
      this.isLoading = true;

      const user = {
        name: this.nameFormControl.value,
        lastName: this.nameFormControl.value,
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
        phoneNumber: this.phoneNumberFormControl.value,
      }

      // console.log(user);
      this.authService.register(user.email, user.lastName, user.email, user.password, user.phoneNumber).subscribe({
        next: response => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.storageService.saveUser(response.data.userDb);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // console.log(response)
          this.router.navigate(['/profile']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
      setTimeout(() => {
        this.userLoginForm.reset();
        this.isLoading = false;
      }, 3000);
    }
  }
}
