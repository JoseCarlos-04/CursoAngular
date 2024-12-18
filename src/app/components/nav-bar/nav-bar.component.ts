import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private servicelog: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.servicelog.isAuthenticated;
  }

  logout(){
    this.servicelog.logout().then( () => this.router.navigate(['/login']))
      .catch(error=>console.log(error))
  }
}
