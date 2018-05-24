import { firestore } from './index';
import { getCollectionData } from './collections';
import { TEAMS_COLLECTION, GAMES_COLLECTION } from './constants';
import { WriteBatch, CollectionReference } from '@google-cloud/firestore';
import * as _ from 'lodash';

export async function updateRecords() {
  const batch = firestore.batch();

  // 0. Get all teams, create TeamRecords for each
  const teams = await getCollectionData(TEAMS_COLLECTION);
  const teamRecords = teams.reduce((records, team) => {
    const key = team.id;
    records[key] = new TeamRecord(team.id, team.name, team.short, team.league);
    return records;
  }, {});
  
  // 1. Iterate through each game of the schedule
  // 2. Pull out the games that have been completed
  const completedQuery = await firestore.collection(GAMES_COLLECTION)
    .where('final', '==', true)
    .get();

  const completedSchedule = completedQuery.docs.map(doc => doc.data());
    
  // 3. Crunch W/L/T/PCT/RS/RA/DIFF for each team
  completedSchedule.forEach(game => {
    const awayRecord = teamRecords[game.awayId];
    const awayScore = game.awayScore;
    const homeRecord = teamRecords[game.homeId];
    const homeScore = game.homeScore;

    updateRecordByResult(awayScore, awayRecord, homeScore, homeRecord);
  })
  
  // 4. Calculate ranking based on league
  calculateRankings(teamRecords);

  teams.forEach(team => {
    const record = teamRecords[team.id];

    console.log(`
    Team: ${record.short}, ${record.league}
    W: ${record.wins}
    L: ${record.losses}
    T: ${record.ties}
    GP: ${record.gamesPlayed}
    PCT: ${record.winPct}
    RS: ${record.runsScored}
    RA: ${record.runsAllowed}
    DIFF: ${record.runDifferential}
    LREC: ${record.leagueWins} - ${record.leagueLosses} - ${record.leagueTies}
    `);

    writeRecord(batch, record);
  })
  // 5. Run rankings through a tiebreaker, adjust if necessary
  // 6. Format and write to db
  batch.commit()
  return console.log(`standings done`);
}

function writeRecord(batch: WriteBatch, teamRecord: TeamRecord, collection?: CollectionReference): void {
  // Use default reference if none passed in
  const collectionReference = typeof collection !== 'undefined' ? collection : firestore.collection('standings');
  console.log('Writing document into the standings collection...');
  batch.set(collectionReference.doc(teamRecord.id.toString()), teamRecord.toDocument());
}

function calculateRankings(records: any) {
  console.log('TODO: calcluating rankings');
}

function updateRecordByResult(
  awayScore: number,
  away: TeamRecord,
  homeScore: number,
  home: TeamRecord
) {
  if (homeScore === awayScore) {
    home.tiedWith(away, homeScore);
    away.tiedWith(home, awayScore);
  } else if (homeScore > awayScore) {
    home.beat(away, homeScore, awayScore);
    away.lostTo(home, awayScore, homeScore);
  } else {
    away.beat(home, awayScore, homeScore);
    home.lostTo(away, homeScore, awayScore);
  }
}
/**
 * Good helper functions for team records
 */
class TeamRecord {
  public leagueRank = 0;  // having a zero rank means no rank has been calculated or can be determined
  public runsScored = 0;
  public runsAllowed = 0;

  private winsAgainst = [];
  private lossesTo = [];
  private tiesWith = [];

  /**
   * 
   * @param id The id of the team
   * @param name The full name of the team
   * @param short The short abbrv. of the team name
   */
  constructor(
    public id: string,
    public name: string,
    public short: string,
    public league: string
  ) {}
  
  public get wins(): number {
    return this.winsAgainst.length;
  }
  public get leagueWins(): number {
    return this.winsAgainst.filter(team => team.league === this.league).length;
  }
  public get losses(): number {
    return this.lossesTo.length;
  }
  public get leagueLosses(): number {
    return this.lossesTo.filter(team => team.league === this.league).length;
  }
  public get ties(): number {
    return this.tiesWith.length;
  }
  public get leagueTies(): number {
    return this.tiesWith.filter(team => team.league === this.league).length;
  }
  public get gamesPlayed(): number {
    return this.wins + this.losses + this.ties;
  }
  public get leagueGamesPlayed(): number {
    return this.leagueWins + this.leagueTies + this.leagueLosses;
  }
  public get winPct(): number {
    // Can't divide by zero, otherwise the universe will implode.
    if (this.gamesPlayed === 0) {
      return 0;
    }
    return (this.wins + (0.5 * this.ties)) / this.gamesPlayed;
  }
  public get leagueWinPct(): number {
    // Can't divide by zero, otherwise the universe will implode.
    if (this.leagueGamesPlayed === 0) {
      return 0;
    }
    return (this.leagueWins + (0.5 * this.leagueTies)) / this.leagueGamesPlayed;
  }
  public get runDifferential(): number {
    return this.runsScored - this.runsAllowed;
  }
  public beat(team: TeamRecord, runsScored: number, runsAllowed: number): void {
    this.winsAgainst.push(team);
    this.runsScored += runsScored;
    this.runsAllowed += runsAllowed;
  }
  public lostTo(team: TeamRecord, runsScored: number, runsAllowed: number): void {
    this.lossesTo.push(team);
    this.runsScored += runsScored;
    this.runsAllowed += runsAllowed;
  }
  public tiedWith(team: TeamRecord, runs: number): void {
    this.tiesWith.push(team);
    this.runsScored += runs;
    this.runsAllowed += runs;
  }
  public hasWonAgainst(team: TeamRecord): boolean {
    return team.id in this.winsAgainst.map(t => t.id) ? true : false;
  }
  public hasLostTo(team: TeamRecord): boolean {
    return team.id in this.lossesTo.map(t => t.id) ? true : false;
  }
  public hasTiedWith(team: TeamRecord): boolean {
    return team.id in this.tiesWith.map(t => t.id) ? true : false;
  }
  // TODO
  public hasTiebreakAgainst(team: TeamRecord): boolean {
    // TODO
    return false;
  }

  public toDocument() {
    return {
      id: this.id,
      short: this.short,
      name: this.name,
      rank: this.leagueRank,
      wins: this.wins,
      losses: this.losses,
      ties: this.ties,
      gp: this.gamesPlayed,
      winPct: this.winPct,
      rs: this.runsScored,
      ra: this.runsAllowed,
      diff: this.runDifferential,
      league: {
        division: this.league,
        wins: this.leagueWins,
        losses: this.leagueLosses,
        ties: this.leagueTies,
        gp: this.leagueGamesPlayed,
        winPct: this.leagueWinPct
      }
    }
  }
}