import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string = '';
  token:string = ''

  constructor(
    private router: Router
  ) {
    const jwt = (token:string) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };

    const exp = jwt(localStorage.getItem('JWT') || '')?.exp*1000;

    if(exp < Date.now())
      this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.token = localStorage.getItem('JWT') || '';

    if(this.token == '')
      this.router.navigateByUrl('/login');
  }

}
