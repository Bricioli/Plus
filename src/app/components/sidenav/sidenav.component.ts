import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, inject} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TableList } from "../table/table.component";

const NAV : string[]= [
  'Inicio',
  'Listar Tecnicos',
  'Novo cadastro',
  'Sair'
]

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, TableList],
})
export class Sidenav implements OnDestroy {
  title = 'Health Plus'
  mobileQuery: MediaQueryList;

  fillerNav = Array.from(NAV);


  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
