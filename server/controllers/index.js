const models = require('../models');
const axios = require('axios');
const apiKey = 'AIzaSyC3cCZGHIckECdm4WZ4Tj4HyROrniXCsMI';


module.exports = {

  getRestrooms: async (req, res) => {
    try {
      const restrooms = await models.getAllRestrooms();
      res.status(200).json(restrooms);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while retrieving restrooms.' });
    }
  },

  fetchCoordinatesForAddress: async (req, res) => {
    const { address } = req.params;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const coordinates = {
          latitude: location.lat,
          longitude: location.lng,
        };
        res.json(coordinates);
      } else {
        res.status(404).json({ error: 'Coordinates not found for the provided address' });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
  }

}

