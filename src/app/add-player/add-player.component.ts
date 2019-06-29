import { Component, OnInit, Input } from '@angular/core';
import { SquadService } from '../services/squad.service';
import { FormControl } from '@angular/forms';
import { Squad } from '../model/Squad';
import { Player } from '../model/Player';
import { Fixture } from '../model/Fixture';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SquadId } from '../model/Squad-id';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit{

  @Input() fixture: Fixture;
  @Input() players: Player[];
  @Input() division: number;
  
  private squad;
  private squadSize: number[];
  public playerFormCtrl = new FormControl();
  private proxyValue: string;
  private displayClass = new Map<number, string>();
  filteredPlayers: Observable<Player[]>;
  dataSource: MatTableDataSource<Squad[]>;
  
  ngOnInit(): void {
    this.squad = this.fixture.squad;
    console.log(this.fixture);
    this.squadSize = Array.apply(null, {length: 20}).map(Number.call, Number)
    if (this.isFullSquad()) {
      this.playerFormCtrl.disable();
    }
    this.dataSource = new MatTableDataSource<Squad[]>(this.squad);
  }

  constructor(private squadService: SquadService) {
    this.filteredPlayers = this.playerFormCtrl.valueChanges
      .pipe(
        startWith(''),
        map(player => player ? this._filterPlayers(player) : this.players.slice())
      );
  }

  private _filterPlayers(value: string): Player[] {
    const filterValue = value.toLowerCase();

    return this.players.filter(player => player.name.toLowerCase().indexOf(filterValue) > -1);
  }

  public getPlayer(position: number): string {
    return !!this.fixture.squad[position] ? (<Squad>this.fixture.squad[position]).player.name : '';
  }

  public isFullSquad(): boolean {
    return this.fixture.squad.length == 20 && this.fixture.squad.filter(elm => (<Squad>elm).player == undefined).length == 0;
  }

  public optionSelected(idx, event, player) {
    if (!this.isFullSquad()) {
      this.playerFormCtrl.setValue('');
      let squadId = new SquadId();
      squadId.fixtureId = this.fixture.id;
      squadId.playerId = player.id;
      let tempSquadMember = new Squad();
      tempSquadMember.squadId = squadId;
      tempSquadMember.level = this.division;
      tempSquadMember.sub_hooker = 0;
      tempSquadMember.sub_prop = 0;
      tempSquadMember.player = player;
      let firstAvailableElementIndex = this.fixture.squad.findIndex(function (elm:Squad):boolean {
        return elm.player == undefined;
      });
      this.squadService.save(tempSquadMember).subscribe(data => {
        if (firstAvailableElementIndex == -1) {
          this.fixture.squad.push(tempSquadMember);
        } else {
          this.fixture.squad[firstAvailableElementIndex] = tempSquadMember;
        }
        this._filterPlayers('');
        this.switchPlayerInputStatus();
      });
      }
  }

  public onFocus(): string {
    return '';
  }

  public getDisplayClass() {

  }

  public remove(player) {
    let removedIndex:number;
    this.squadService.removePlayer(player).subscribe(data => {
      removedIndex = this.fixture.squad.findIndex((elm, idx) => {
        if (elm.squadId) {
          return elm.squadId.playerId == player.player.id
        }
      });
      this.fixture.squad[removedIndex] = new Squad();
      this.switchPlayerInputStatus();
    });
  }

  public switchPlayerInputStatus() {
    if (this.isFullSquad()) {
      this.playerFormCtrl.disable();
    } else {
      this.playerFormCtrl.enable();
    }
  }

  public showHooker(idx, player) {
    if(this.thisPlayerIsSubHooker(player)) {
      return 'green';
    }
  }
  public showProp(idx, player, iconIndex) {
    if(this.thisPlayerIsSubProp(player)) {
      let props = this.findExistingSubProps()
      if (props.length > 0) {
        if ((props.indexOf(player) + 1) == iconIndex) {
          return 'green'
        }
      }
    }
  }

  private thisPlayerIsSubHooker(player):boolean {
    return player ? player.sub_hooker == 1 : false;
  }
  private thisPlayerIsSubProp(player):boolean {
    return player ? player.sub_prop == 1 : false;
  }
  public propsAlreadyChosen():boolean {
    return this.fixture.squad.filter(elm => {
      return elm.sub_prop == 1;
    }).length == 2;
  }

  public updateSubProp(idx, player:Squad) {
    if (player.sub_prop == 1) {
      this.squadService.removeSubProp(player).subscribe(function(response) {
        player.sub_prop = 0;
      });
    } else {
      let props:Squad[] = this.findExistingSubProps();
      if (props.length < 2) {
        console.log("Section 1");
        this.squadService.updateSubProp(null, player).subscribe(data => {
          player.sub_prop = 1;
          // this.showProp(idx, player);
        });
      } else if (props.indexOf(player) == -1) {
        console.log("Section 2")
        //find the first prop to remove
        let removeSubPropStatusFrom:Squad = this.fixture.squad.find(elm => {return elm.sub_prop == 1});
        
        this.squadService.updateSubProp(removeSubPropStatusFrom, player).subscribe(data => {
          player.sub_prop = 1;
          removeSubPropStatusFrom.sub_prop = 0;
          // this.showProp(idx, player);
        });
      }
    }
  }

  private findExistingSubProps():Squad[] {
    return this.fixture.squad.filter(player => player.sub_prop == 1);
  }

  public updateSubHooker(idx, player) {
    this.squadService.updateSubHooker(player).subscribe(data => {
        this.fixture.squad.forEach(player => player.sub_hooker = 0);
        player.sub_hooker = 1;
        this.showHooker(idx, player);
    });
  }
}
