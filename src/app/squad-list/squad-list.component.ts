import { Component, OnInit } from '@angular/core';
import { Squad } from '../model/Squad';
import { SquadService } from '../services/squad.service';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.css']
})
export class SquadListComponent implements OnInit {

  squads: Squad[];

  constructor(private squadService: SquadService) { }

  ngOnInit() {
    this.squadService.findAll().subscribe(data => {
      this.squads = data;
    });
  }

}
