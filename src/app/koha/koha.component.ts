import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-koha',
  templateUrl: './koha.component.html',
  styleUrls: ['./koha.component.scss']
})
export class KohaComponent implements OnInit {

  constructor(private fs: FsService) {}

  ngOnInit() {
  }

}