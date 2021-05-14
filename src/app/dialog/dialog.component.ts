import { Component, OnInit, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from '../core/keyframes';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialogAnimator', [
      transition('* => rotateOutUpRight', animate(3000, keyframes(kf.rotateOutUpRight))),
      transition('* => wobble', animate(1000, keyframes(kf.wobble)))
    ])
  ]
})

export class DialogComponent implements OnInit {
	
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialog,
  private ngZone: NgZone,
  private routes: Router
  ){}

  ngOnInit() {
  }

  // onSwipe(evt) {
  // }

  //after clickin the close butten thw whole page will link to the link of the news
  closingAndGoToLink(link){
  	this.dialogRef.closeAll();
  	console.log(link);
  	window.location.href = link;
  }

  animationState: string;

  startAnimation(state) {
    // if (!this.animationState) {
    //   this.animationState = state;
    // }
    console.log('swiped right');
    this.dialogRef.closeAll()
  }
  
}
