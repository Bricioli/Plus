import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';



/** @title Sidenav open & close behavior */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.scss',
  standalone: true,
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, MatIconModule, MatListModule],
})
export class Sidenav {
  events: string[] = [];
  opened: boolean = false;

}
