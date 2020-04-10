import { Component, Injectable } from '@angular/core';
import { onMainContentChange } from 'src/app/animations/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  animations: [onMainContentChange]
})
export class AdminNavComponent {

  public onSideNavChange: boolean;
  seletedMenu: string

  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe(res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }

}

@Injectable()
export class SidenavService {

  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { }

}

