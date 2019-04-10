import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../core/login.service'



export interface Lajmi {
  lajmi_texti: string;
  linku_i_lajmit: string;
  linki_i_img: string;
  lajmeCounter: number;
  organizata: string;
  votes: number;
  article: string
}

export interface lajmiId extends Lajmi{
	id: string;
}

@Injectable({
  providedIn: 'root'
})


export class FsService {
  showSpinner: boolean = true;

  private kohaLajmeCollection: AngularFirestoreCollection<Lajmi>;
  kohaLajmet: Observable<lajmiId[]>;

  private indeksonlineLajmeCollection: AngularFirestoreCollection<Lajmi>;
  indeksonlineLajmet: Observable<lajmiId[]>;

  private gazetaexpressLajmeCollection: AngularFirestoreCollection<Lajmi>;
  gazetaexpressLajmet: Observable<lajmiId[]>;

  private insajderiLajmeCollection: AngularFirestoreCollection<Lajmi>;
  insajderiLajmet: Observable<lajmiId[]>;

  private telegrafiLajmeCollection: AngularFirestoreCollection<Lajmi>;
  telegrafiLajmet: Observable<lajmiId[]>;

  private lajmetCollection: AngularFirestoreCollection<Lajmi>;
  lajmet: Observable<lajmiId[]>;

  private lajmetCollectionDialog: AngularFirestoreCollection<Lajmi>;
  lajmetdialog: Observable<lajmiId[]>;


  constructor(private afs: AngularFirestore,
    private authService: AuthService,
    private ls: LoginService
    ) {


    //Lajmet

  	// Koha
  	this.kohaLajmeCollection = afs.collection<Lajmi>('lajmet');
  	this.kohaLajmet = this.kohaLajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  		}).filter(x => x.organizata == 'Koha').sort((a,b) => b.lajmeCounter-a.lajmeCounter)));

  	// Telegrafi
  	this.telegrafiLajmeCollection = afs.collection<Lajmi>('lajmet');
  	this.telegrafiLajmet = this.telegrafiLajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  		}).filter(x => x.organizata == 'Telegrafi').sort((a,b) => b.lajmeCounter-a.lajmeCounter)));

  	// IndeksOnline
  	this.indeksonlineLajmeCollection = afs.collection<Lajmi>('lajmet');
  	this.indeksonlineLajmet = this.indeksonlineLajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  		}).filter(x => x.organizata == 'IndeksOnline').sort((a,b) => b.lajmeCounter-a.lajmeCounter)));

  	// Insajderi
  	this.insajderiLajmeCollection = afs.collection<Lajmi>('lajmet');
  	this.insajderiLajmet = this.insajderiLajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  		}).filter(x => x.organizata == 'Insajderi').sort((a,b) => b.lajmeCounter-a.lajmeCounter)));

		// Gazeta Express
  	this.gazetaexpressLajmeCollection = afs.collection<Lajmi>('lajmet');
  	this.gazetaexpressLajmet = this.gazetaexpressLajmeCollection.snapshotChanges().pipe(
  		map(actions => actions.map(a => {
  			const data = a.payload.doc.data() as Lajmi;
  			const id = a.payload.doc.id;
  			return {id, ...data};
  	}).filter(x => x.organizata == 'GazetaExpress').sort((a,b) => b.lajmeCounter-a.lajmeCounter)));


    this.lajmetCollection = afs.collection<Lajmi>('lajmet');
    this.lajmet = this.lajmetCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lajmi;
        const id = a.payload.doc.id;
        return {id, ...data};
    }).filter(x => x.votes > 1).sort((a,b) => b.votes-a.votes)));
  }



  addVote(id, collectionName): void {
    let res = this.authService.getIsLoggedIn();
    if (res) {
      const docRef = this.afs.collection(collectionName).doc(id);
        firebase.firestore().runTransaction(t => {
          return t.get(docRef.ref).then(doc => {
            //read the current "votes" field of the document
            const newValue = doc.data().votes + 1;

            //increase it by 1 atomicallyl
            t.update(docRef.ref, {
              votes: newValue
            })
          })
        }).then(res => console.log('Transaction completed!'), err => console.error(err));

      console.log('you are logged in: ', res)
    } else {
      window.alert('You Need To log in to Vote!');
      this.ls.openDialog();
      console.log('you are not logged in: ', res);
    }
  }

  removeVote(id, collectionName): void {
    let res = this.authService.getIsLoggedIn();

    if (res) {
      const docRef = this.afs.collection(collectionName).doc(id);

      firebase.firestore().runTransaction(t => {
        return t.get(docRef.ref).then(doc => {
          const newValue = doc.data().votes - 1;
          t.update(docRef.ref, {
            votes: newValue
          });
        });
      }).then(res => console.log('Transaction completed!'), err => console.error(err));
      console.log('you are logged in: ', res)
    } else {
      window.alert('You Need To log in to Vote!');
      this.ls.openDialog();
      console.log('you are not logged in: ', res);
    }

  }

  returnSanitizedHtml() {

  }
}
