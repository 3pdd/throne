const { doc, addDoc, collection } = require('firebase/firestore')
const db = require('../database');


//add real bathrooms into the 'data' array below
const data = [
  {
    name: 'new test',
    latitude: 40.73066,
    longitude: -73.935222
  },
  {
    name: 'another new test',
    latitude: 40.73067,
    longitude: -73.935221
  }
]

const addRestrooms = async () => {
  try {
    const restroomsRef = collection(db, 'NYC');
    data.forEach(bathroom => {
      addDoc(restroomsRef, bathroom)
    })

  } catch (error) {
    console.error('Error adding restrooms:', error);
    throw error;
  }
}

addRestrooms();