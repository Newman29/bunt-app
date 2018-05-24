import { Pipe, PipeTransform } from '@angular/core';
import { StandingsRecord } from '../../shared/services/standings.service';

@Pipe({
  name: 'pct',
  pure: true
})
export class PctPipe implements PipeTransform {

  transform(pct: number, decimals: number = 3): any {
    const pctStr = Number(pct).toFixed(decimals).toString();

    // Strip off the leading 0 if there is one
    if (pctStr.charAt(0) === '0') {
      return pctStr.substr(1);
    }

    return pctStr;
  }

}
