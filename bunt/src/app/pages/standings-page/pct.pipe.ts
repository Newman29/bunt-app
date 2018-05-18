import { Pipe, PipeTransform } from '@angular/core';
import { StandingsElement } from './standings-table.component';

@Pipe({
  name: 'pct',
  pure: true
})
export class PctPipe implements PipeTransform {

  transform(element: StandingsElement, decimals: number = 3): any {
    const totalGames = element.wins + element.ties + element.losses;
    const winPts = element.wins + 0.5 * element.ties;

    const pctStr = (winPts / totalGames).toFixed(decimals).toString();

    // Strip off the leading 0 if there is one
    if (pctStr.charAt(0) === '0') {
      return pctStr.substr(1);
    }

    return pctStr;
  }

}
