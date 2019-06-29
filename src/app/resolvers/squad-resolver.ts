import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { SquadService } from '../services/squad.service';
import { Observable } from 'rxjs';
import { Squad } from '../model/Squad';

@Injectable()
export class SquadResolver implements Resolve<Observable<Squad[]>> {
  constructor(private squadService : SquadService) {}

  resolve() {
    return this.squadService.findAll();
  }
}