import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private location: Location, private fb: FormBuilder, 
    private authenticationService: AuthenticationService, private toaster: ToastrService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      
     }

  ngOnInit(): void {
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup'])
  }

  goBack(): void {
    this.location.back();
  }

  onSignIn(): void {
    const payload = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value
    }
    this.authenticationService.authenticateUser(payload) ? this.router.navigate(['/profile']): this.toaster.error('Invalid Credentials!');
  }
}
