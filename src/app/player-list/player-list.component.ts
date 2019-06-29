import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../model/Player' ;
import { PlayerService } from '../services/player.service' ;
import { Fixture } from '../model/Fixture';
import { Squad } from '../model/Squad';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { StatData } from '../model/stat-data';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InitialStylingValuesIndex } from '@angular/core/src/render3/interfaces/styling';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = ['playerId', 'playerName', 'starts', 'subs'];
  
  private openFixtures: Map<number, boolean>;
  fixtures: Fixture[];
  squads: Squad[];
  players: Player[];
  divisions: Set<number>;
  statData: StatData[];
  stats: Map<any, any>;
  dataSources: Map<number, MatTableDataSource<StatData>>;
  dataSource_ineligible_j4_league: MatTableDataSource<StatData>;
  dataSource_ineligible_j4_cup: MatTableDataSource<StatData>;
  dataSource_ineligible_j2_league: MatTableDataSource<StatData>;
  dataSource_ineligible_j2_cup: MatTableDataSource<StatData>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private playerService: PlayerService, private route: ActivatedRoute) {
    this.dataSources =  new Map<number, MatTableDataSource<StatData>>();
    this.players = <Player[]>this.route.snapshot.data.playerData;
    this.fixtures = <Fixture[]>this.route.snapshot.data.fixtureData;
    this.squads = <Squad[]>this.route.snapshot.data.squadData;
    this.divisions = new Set(this.fixtures.map(x => x.level, this));
    this.openFixtures = new Map();
    this.stats = new Map<number, StatData[]>();
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
    }, this);

    this.players.forEach(player => {
      this.divisions.forEach(division => {
        let statsForPlayer = this.getStatsForPlayerForLevel(player, division);
        if (statsForPlayer.starts + statsForPlayer.subs > 0) {
          if (this.stats[division] != undefined) {
            this.stats[division].push(statsForPlayer);
          } else {
            this.stats[division] = [];
            this.stats[division].push(statsForPlayer);
          }
        }
      });
    });
    this.divisions.forEach(division => {
      this.dataSources.set(division, new MatTableDataSource(this.stats[division]));
    });
  }
  
  ngOnInit() {
    this.dataSources.forEach(ds => ds.sort = this.sort);
  }

  public getStatsForPlayerForLevel(player:Player, level:number):StatData {
    let relevantFixtures = this.fixtures.filter(fixture => {
      return fixture.level == level && fixture.squad.filter(squadMember => {
        return squadMember.player.id == player.id;
      }).length > 0;
    });
    let stats:StatData = {
      playerId: player.id,
      playerName: player.name,
      starts: 0,
      subs: 0
    }
    let starts = 0
    let subs = 0
    relevantFixtures.forEach(fixture => {
      starts += fixture.squad.filter(squadMember => {
        return squadMember.player.id == player.id && fixture.squad.indexOf(squadMember) < 15;
      }).length;
      subs += fixture.squad.filter(squadMember => {
        return squadMember.player.id == player.id && fixture.squad.indexOf(squadMember) > 14;
      }).length
      stats.starts = starts;
      stats.subs = subs;
    });
    return stats;
  }

  private getIneligibleLeaguePlayers(level: number) {
    return null;
  }
  private getIneligibleCupPlayers(level: number) {
    return null;
  }

  private reducer (accumulator:number, currentValue: number):number {
    return accumulator + currentValue;
  }

  private getDataSource(division:number) {
    return this.dataSources.get(division);
  }
}
