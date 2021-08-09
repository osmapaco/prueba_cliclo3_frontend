import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from 'src/app/interfaces/partido';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  id:number = 0;
  private sub:any;
  partido:Partido = {id: 0, idUsuario: 0, nombreUsuario: '', nombreLocal: '', nombreVisitante: '', idVisitante: 0, idLocal: 0, fecha: '', golesLocal: 0, golesVisitante: 0};
  local:string = '';
  visitante:string = '';

  constructor(
    private route: ActivatedRoute,
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
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];

        this.server.getPartido(this.id).subscribe(data => {
          this.partido = data;

          if(this.partido.golesLocal != null && this.partido.golesVisitante != null){
            this.router.navigateByUrl('/matches');
          }
        }, error => {
          alert('Ha ocurrido un error al obetener los partidos');
        });
      });
  }
   save(){
    this.partido.golesLocal = parseInt(this.local);
    this.partido.golesVisitante = parseInt(this.visitante);

    this.server.saveScore(this.partido).subscribe(data => {
      this.router.navigateByUrl('/matches');
    }, error => {
      alert('Ha ocurrido un error al obetener los partidos');
    });
   }
}
