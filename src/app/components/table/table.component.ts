// import { UserData } from './table.component';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NursesService } from '../../services/nurses.service';


export interface NurseData {
  name: string;
  birthday: string;
  cpf: string;
  coren: string;
  adress: string;
  phone: string;
  email: string;
  pix: string;
  worked: string;
  receive: number;
}

@Component({
  selector: 'table-list',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatToolbarModule],
})
export class TableList implements OnInit {
  displayedColumns: string[] = ['name', 'worked', 'receive'];
  dataSource: NurseData[] = [];

  constructor(private nurseService: NursesService) {
  }
  ngOnInit(): void {
    this.nurseService.getNurses().subscribe((nurses) => {
      this.dataSource = nurses;
    })
  }
}
