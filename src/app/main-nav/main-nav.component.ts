import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../core/login.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

	lajmetMap= {
		frontpage: 'FrontPage',
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

  constructor(private breakpointObserver: BreakpointObserver, private ls: LoginService, private authService: AuthService) {
    const userData = Observable.create(this.authService.userData);

    console.log(userData.uid);
  }

}
