import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { LoginService } from '../core/login.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	hide = true;

	email = new FormControl('', [Validators.required, Validators.email]);
	name = new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)]));
	emailRegister = new FormControl('', Validators.compose([Validators.required, Validators.email]));
	password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)/*, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')*/]))


	getErrorMessage() {
	    return this.email.hasError('required') ? 'Kjo fushe nuk guxon te jete e zbrazet' :
	        this.email.hasError('email') ? 'Not a valid email' :
	            '';
	  }

	getNameErrorMessage() {
		return this.name.hasError('required') ? 'Emri nuk guxon te jete i zbrazet':
			this.name.hasError('minlength') ? 'Emri duhet te jete me i gjate se 2 shkronja':
			this.name.hasError('maxlength') ? 'Emri nuk guxon ti kete me shume se 25 shkronja':
			'';
	}

	getEmailRegistrationError(){
		return this.emailRegister.hasError('required') ? 'Email nuk guxon mu kan i zbrazet':
			this.emailRegister.hasError('email') ? 'Kjo nuke eshte nje e-mail valide':
			'';
	}

	getPasswordErrorMessage() {
		return this.password.hasError('required') ? 'Fjalkalimi nuk guxon te jete i zbrazet':
			this.password.hasError('minlength') ? 'Fjalkalimi duhet te jete me i gjate se 6 simbole':
			// this.password.hasError('patter') ? 'Fjalekalimi duhet te permbaj shkronja te medha dhe dhe Numra':
			'';
	}

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthService,
		private router: Router
		) {	}

	// tryGoogleLogin(){
	// 	this.authService.doGoogleLogin()
	// 	.then(res => {
	// 		this.router.navigate(['/frontpage']);
	// 	})
	// }



	ngOnInit() {
	}

}
