import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(public dialog: MatDialog) { }

  openDialog(){
  	const dialogRef = this.dialog.open(LoginComponent, {

  	});

  	dialogRef.afterClosed().subscribe(result => {
  		console.log('The Login Dialog has been closed');
  	})
  }
}
