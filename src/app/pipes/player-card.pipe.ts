import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../model/card';
import { Squad } from '../model/Squad';
import { Player } from '../model/Player';
import { CardType } from '../model/card-type.enum';
import { Utilities } from '../utilities';

@Pipe({
  name: 'playerCard'
})
export class PlayerCardPipe implements PipeTransform {

  transform(value: Card[], ...args: any[]): boolean {
    var player:Player = args[0];
    var squad:Squad = args[1];
    var cardType:CardType = Utilities.getCardTypeForCode(args[2]);
    let playerId = squad.realPlayerId ? squad.realPlayerId : player.id;
    return value.filter(card => card.playerId == playerId && card.cardType == cardType).length > 0;
  }

}
