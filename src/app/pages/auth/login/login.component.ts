import { Component } from '@angular/core';
import {FooterComponent} from '../../../components/footer/footer.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from '../../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin : FormGroup;

  constructor(formBuilder: FormBuilder, private loginservice:AuthService, private router: Router) {
    this.formLogin = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  Onsubmit(){
    if (this.formLogin.valid) {
      console.log("El login es valido")
      this.loginservice.login(this.formLogin.value)
        .then(response => this.router.navigate(['/home']))
        .catch(error => console.log(error))
      console.log(this.loginservice.isAuthenticated)
    } else {
      console.log("El login es invalido")
    }
  }

  loginWithGoogle() {
    this.loginservice.loginWithGoogle()
      .then(response => this.router.navigate(['/home']))
      .catch(error => console.log(error));
  }
}
