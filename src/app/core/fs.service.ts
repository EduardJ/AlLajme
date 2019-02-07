import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';


export interface Lajmi {
	lajmi_texti: string;
	linku_i_lajmit: string;
	linki_i_img: string;
}

export interface lajmiId extends Lajmi{
	id: string;
}

@Injectable({
  providedIn: 'root'
})

export class FsService {
	works="works"

  private lajmeCollection: AngularFirestoreCollection<Lajmi>;
  lajmet: Observable<lajmiId[]>;

  constructor(private afs: AngularFirestore) {
  	this.lajmeCollection = afs.collection<Lajmi>('koha');
  	this.lajmet = this.lajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  		})));
  }


}
