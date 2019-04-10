import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../core/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService, private ls: LoginService) { }

  ngOnInit() {
  }

  //test function to see if we are gettin the right data returned
  // testGetLoggedIn(){
  // 	if (this.authService.getIsLoggedIn()) {
		// console.log('you are logged in');
  // 	} else {
  // 		console.log('you are not logged in');
  // 	}
  // }

}
