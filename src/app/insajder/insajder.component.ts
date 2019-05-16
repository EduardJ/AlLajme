import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { DialogService } from '../core/dialog.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insajder',
  templateUrl: './insajder.component.html',
  styleUrls: ['./insajder.component.scss']
})
export class InsajderComponent implements OnInit {

  constructor(public fs: FsService, private ds: DialogService) { }

  ngOnInit() {
  }

}
