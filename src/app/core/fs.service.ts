import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../core/login.service'
import { AngularFireAuth  } from '@angular/fire/auth';



export interface Lajmi {
  lajmi_texti: string;
  linku_i_lajmit: string;
  linki_i_img: string;
  lajmeCounter: number;
  organizata: string;
  votes: number;
  article: string,
  bookmarks: string,
  upVoteArray: string,
  downVoteArray: string
}

export interface lajmiId extends Lajmi{
	id: string;
}

@Injectable({
  providedIn: 'root'
})


export class FsService {

  userid;


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

  // private bookmarRef: AngularFirestoreCollection<Lajmi>;
  bookmarks$: Observable<lajmiId[]>;
  bookmarksBehaviorSubject : BehaviorSubject<string|null>;


  constructor(private afs: AngularFirestore,
    public authService: AuthService,
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


    // Frontapge Content
    this.lajmetCollection = afs.collection<Lajmi>('lajmet');
    this.lajmet = this.lajmetCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lajmi;
        const id = a.payload.doc.id;
        return {id, ...data};
    }).filter(x => x.votes > 1).sort((a,b) => b.votes-a.votes)));

  } //constructor end

  addVote(id): void {
    let res = this.authService.getIsLoggedIn();


    if (res) {

      const userId = this.authService.userData.uid;
      const docRef = this.afs.collection("lajmet").doc(id);
      const increment = firebase.firestore.FieldValue.increment(1);
      const decrease = firebase.firestore.FieldValue.increment(-1);

      docRef.get().toPromise().then(function(doc) {

        if (doc.exists) {
          // create local variabl which refer to the upVoteArray field
          // in the document
          var upVoteArray = doc.data().upVoteArray;
          var downVoteArray = doc.data().downVoteArray;

          //Check if uid exist in downVoteArray
          if (downVoteArray != undefined) {
            if (downVoteArray.indexOf(userId) != -1) {
              docRef.update({
                  downVoteArray: firebase.firestore.FieldValue.arrayRemove(userId)
                })
            }
          }

          // check if the field upVoteArray exists
          if (upVoteArray == undefined) {
            docRef.update({upVoteArray: [userId]});
            docRef.update({votes : increment});
            console.log('New upVoteArray has been created and populated with data in the document:', id);
          } else {
            if (upVoteArray.indexOf(userId) != -1) {
              // if the userId already exists in upVoteArray remove and decrease the counter
              docRef.update({
                upVoteArray: firebase.firestore.FieldValue.arrayRemove(userId)
              })
              docRef.update({votes : decrease});
              console.log('A value has been removed from upVoteArray array from the document:', id );
            } else {
              // if it doesnt update the array with it included
              docRef.update({
                upVoteArray: firebase.firestore.FieldValue.arrayUnion(userId)
              })
              docRef.update({votes : increment});
              console.log('A new value has been added to the upVoteArray array from the document:', id);
            }            
          }
        } else {
          console.log("no such document");
        }
      }).catch(function(error) {
        console.log("Error getting document", error);
      })
    } else {
      window.alert("Duhet te kyqeni para se te votoni ndonje lajm!");
      this.ls.openDialog();
      console.log('nuk jini te kyqyr: ', res);
    }
  }

  removeVote(id): void {
    let res = this.authService.getIsLoggedIn();

    if (res) {

      const userId = this.authService.userData.uid;
      const docRef = this.afs.collection("lajmet").doc(id);
      const increment = firebase.firestore.FieldValue.increment(1);
      const decrease = firebase.firestore.FieldValue.increment(-1);

      docRef.get().toPromise().then(function(doc) {

        if (doc.exists) {
          // create local variabl which refer to the downVoteArray field
          // in the document
          var downVoteArray = doc.data().downVoteArray;
          var upVoteArray = doc.data().upVoteArray;

          //Check if uid exist in upVoteArray
          if (upVoteArray != undefined) {
            if (upVoteArray.indexOf(userId) != -1) {
              docRef.update({
                  upVoteArray: firebase.firestore.FieldValue.arrayRemove(userId)
                })
            }
          }


          // check if the field downVoteArray exists
          if (downVoteArray == undefined) {
            docRef.update({downVoteArray: [userId]});
            docRef.update({votes : decrease});
            console.log('New downVoteArray has been created and populated with data in the document:', id);
          } else {
            if (downVoteArray.indexOf(userId) != -1) {
              // if the userId already exists in downVoteArray remove and decrease the counter
              docRef.update({
                downVoteArray: firebase.firestore.FieldValue.arrayRemove(userId)
              })
              docRef.update({votes : increment});
              console.log('A value has been removed from downVoteArray array from the document:', id );
            } else {
              // if it doesnt contain the userID update the array with it included
              docRef.update({
                downVoteArray: firebase.firestore.FieldValue.arrayUnion(userId)
              })
              docRef.update({votes : decrease});
              console.log('A new value has been added to the downVoteArray array from the document:', id);
            }            
          }
        } else {
          console.log("no such document");
        }
      }).catch(function(error) {
        console.log("Error getting document", error);
      })
    } else {
      window.alert("Duhet te kyqeni para se te votoni ndonje lajm!");
      this.ls.openDialog();
      console.log('nuk jini te kyqyr: ', res);
    }
  }

  addBookmark(id): void {
    //check if user is looged in
    let res = this.authService.getIsLoggedIn();
    if (res) {

      const userId = this.authService.userData.uid;
      const docRef = this.afs.collection("lajmet").doc(id);


      docRef.get().toPromise().then(function(doc) {
        if (doc.exists) {
          // create local variabl which refer to the bookmark field
          // in the document
          var bookmarks = doc.data().bookmarks;

          // check if the field bookmarks exists
          if (bookmarks == undefined) {
            docRef.update({bookmarks: [userId]});
            console.log('New bookmark has been created and populated with data in the document:', id);
          } else {
            if (bookmarks.indexOf(userId) != -1) {
              // if the bookmark already exists remove it
              docRef.update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(userId)
              })
              console.log('A value has been removed from bookmark array from the document:', id );
            } else {
              // if it doesnt update the array with it included
              docRef.update({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(userId)
              })
              console.log('A new value has been added to the bookmark array from the document:', id);
            }            
          }
        } else {
          console.log("no such document");
        }
      }).catch(function(error) {
        console.log("Error getting document", error);
      })
    } else {
      window.alert("Duhet te kyqeni para se te ruani ndonje lajm!");
      this.ls.openDialog();
      console.log('you are not logged in: ', res);
    }
  }
}


