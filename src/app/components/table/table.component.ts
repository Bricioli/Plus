// import { UserData } from './table.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NursesService } from '../../services/nurses.service';
import { DataSource } from '@angular/cdk/collections';
import { tap } from 'rxjs';

export interface UserData {
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

export interface UserData2 {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'table-list',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class TableList implements AfterViewInit {
  displayedColumns: string[] = ['name', 'worked', 'receive'];
  dataSource!: MatTableDataSource<UserData>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private nursesService: NursesService) {
    // this.dataSource = new MatTableDataSource<UserData>()
    this.loadNursesData();
  }
  loadNursesData() {
    this.fetchNurses().then(dataSource => {
      console.log(dataSource)
      return this.dataSource = dataSource;
    }).catch(error => {
      console.error('Error loading nurses:', error);
    });
  }

  async fetchNurses(): Promise<MatTableDataSource<UserData>> {
    try {
      const nurses = await this.nursesService.nurses().toPromise();
      return new MatTableDataSource(nurses as UserData[]);
    } catch (error) {
      console.error('Error fetching nurses:', error);
      return new MatTableDataSource<UserData>(); // Retorna uma tabela vazia em caso de erro
    }
  }
  ngAfterViewInit() {
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData2 {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
