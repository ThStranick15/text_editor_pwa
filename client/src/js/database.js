import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate',1)

  const store = db.transaction('jate','readwrite').objectStore('jate')

  await store.put({id:1, content})

  return content
}
  //console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate',1)

  const store = db.transaction('jate','readwrite').objectStore('jate')

  const data = await store.get(1)

  return data.content
}
  //console.error('getDb not implemented');

initdb();
