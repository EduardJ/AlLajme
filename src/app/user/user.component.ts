import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../core/login.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FsService } from '../core/fs.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Lajmi {
  lajmi_texti: string;
  linku_i_lajmit: string;
  linki_i_img: string;
  lajmeCounter: number;
  organizata: string;
  votes: number;
  article: string,
  bookmarks: string
}

export interface lajmiId extends Lajmi{
  id: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {

  bookmarks$: Observable<lajmiId[]>;
  bookmarksBehaviorSubject : BehaviorSubject<string|null>;

  constructor(public authService: AuthService, private ls: LoginService, private afs: AngularFirestore, public fs: FsService) {
    // console.log(this.userIdFromAuth);
  }

  ngOnInit() {
    let result = this.authService.user$.subscribe(uid => {
      this.bookmarksBehaviorSubject = new BehaviorSubject(null);
      this.bookmarks$ = this.bookmarksBehaviorSubject.pipe(
        switchMap(string => this.afs.collection<lajmiId>('lajmet', ref => 
          ref.where('bookmarks', 'array-contains', uid)).valueChanges())
      );
    })
  }
}
