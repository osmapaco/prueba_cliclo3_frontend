import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ScoreComponent } from './components/score/score.component';
import { SingupComponent } from './components/singup/singup.component';
import { ViewMatchesComponent } from './components/view-matches/view-matches.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-match', component: CreateMatchComponent },
  { path: 'matches', component:  ViewMatchesComponent},
  { path: 'signup', component: SingupComponent },
  { path: 'score/:id', component: ScoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
