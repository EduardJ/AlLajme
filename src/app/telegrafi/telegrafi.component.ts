import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-telegrafi',
  templateUrl: './telegrafi.component.html',
  styleUrls: ['./telegrafi.component.scss']
})
export class TelegrafiComponent implements OnInit {

  constructor(private fs: FsService) { }

  ngOnInit() {
  }

}
