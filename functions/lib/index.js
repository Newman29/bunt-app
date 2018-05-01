"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
exports.seedSchedule = functions.https.onRequest((req, res) => {
    admin.initializeApp();
    const db = admin.firestore();
    fs.readFile('./data/schedule-seed.json', (err, data) => {
        const schedule = JSON.parse(data.toString());
        const teamsRef = db.collection('teams');
        const gamesRef = db.collection('games');
        // Seed data is the initial set of games without a home team object
        // Each team's "key" is the coach's/captain's name
        // We need to populate the home and away team data based on the coach's/captain's name
        db.collection('teams').get()
            .then((teams) => {
            // build team data based on coach as a key and data as the value
            const teamsByCaptain = {};
            teams.forEach((team) => {
                teamsByCaptain[team.data().captain] = team.data();
            });
            let count = 0;
            schedule.forEach((game) => {
                game.home = game.homeCaptain !== 'TBD' ? teamsByCaptain[game.homeCaptain] : {};
                game.away = game.awayCaptain !== 'TBD' ? teamsByCaptain[game.awayCaptain] : {};
                gamesRef.doc(game.field.toLowerCase() + game.datetime.toString()).set(game).then((val) => {
                    count++;
                    console.log(`Successfully written ${count} of ${schedule.length} entries`);
                });
            });
        }, (error) => {
            console.log('Error retreiving teams from Firestore');
            console.log(error);
        });
    });
    res.status(200).end();
});
exports.seedTeams = functions.https.onRequest((req, res) => {
    admin.initializeApp();
    const db = admin.firestore();
    const teamsRef = db.collection('teams');
    return res.status(200).end();
});
exports.updateCharities = functions.https.onRequest((req, res) => {
    fs.readFile('./data/charities.json', (err, data) => {
        admin.initializeApp();
        const db = admin.firestore();
        const teamsRef = db.collection('teams');
        const charities = JSON.parse(data.toString());
        ;
        charities.forEach((c) => {
            teamsRef.doc(c.coach.toString()).set({
                cause: c
            }, { merge: true });
        });
    });
    return res.status(200).end();
});
//# sourceMappingURL=index.js.map