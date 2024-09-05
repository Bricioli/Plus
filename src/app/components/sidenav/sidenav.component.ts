import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableList } from "../table/table.component";
import { Router, RouterOutlet } from '@angular/router';



/** @title Responsive sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, TableList, RouterOutlet],
})
export class Sidenav implements OnDestroy {
  title = 'Health Plus'
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  constructor(private router: Router) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    sessionStorage.removeItem('auth-token');
    this.router.navigate(["login"]);
  }
  navigate(where: string): void {
    if (where === "home") { this.router.navigate(["home/list"]); }
    else if (where === "new-user") { this.router.navigate(["home/new-user"]); }
  }
}
