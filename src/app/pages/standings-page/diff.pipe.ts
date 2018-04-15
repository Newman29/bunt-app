import { Pipe, PipeTransform } from '@angular/core';
import { StandingsElement } from './standings-table.component';

@Pipe({
  name: 'diff',
  pure: true
})
export class DiffPipe implements PipeTransform {

  transform(element: StandingsElement): number {
    return element.runsScored - element.runsAllowed;
  }

}
