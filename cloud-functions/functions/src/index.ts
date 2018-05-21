import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as fs from 'fs';
import { resolve } from 'dns';
import { TEAMS_COLLECTION, GAMES_COLLECTION } from './constants';

admin.initializeApp();
const firestore = admin.firestore();

export const updateTeamName = functions.firestore.document('teams/{docId}').onUpdate(async (change, context) => {
  return updateScheduleAfterTeamNameChange(change, context);
});

/**
 * params: collection and collection_destination
 */
export const backupCollection = functions.https.onRequest(async (req, res) => {
  // Punt on any errors
  if (typeof req.query.collection === 'undefined' || req.query.collection === '') {
    console.log(`No collection name detected in parameters, please specify a collection to backup`);
    return res.status(504).end();
  }

  const now = new Date(Date.now());
  await duplicateCollection(req.query.collection, req.query.collection + '_' + now.toISOString() + '_backup');
  return res.status(200).end();
});

export async function duplicateCollection(collection, newCollectionName) {
  const batch = firestore.batch();
  const collectionData = await firestore.collection(collection).get();
  const newCollectionRef = firestore.collection(newCollectionName);
  let docCount = 0;

  collectionData.forEach(doc => {
    batch.create(newCollectionRef.doc(doc.id), doc.data());
    console.log(`Creating a new document with id ${doc.id}.`)
    docCount++;
  })

  await batch.commit();
  console.log(`Successfully backed up collection '${collection}' (${docCount} documents) to '${newCollectionName}'.`);
}
export async function updateScheduleAfterTeamNameChange(change, context) {
  const batch = firestore.batch();
  const scheduleRef = firestore.collection(GAMES_COLLECTION);

  // Team id is not the doc id, it is a field in the doc
  const teamId = change.after.get('id');
  const newName = change.after.get('name');
  const oldName = change.before.get('name');
  const nameChanged = newName !== oldName;

  if (nameChanged) {
    try {
      const schedule = await getScheduleForTeam(teamId);
      let updatedGamesCount = 0;
      
      if (schedule.length === 0) {
        // No games found, punt (probably shouldn't happen)
        console.log(`No games found for team with id: ${teamId}`)
      }

      // Go through each game and update the home or away team to match
      schedule.forEach(game => {
        const gameDocId = game.id;

        // Update each 'away' and 'home' name fields to the new name
        if (game.get('awayId') === teamId) {
          batch.update(scheduleRef.doc(gameDocId), { 'away' : newName });
          updatedGamesCount++;
          console.log(`Updated ${gameDocId} 'away' field with ${newName}`);
        } else if (game.get('homeId') === teamId) {
          batch.update(scheduleRef.doc(gameDocId), { 'home' : newName });
          updatedGamesCount++;
          console.log(`Updated ${gameDocId} 'home' field with ${newName}`);
        }
      });

      await batch.commit();
      return console.log(`Successfully updated ${updatedGamesCount} games in the schedule by replacing all instances of ${oldName} with ${newName}.`)
    } catch (err) {
      // Make a little better than this.
      console.log(`Failed to update games collection. Parameters: change ${change} and context ${context}. Error: ${err}`);
    }
  } else {
    // No name change, punt.
    return console.log('Document update triggered but no name change is detected. Not updating schedule.');
  }
}

async function getScheduleForTeam(teamId: number) {
  const awaySchedule = await firestore.collection(GAMES_COLLECTION).where('awayId', '==', teamId).get();
  const homeSchedule = await firestore.collection(GAMES_COLLECTION).where('homeId', '==', teamId).get();
  
  if (awaySchedule.empty && homeSchedule.empty) {
    console.log(`No games found for team with id: ${teamId}`);
    return [];
  }

  // I'm not even sure if I need to do this, consider removing. TODO
  const awayData = awaySchedule.docs.map(snapshot => snapshot);
  const homeData = homeSchedule.docs.map(snapshot => snapshot);

  // Send schedule back as one since logical OR queries do not exist yet for Firestore
  return awayData.concat(homeData);
}
