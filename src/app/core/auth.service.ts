import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth';
import { User } from '../core/user';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

	userData: any;



  constructor(
  	public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, //ngZone service to emove outside scope warning
    private dialogRef: MatDialog
    ) {
  		this.afAuth.authState.subscribe(user => {
  			if (user) {
  				this.userData = user;
  				localStorage.setItem('user', JSON.stringify(this.userData));
  				JSON.parse(localStorage.getItem('user'));
  			}
  		})
    }

	SignIn(email, password) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.ngZone.run(() => {
					this.dialogRef.closeAll();
					this.router.navigate(['frontpage']);
				});
			}).catch((error) => {
				var errorCode = error.code;
				
				if (errorCode != 'auth/wrong-password') {
					window.alert('Fjalëkalimi është gabim!')
				} else if (errorCode != 'auth/user-not-found') {
					window.alert('Ky përdorues nuk ekziston!')
				} else {
					window.alert(error.message);
				}

			})
	}

	SignUp(email, password) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.SendVerificationMail();
				this.SetUserData(result.user);

				window.alert('Një mesazh konfirmimi është dërguar, ju lutemi konfirmoni email-en dhe kyquni')
			}).catch((error) => {
				window.alert(error.message)
			})
	}

	SendVerificationMail(){
		this.afAuth.auth.currentUser.sendEmailVerification()
		.then(() => {
			this.router.navigate(['frontpage']);
		})
	}

	ForgotPassword(passwordResetEmail) {
		return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
		.then(() => {
			window.alert('Një email për fjalëkalimin e ri ju është dërguar në email');
		}).catch((error) => {
			window.alert(error)
		})
	}

	getIsLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return (user !== null && user.emailVerified !== false) ? true : false;
	}

	GoogleAuth(){
		this.AuthLogin(new auth.GoogleAuthProvider());
	}

	AuthLogin(provider) {
		return this.afAuth.auth.signInWithPopup(provider)
			.then((result) => {

				this.ngZone.run(() => {
					this.router.navigate(['frontpage']);
	    		})
	    		this.SetUserData(result.user);
	    		this.dialogRef.closeAll();
			}).catch((error) => {
				window.alert(error)
			})
	}

	SetUserData(user) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
		const userData: User = {
	      uid: user.uid,
	      email: user.email,
	      displayName: user.displayName,
	      photoURL: user.photoURL,
	      emailVerified: user.emailVerified
	    }
	    return userRef.set(userData, {
	    	merge: true
	    })
	}

	SignOut() {
		return this.afAuth.auth.signOut()
		.then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['frontpage']);
		})
	}

} //End of Class