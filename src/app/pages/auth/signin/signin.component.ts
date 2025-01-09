import { Component } from '@angular/core';
import {FooterComponent} from "../../../components/footer/footer.component";
import {NavBarComponent} from "../../../components/nav-bar/nav-bar.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Person, Role} from '../../../models/person.models';
import {PersonService} from '../../../services/person.service';

@Component({
  selector: 'app-signin',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formSignin: FormGroup;

  constructor(private personService: PersonService, private formBuilder: FormBuilder, private registerservice: AuthService, private router: Router) {
    this.formSignin = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]});
  }

  Onsubmit() {
    if (this.formSignin.valid) {
      console.log("Formulario Valido")
      this.registerservice.register(this.formSignin.value)
        .then(response => {
          let name = this.formSignin.get("name")?.value;
          let surname = this.formSignin.get("lastName")?.value;
          let email = this.formSignin.get("email")?.value;
          let admin = this.formSignin.get("admin")?.value;
          let role = admin ? Role.ADMIN : Role.USER;
          let now = new Date().toDateString();

          let personRegister: Person = new Person(response.user.uid, name, surname, email!, role, now);

          this.personService.savePerson(personRegister);

          console.log(response);
          this.router.navigate(['/login'])
        })
        .catch(error => console.log(error))
    }
  }
}
