import { firestore } from './index';

/**
 * 
 * @param collection The collection string to duplicate/backup
 * @param newCollectionName The collection name to backup into (will overwrite existing collections!)
 */
export async function duplicateCollection(collection: string, newCollectionName: string) {
  if (collection === newCollectionName) {
    return console.log(`The new collection name must be different than the original.`);
  }

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
  return console.log(`Successfully backed up collection '${collection}' (${docCount} documents) to '${newCollectionName}'.`);
}

/**
 * An async helper to get data from all docs in a collection
 * @param collection The collection name to retrieve data from
 */
export async function getCollectionData(collection: string) {
  const snapshot = await firestore.collection(collection).get();

  return snapshot.docs.map(doc => doc.data());
}