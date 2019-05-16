/**
 * Keep Cloud Functions nice and light. Move support methods elsewhere. This should read like an API.
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { TEAMS_COLLECTION, GAMES_COLLECTION } from './constants';
import { duplicateCollection } from './collections';
import { updateScheduleAfterTeamNameChange } from './operations';
import { updateRecords } from './standings';
import { rosters } from '../data/rosters';

/**
 * Setup
 */
admin.initializeApp();
export const firestore = admin.firestore();

// export const updateStandings = functions.firestore.document('games/{gameId}').onUpdate(async (change, context) => {
//   // Make sure to punt if scores are not updated so we don't utilize extra Cloud Function quota
//   calculateStandings();

//   return console.log(`Done calculating the standings.`);
// });

// export const updateStandings = functions.https.onRequest(async (req, res) => {
//   await updateRecords();
//   return res.status(200).end();
// })
/**
 * Will update team names elsewhere in the db when team info gets updated (hopefully very infrequently)
 * e.g. updateTeams({before: { id: 4, name: 'Green Monster'}, after: {id: 4, name: 'Caseydilla and the Salsa Verdes'} }, {params: { docId: 'Casey Turk'}})
 */
export const updateTeams = functions.firestore.document('teams/{docId}').onUpdate(async (change, context) => {
    return updateScheduleAfterTeamNameChange(change, context);
});

/**
 * A nice HTTPS function that will duplicate a collection with a timestamp (will duplicated nested collections to the root)
 */
export const backupCollection = functions.https.onRequest(async (req, res) => {
    // Punt on any errors
    if (typeof req.query.collection === 'undefined' || req.query.collection === '') {
        console.log(`No collection name detected in parameters, please specify a collection to backup`);
        //return res.status(504).end();
        return res.status(504);
    }

    const now = new Date(Date.now());
    await duplicateCollection(req.query.collection, req.query.collection + '_' + now.toISOString() + '_backup');
    //return res.status(200).end();
    return res.status(200);
});

// export const clearScores = functions.https.onRequest(async (req, res) => {
//   // Back things up just in case
//   // const now = new Date(Date.now());
//   // const backupName = GAMES_COLLECTION + '_pre-clear_' + now.toISOString() + '_backup';
//   // try {
//   //   await duplicateCollection(GAMES_COLLECTION, backupName);
//   // } catch (err) {
//   //   console.log(`Error duplicating collection ${GAMES_COLLECTION}`);
//   //   return res.status(504).end();
//   // }

//   const clearScoresObj = {
//     awayScore: '',
//     homeScore: '',
//     final: false
//   };

//   const gamesRef = firestore.collection(GAMES_COLLECTION);
//   updateCollectionDocsWithObject(gamesRef, clearScoresObj);
//   console.log(`Successfully cleared all scores in the schedule.`);
//   return res.status(200).end();
// });

// export const seedScores = functions.https.onRequest(async (req, res) => {
//   const MAX_SCORE = 29;
//   const MIN_SCORE = 4;

//   const batch = firestore.batch();
//   const gamesRef = firestore.collection(GAMES_COLLECTION);
//   const docs = await gamesRef.get();

//   let updateCount = 0;
//   docs.forEach(doc => {
//     if (doc.data().awayId !== 0 && doc.data().homeId !== 0) {
//       // Only seed scores for non-TBA games since we can't associate a score to TBA teams
//       batch.update(gamesRef.doc(doc.id), {
//         awayScore: Math.floor((Math.random() * (MAX_SCORE - MIN_SCORE)) + MIN_SCORE),
//         homeScore: Math.floor((Math.random() * (MAX_SCORE - MIN_SCORE)) + MIN_SCORE),
//         final: true
//       });
//       updateCount++;
//     }
//   });

//   await batch.commit();
//   console.log(`Successfully seeded ${updateCount} games with random scores from ${MIN_SCORE} to ${MAX_SCORE}.`)

//   return res.status(200).end();
// });

// export const seedTeamRosters = functions.https.onRequest(async (req, res) => {
//   const teamsRef = firestore.collection(TEAMS_COLLECTION);

//   const teams = await teamsRef.get();
//   // First clear the rosters

//   teams.forEach(async (team) => {
//     const batch = firestore.batch();
//     // Initialize counters
//     let writeCount = 0;
//     let deleteCount = 0;

//     console.log(`Replacing roster for team: ${team.data().name}...`);
//     const ref = firestore.collection(TEAMS_COLLECTION).doc(team.id).collection('roster');
//     const teamRosterData = rosters[team.data().id]; // should get an array of names for the roster

//     // Delete team roster before replacing
//     const existing = await ref.get();
//     existing.forEach(doc => {
//       const docRef = ref.doc(doc.id);
//       batch.delete(docRef);
//       deleteCount++;
//     })
//     console.log(`Deleted ${deleteCount} documents from roster collection for team: ${team.data().name}`);

//     teamRosterData.forEach(name => {
//       batch.set(teamsRef.doc(team.id).collection('roster').doc(), { name: name });
//       writeCount++;
//     })

//     await batch.commit();
//     console.log(`Wrote ${writeCount} documents to roster collection for team: ${team.data().name}`);
//   });

//   return res.status(200).end();
// });