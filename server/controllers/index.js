const models = require('../models');

module.exports = {

  getRestrooms: async (req, res) => {
    try {
      const restrooms = await models.getAllRestrooms();
      res.status(200).json(restrooms);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while retrieving restrooms.' });
    }
  }
}