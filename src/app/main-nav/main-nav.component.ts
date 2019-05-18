import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { LoginService } from '../core/login.service';
import { AuthService } from '../core/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

 @ViewChild('drawer') drawer: MatSidenav;

	lajmetMap= {
		frontpage: 'Ballina',
		telegrafi: 'Telegrafi',
		koha: 'Koha',
		insajder: 'Insajder',
		indeksonline: 'Indeks Online',
		gazetaexpress: 'Gazeta Express'
	}
	
	objectKeys = Object.keys(this.lajmetMap);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private ls: LoginService, public authService: AuthService, router: Router) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a,b]) => b && a instanceof NavigationEnd)
    ).subscribe(_=> this.drawer.close());
  }



}
