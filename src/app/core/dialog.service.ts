import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(id, img_url, subject, lajme_link, article, organizata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60em',
      height: '95%',
      autoFocus: false,
      position:{top: '1em'},
      data: {
        'id' : id,
        'img_url': img_url,
        'subject' : subject,
        'lajme_link': lajme_link,
        'article': article,
        'organizata': organizata
      }

    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
