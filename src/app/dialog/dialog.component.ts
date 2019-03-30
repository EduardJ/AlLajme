import { Component, OnInit, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Inject } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
	
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialog,
  private ngZone: NgZone,
  private routes: Router
  ){}

  ngOnInit() {
  }

  closingAndGoToLink(link){
  	window.location.href = link;
  	// this.ngZone.run(() => {
  	// 	this.dialogRef.closeAll()
  	// 	this.routes.navigate([link]);
  	// })
  }
}
