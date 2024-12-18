import { Component } from '@angular/core';
import {FooterComponent} from "../../../components/footer/footer.component";
import {NavBarComponent} from "../../../components/nav-bar/nav-bar.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {passwordMatchValidator} from './signin.validators';

@Component({
  selector: 'app-signin',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formSignin: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerservice: AuthService, private router: Router) {
    this.formSignin = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: passwordMatchValidator});
  }

  Onsubmit() {
    if (this.formSignin.valid) {
      console.log("Formulario Valido")
      this.registerservice.register(this.formSignin.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login'])
        })
        .catch(error => console.log(error))
    }
  }
}
