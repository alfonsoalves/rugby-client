import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Fixture } from '../model/Fixture';
import { FixtureService } from '../services/fixture.service';
import { Squad } from '../model/Squad';
import { Player } from '../model/Player';

@Component({
  selector: 'fixture-uploader',
  templateUrl: './fixture-uploader.component.html',
  styleUrls: ['./fixture-uploader.component.css']
})
export class FixtureUploaderComponent implements OnInit {

  fileToUpload: File = null;
  
  @Input() fixture:Fixture;
  @Input() players:Player[];
  public uploader:FileUploader;
  private fixtureService: FixtureService;
  constructor() { }

  ngOnInit() {
    this.uploader = new FileUploader({url: 'https://skylight-riddle-thistle.herokuapp.com/upload-team-sheet?fixtureId=' + this.fixture.id + '&level=' + this.fixture.level, itemAlias: 'team-sheet'})
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
      let data = JSON.parse(response)
      for (let squad in data.squad) {
        let tempSquadMember = new Squad(data.squad[squad]);
        tempSquadMember.player = this.players.filter(p => {return p.id == tempSquadMember.squadId.playerId})[0];
        this.fixture.squad.push(tempSquadMember);
      }
      for (let squad in data.newPlayers) {
        let p = new Player();
        p.id = data.newPlayers[squad].id;
        p.name = data.newPlayers[squad].name;
        this.players.push(p);
      }
    }
  }


}
