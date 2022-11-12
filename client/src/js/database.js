import { openDB } from 'idb';

let storeName = 'jate';
let editorKey = 'editor';

const initdb = async () => {
  console.log('Opening db!');
  await openDB(storeName, 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains(storeName)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(storeName);
      console.log('jate database created');
    },
  });
};

initdb();

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const db = await openDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const request = store.put(content, editorKey);

  const result = await request;
  console.log(' data saved to db', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');
  const db = await openDB(storeName);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const request = store.get(editorKey);

  const result = await request;
  console.log('result.value', result);
  return result;
};
