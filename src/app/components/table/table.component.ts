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
export class TableList implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'worked', 'receive'];
  dataSource: MatTableDataSource<NurseData>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private nurseService : NursesService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.nurseService.getNurses().subscribe((nurses) => {
      this.dataSource = new MatTableDataSource(nurses);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
