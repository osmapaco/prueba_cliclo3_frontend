import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = "";
  password:string = "";

  error:string = '';

  constructor(
    private server:DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.server.login({
      username: this.username,
      password: this.password
    }).subscribe(data => {
      this.error = '';
      localStorage.setItem('JWT', data.token);
      localStorage.setItem('username', data.username);
      this.router.navigateByUrl('/');
    }, error => {
      this.error = error.error.message;
    });
  }

}
