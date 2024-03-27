import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(
    private _jantekService: JantekService,
    private router: Router,
  ) {}

  /** Checks if login is valid and reroutes to pc-punch-configuration page */
  onLogin() {
    this._jantekService.getPunchConfiguration();
    if (this.loginForm.valid) {
      if (this._jantekService.login(this.loginForm.value)) {
        this.router.navigate(['/pc-punch-configuration'])
      }
    }
    this.loginForm.reset();
  }
}
