import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth';
import { User } from '../core/user';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	userData: any;



  constructor(
  	public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone //ngZone service to emove outside scope warning
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
					this.router.navigate(['frontpage']);
				});
			}).catch((error) => {
				window.alert(error.message)
			})
	}

	SignUp(email, password) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.SendVerificationMail();
				this.SetUserData(result.user);
			}).catch((error) => {
				window.alert(error.message)
			})
	}

	SendVerificationMail(){
		this.afAuth.auth.currentUser.sendEmailVerification()
		.then(() => {
			this.router.navigate(['verifiko-email']);
		})
	}

	ForgotPassword(passwordResetEmail) {
		return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
		.then(() => {
			window.alert('Nje email per fjalkalimin e ri ju eshte derguar ne e-mail');
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

} //End of Class