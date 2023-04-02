import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/services/models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private location: Location, private fb: FormBuilder, private toastr: ToastrService, private authService: AuthenticationService, private router: Router) { 
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    }, 
    {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }


  passwordMatchValidator(signupForm: FormGroup) {
    const password = signupForm.get('password');
    const confirmPassword = signupForm.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSignUp(): void {
    try {
      const payload: User = {
        id: uuidv4(),
        name: this.signupForm?.get('email')?.value?.split('@')[0],
        email: this.signupForm?.get('email')?.value,
        password: this.signupForm?.get('password')?.value,
        phoneNumber: this.signupForm?.get('phone')?.value,
        dateOfBirth: this.signupForm?.get('dateOfBirth')?.value,
      }
        this.authService.createUser(payload)
        this.router.navigate(['/login']);
        this.toastr.success('Signup successfully');
    } catch(err) {
      this.toastr.error('Failed to signup! please try again.');
    }
  }
}
