import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component'
import { SquadListComponent } from './squad-list/squad-list.component'
import { FixtureListComponent } from './fixture-list/fixture-list.component'
import { PlayerResolver } from './resolvers/player-resolver';
import { SquadResolver } from './resolvers/squad-resolver';
import { FixtureResolver } from './resolvers/fixture-resolver';

export const routes: Routes = [
  {path: 'players', component: PlayerListComponent, 
  resolve: { 
    playerData: PlayerResolver,
    fixtureData: FixtureResolver,
    squadData: SquadResolver
    }},
  {
    path: 'fixtures', 
    component: FixtureListComponent, 
    resolve: { 
      playerData: PlayerResolver,
      fixtureData: FixtureResolver,
      squadData: SquadResolver
      }
    },
  {path: 'squads', component: SquadListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    PlayerResolver,
    SquadResolver,
    FixtureResolver
  ]
})
export class AppRoutingModule { }
