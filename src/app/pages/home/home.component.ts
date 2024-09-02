import { Component } from '@angular/core';
import { Sidenav } from "../../components/sidenav/sidenav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Sidenav],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Health Plus'
}
