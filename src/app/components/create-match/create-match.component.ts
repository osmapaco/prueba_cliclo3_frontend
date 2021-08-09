import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/interfaces/equipo';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {
  local:string = '';
  visitante:string = '';
  fecha:string = '';
  equipos:Array<Equipo> = [];

  error:string = '';

  constructor(
    private server:DataService,
    private router: Router,
    private datePipe : DatePipe
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
    else{
      this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString() || '';
    
      this.server.getEquipos().subscribe(data => {
        this.equipos = data;
      }, error => {
        alert('Ha ocurrido un error al obetener los equipos');
      });
    }    
  }

  save(){
    this.server.crearPartido({
      idLocal: parseInt(this.local),
      idVisitante: parseInt(this.visitante),
      fecha: this.fecha,
      golesLocal: null,
      golesVisitante: null
    }).subscribe(data => {
      this.error = '';
      this.router.navigateByUrl('/matches');
    }, error => {
      this.error = error.error.message;
    });
  }
}
