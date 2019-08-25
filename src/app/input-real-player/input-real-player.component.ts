import { Component, OnInit, Inject, Host } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms'
import { Player } from '../model/Player';
import { PlayerService } from '../services/player.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Squad } from '../model/Squad';
import { SquadService } from '../services/squad.service';
import { PlayerActionsComponent } from '../player-actions/player-actions.component';
import { Fixture } from '../model/Fixture';

@Component({
  selector: 'app-input-real-player',
  templateUrl: './input-real-player.component.html',
  styleUrls: ['./input-real-player.component.css']
})
export class InputRealPlayerComponent implements OnInit {
  playerCtrl = new FormControl();
  filteredPlayers: Observable<Player[]>;
  private squad: Squad;
  public player: Player;
  public fixture: Fixture;
  private players: Player[];
  
  constructor(public dialogRef: MatDialogRef<InputRealPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private playerService: PlayerService, private squadService: SquadService) {
      this.fixture = data.fixture;
      this.squad = data.squad;
      let playerIds = this.fixture.squad.map(s => s.player.id);
      this.fixture.squad.forEach(s => {
        if (s.realPlayerId) {
          playerIds.push(s.realPlayerId);
        }
      });
      this.playerService.findAll().subscribe(data => this.players = data.filter(player => {
        return !playerIds.includes(player.id);
      }));
      this.filteredPlayers = this.playerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(player => player ? this._filterPlayers(player) : this.players ? this.players.slice() : [])
      );
    }

  ngOnInit() {
    this.player = this.data.player;
    
  }
  private _filterPlayers(value: any): Player[] {
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return this.players.filter(player => player.name.toLowerCase().indexOf(filterValue) === 0);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.squad.realPlayerId = this.playerCtrl.value.id;
    let s = this.squadService.save(this.squad);
    this.dialogRef.close(s);
  }

  public displayName(val: Player) {
    return val ? val.name : val;
  }
}
