import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { DialogService } from '../core/dialog.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-telegrafi',
  templateUrl: './telegrafi.component.html',
  styleUrls: ['./telegrafi.component.scss']
})
export class TelegrafiComponent implements OnInit {

  constructor(public fs: FsService, private ds: DialogService, public auth: AuthService) { }

  ngOnInit() {
  }

}
