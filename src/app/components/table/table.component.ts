// import { UserData } from './table.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NursesService } from '../../services/nurses.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




export interface NurseData {
  id : string;
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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class TableList implements OnInit {
  displayedColumns: string[] = ['name', 'worked', 'receive'];
  dataSource: MatTableDataSource<NurseData>


  constructor(private nurseService: NursesService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.nurseService.getNurses().subscribe((nurses) => {
      this.dataSource = new MatTableDataSource(nurses);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(nav : string, id : string) {
    console.log(id);
    if (nav === "new") { this.router.navigate(["home/new-nurse"]); }
    else if (nav === "info") { this.router.navigate(["home/nurse-info", {id}]); }

  }
}
