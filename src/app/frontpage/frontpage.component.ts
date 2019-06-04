import { Component, OnInit } from '@angular/core';
import { FsService } from '../core/fs.service';
import { AuthService } from '../core/auth.service';
import { DialogService } from '../core/dialog.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {
	bookmark = true;
  constructor(public fs: FsService, private ds: DialogService) { 
  	
  }

  ngOnInit() {
  }

}
