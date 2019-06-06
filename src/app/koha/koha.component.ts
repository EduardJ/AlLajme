import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { DialogService } from '../core/dialog.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';



@Component({
  selector: 'app-koha',
  templateUrl: './koha.component.html',
  styleUrls: ['./koha.component.scss']
})
export class KohaComponent implements OnInit {

  constructor(public fs: FsService, private ds: DialogService, public auth: AuthService) {}

  ngOnInit() {
  }

}