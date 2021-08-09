import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partido } from 'src/app/interfaces/partido';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-matches',
  templateUrl: './view-matches.component.html',
  styleUrls: ['./view-matches.component.css']
})
export class ViewMatchesComponent implements OnInit {
  partidos:Array<Partido> = [];

  constructor(
    private server:DataService,
    private router: Router,
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
    let token = localStorage.getItem('JWT') || '';

    if(token == '')
      this.router.navigateByUrl('/login');
    else
      this.server.getPartidos().subscribe(data => {
        console.log(data);
        this.partidos = data;
      }, error => {
        alert('Ha ocurrido un error al obetener los partidos');
      });
  }

  definir(id:number){
    
  }
}
