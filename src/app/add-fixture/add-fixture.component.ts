import { Component } from '@angular/core';
import { Fixture } from '../model/Fixture';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from '../model/player';
import { FixtureService } from '../services/fixture.service';
@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent {
  fixtureForm = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    level: new FormControl(''),
    opposition: new FormControl('')
  });
  filteredPlayers: Observable<Player[]>;
  newFixture: Fixture = new Fixture();
  squadPlayers: Player[] = new Array();

  constructor(public addFixtureDialogRef: MatDialogRef<AddFixtureComponent>, private fixtureService: FixtureService) {
    this.fixtureForm.controls['time'].setValue(this.newFixture.time);
  }
  public setFixtureTime(event) {
    this.fixtureForm.controls['time'].setValue(event.value);
  }

  public onSubmit() {
    this.newFixture.date = this.fixtureForm.controls['date'].value.format("YYYY-MM-DD");
    this.newFixture.time = this.fixtureForm.controls['time'].value;
    this.newFixture.opposition = this.fixtureForm.controls['opposition'].value;
    this.newFixture.level = this.fixtureForm.controls['level'].value;
    this.fixtureService.save(this.newFixture).subscribe(data => {
      this.addFixtureDialogRef.close(data);
    });
  }

  public onCancel() {
    this.addFixtureDialogRef.close(null);
  }
}
