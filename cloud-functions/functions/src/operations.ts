import { firestore } from './index';
import { GAMES_COLLECTION } from './constants';

export async function updateCollectionDocsWithObject(collectionRef: FirebaseFirestore.CollectionReference, updateObj: any) {
  const batch = firestore.batch();
  const docs = await collectionRef.get();
  
  let updateCount = 0;
  docs.forEach(doc => {
    batch.update(collectionRef.doc(doc.id), updateObj);
    updateCount++;
  });

  await batch.commit();
  console.log(`Successfully updated ${updateCount} documents in the ${collectionRef.path} collection.`);
  return;
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
      const schedule = await getGamesForTeam(teamId);
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
      console.log(`Successfully updated ${updatedGamesCount} games in the schedule by replacing all instances of ${oldName} with ${newName}.`)
      return;
    } catch (err) {
      // Make a little better than this.
      console.log(`Failed to update games collection. Parameters: change ${change} and context ${context}. Error: ${err}`);
    }
  } else {
    // No name change, punt.
    console.log('Document update triggered but no name change is detected. Not updating schedule.');
    return;
  }
}

async function getGamesForTeam(teamId: number) {
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

