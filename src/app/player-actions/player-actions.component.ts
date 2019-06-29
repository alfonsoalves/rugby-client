import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Fixture } from '../model/Fixture';
import { Squad } from '../model/Squad';

@Component({
  selector: 'app-player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.css']
})
export class PlayerActionsComponent implements OnInit {

  public player: Squad;
  public fixture: Fixture;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<PlayerActionsComponent>) {}

  ngOnInit() {
    this.player = this.data.player;
    this.fixture = this.data.fixture;
  }

  public addScore(scoreType: number) {
    console.log(scoreType);
    console.log(this.fixture.id);
    console.log(this.player.squadId.playerId);
    this._bottomSheetRef.dismiss()
    event.preventDefault();
  }

  public addCard(cardType: number) {
    console.log(cardType);
    console.log(this.fixture.id);
    console.log(this.player.squadId.playerId);
    this._bottomSheetRef.dismiss()
    event.preventDefault();
  }

}
