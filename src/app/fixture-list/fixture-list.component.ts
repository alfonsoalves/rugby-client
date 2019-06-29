import { Component, OnInit } from '@angular/core';
import { Fixture } from '../model/fixture'
import { Squad } from '../model/Squad'
import { FixtureService } from '../services/fixture.service'
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../model/Player';
import { AddPlayerComponent } from '../add-player/add-player.component'
import { AddFixtureComponent } from '../add-fixture/add-fixture.component';
import { SquadId } from '../model/Squad-id';
import { FileUploader } from 'ng2-file-upload';
import { SquadService } from '../services/squad.service';
import { PlayerActionsComponent } from '../player-actions/player-actions.component';

@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  private openFixtures: Map<number, boolean>;
  fixtures: Fixture[];
  squads: Squad[];
  players: Player[];
  divisions: Set<number>;
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 5000,
    horizontalPosition: "center",
    verticalPosition: 'bottom'
  };

  durationInSeconds: number;
  constructor(
    private fixtureService: FixtureService, 
    private squadService: SquadService, 
    private route: ActivatedRoute,
    private popup: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
    public addFixtureDialog: MatDialog,
    public addPlayerDialog: MatDialog,
    
    ) { }

  ngOnInit() {

    this.players = <Player[]>this.route.snapshot.data.playerData;
    this.fixtures = <Fixture[]>this.route.snapshot.data.fixtureData;
    this.squads = <Squad[]>this.route.snapshot.data.squadData;
    this.divisions = new Set(this.fixtures.map(x => x.level, this));
    this.openFixtures = new Map();
    this.fixtures.forEach(function(fixture) {
      this.openFixtures[fixture.id] = false;
      this.squads.forEach(function(squad: Squad) {
        this.players.forEach(function (player: Player) {
          if (player.id == squad.squadId.playerId) {
            let tempPlayer = new Player();
            tempPlayer.id = player.id;
            tempPlayer.name = player.name;
            squad.player = tempPlayer;
          }
        }, this)
        if (fixture.id == squad.squadId.fixtureId) {
          fixture.squad.push(squad);
        }
      }, this);
      fixture.squad.sort(this.squadSort)
    }, this);
    
    console.log(this.fixtures);
  }

  public openPopup(component: any, message: string) {
    this.popup.openFromComponent(component, {
      data: message,
      ...this.configSuccess
    });
  }

  public deleteSquad(fixture: Fixture) {
    this.squadService.deleteSquad(fixture.id).subscribe(data => {
      fixture.squad = new Array<Squad>();
    });
  }

  
  public openedFixturePanel(fixture): void {
    
    this.fixtures.forEach(fixture => {
      this.openFixtures[fixture.id] = false;
    })
    this.openFixtures[fixture.id] = true;
  }

  public openAddFixtureDialog() {
    let t = this;
    this.addFixtureDialog.open(FixtureListComponent, {
        width: "250px",
        disableClose: !0
    }).afterClosed().subscribe(function(e) {
        null != e && t.openPopup(FixtureListComponent, "New fixture added")
    })
  }

  private openPlayerActionPanel(fixture, player) {
    let data = {};
    data['fixture'] = fixture;
    data['player'] = player.player;
    this._bottomSheet.open(PlayerActionsComponent, {data: data});
  }

  private squadSort(a: Squad, b: Squad) {
    if (a.position < b.position) {
      return -1;
    } else if (a.position == b.position) {
      return 0;
    }
    return 1;
  }
}
