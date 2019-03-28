import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  openDialog(){
  	const dialogRef = this.dialog.open(LoginComponent, {
  		width: '25em',
  		height: '30em'
  		// minHeight: '22em'
  	});


  	dialogRef.afterClosed().subscribe(result => {
  		console.log('The Login Dialog has been closed');
  	})
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
