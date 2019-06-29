import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Observable } from 'rxjs';
import { Player } from '../model/Player';

@Injectable()
export class PlayerResolver implements Resolve<Observable<Player[]>> {
  constructor(private playerService : PlayerService) {}

  resolve() {
    return this.playerService.findAll();
  }
}