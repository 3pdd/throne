const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where, deleteDoc, arrayUnion } = require('firebase/firestore')
const db = require('../database');

module.exports = {

  getAllRestrooms: async () => {
    try {
      const restroomsRef = collection(db, 'NYC');
      const snapshot = await getDocs(restroomsRef);

      const restrooms = [];
      snapshot.forEach((doc) => {
        restrooms.push(doc.data());
      });

      return restrooms;
    } catch (error) {
      console.error('Error getting restrooms:', error);
      throw error;
    }
  }

}