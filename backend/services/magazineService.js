const { db } = require('../config/firebase');
const Magazine = require('../models/Magazine');

const getMagazines = async () => {
  const snapshot = await db.collection('magazines').get();
  let magazines = [];
  snapshot.forEach((doc) => {
    magazines.push({ id: doc.id, ...doc.data() });
  });
  return magazines;
};

const addMagazine = async (magazineData) => {
  const magazine = new Magazine(magazineData);
  await magazine.save();
};

module.exports = { getMagazines, addMagazine };
