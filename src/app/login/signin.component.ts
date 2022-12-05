import { Component, OnInit } from '@angular/core';
import { LoginService } from '../register/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  user = {};

  constructor(
    private authService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Entrar() {
    this.authService.entrar(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/banner']);
        },
        err => console.log(err)
      )
  }

}
