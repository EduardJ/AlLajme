import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { LoginService } from '../core/login.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';



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
	password2 = new FormControl('', Validators.required);

	
	getErrorMessage() {
	    return this.email.hasError('required') ? 'Kjo fushë nuk duhet të mbetet e zbrazët' :
	        this.email.hasError('email') ? 'Kjo email nuk është valide' :
	            '';
	  }

	getNameErrorMessage() {
		return this.name.hasError('required') ? 'Emri nuk duhet të mbetet i zbrazët':
			this.name.hasError('minlength') ? 'Emri duhet të jetë më i gjatë se 2 shkronja':
			this.name.hasError('maxlength') ? 'Emri nuk duhet të ketë më shumë se 25 shkronja':
			'';
	}

	getEmailRegistrationError(){
		return this.emailRegister.hasError('required') ? 'Email nuk duhet të mbetet i zbrazët':
			this.emailRegister.hasError('email') ? 'Kjo nuk është një email valide':
			'';
	}

	getPasswordErrorMessage() {
		return this.password.hasError('required') ? 'Fjalëkalimi nuk duhet të mbetet i zbrazët':
			this.password.hasError('minlength') ? 'Fjalëkalimi duhet të jetë më i gjatë se 6 shkronja':
			// this.password.hasError('patter') ? 'Fjalëkalimi duhet te permbaj shkronja te medha dhe dhe Numra':
			'';
	}

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
		public authService: AuthService, 
		) {	}

	ngOnInit() {
	}

}
