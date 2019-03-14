import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-indeksonline',
  templateUrl: './indeksonline.component.html',
  styleUrls: ['./indeksonline.component.scss']
})
export class IndeksonlineComponent implements OnInit {

  constructor(private fs: FsService) { }

  ngOnInit() {
  }

}
