import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as fs from 'fs';
import { resolve } from 'dns';

export const updateTeamsInGames = functions.https.onRequest((req, res) => {
  admin.initializeApp();
  const db = admin.firestore();
  const gamesRef = db.collection('games');
  const teamsRef = db.collection('teams');

  const getTeams = async () => {
    try {
      console.log(await teamsRef.get());
      return await teamsRef.get();
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  console.log(getTeams());
  res.status(200).end();
});

// export const seedSchedules = functions.https.onRequest((req, res) => {
//   admin.initializeApp();
//   const db = admin.firestore();

//   fs.readFile('./data/schedule-seed.json', (err, data) => {
//     const schedule = JSON.parse(data.toString());

//     const teamsRef = db.collection('teams');
//     const gamesRef = db.collection('games');

//     // Seed data is the initial set of games without a home team object
//     // Each team's "key" is the coach's/captain's name
//     // We need to populate the home and away team data based on the coach's/captain's name
//     db.collection('teams').get()
//       .then((teams) => {
//         // build team data based on coach as a key and data as the value
//         const teamsByCaptain = {};

//         teams.forEach((team) => {
//           teamsByCaptain[team.data().captain] = team.data();
//         });

//         let count = 0;
//         schedule.forEach((game) => {
//           game.home = game.homeCaptain !== 'TBD' ? teamsByCaptain[game.homeCaptain] : {};
//           game.away = game.awayCaptain !== 'TBD' ? teamsByCaptain[game.awayCaptain] : {};
//           gamesRef.doc(game.field.toLowerCase() + game.datetime.toString()).set(game).then((val) => {
//             count++;
//             console.log(`Successfully written ${count} of ${schedule.length} entries`);
//           });
//         });
//       }, (error) => {
//         console.log('Error retreiving teams from Firestore');
//         console.log(error);
//       });
//   });

//   res.status(200).end();
// });

// export const seedTeams = functions.https.onRequest((req, res) => {
//   admin.initializeApp();
//   const db = admin.firestore();

//   const teamsRef = db.collection('teams');


//   return res.status(200).end();
// });
// export const updateCharities = functions.https.onRequest((req, res) => {

//   fs.readFile('./data/charities.json', (err, data) => {
//     admin.initializeApp();
//     const db = admin.firestore();
//     const teamsRef = db.collection('teams');
//     const charities = JSON.parse(data.toString());;
    
//     charities.forEach((c) => {
//       teamsRef.doc(c.coach.toString()).set({
//         cause: c
//       }, { merge: true})
//     })
//   });
//   return res.status(200).end();
// });