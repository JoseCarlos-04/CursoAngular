import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TasklistComponent } from "./components/task/tasklist/tasklist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, TasklistComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  randomInt(): number{
    return Math.random()*10;
  }
}
