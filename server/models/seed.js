const { doc, addDoc, collection } = require('firebase/firestore')
const db = require('../database');
const axios = require('axios')
const { data } = require('../../data.js')

const addRestroom = async (newRestroom) => {
  try {
    const restroomsRef = collection(db, 'NYC');
    addDoc(restroomsRef, newRestroom)
  } catch (error) {
    console.error('Error adding restrooms:', error);
    throw error;
  }
}

const getLatLon = () => {
  data.forEach(loc => {
    axios.get(`http://localhost:3000/coordinates/${loc.address}`)
      .then(res => {
        return (
          {
            name: loc.name,
            latitude: res.data.latitude,
            longitude: res.data.longitude
          }
        )
      })
      .then(res => {
        addRestroom(res)
      })
  })
}

getLatLon();
