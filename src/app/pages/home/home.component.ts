import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Sidenav } from "../../components/sidenav/sidenav.component";
import { TableList } from '../../components/table/table.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Sidenav, TableList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Health Plus'


  adjustHome(){
    const element = document.querySelector("#container");
    console.log(element);
  }
}



