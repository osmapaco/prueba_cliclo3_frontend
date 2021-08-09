import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  nombre:string = '';
  correo:string = '';
  username:string = '';
  password:string = '';

  error:string = '';

  constructor(
    private server:DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  signup(){
    this.server.signUp({
      name: this.nombre,
      username: this.username,
      email: this.correo,
      password: this.password
    }).subscribe(data => {
      this.error = '';
      this.router.navigateByUrl('/');
    }, error => {
      this.error = error.error.message;
    });
  }

}
