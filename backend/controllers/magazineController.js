const magazineService = require('../services/magazineService');

const getAllMagazines = async (req, res) => {
  try {
    const magazines = await magazineService.getMagazines();
    res.json(magazines);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const uploadMagazine = async (req, res) => {
  try {
    const { issueNumber, issueMonth, magazineUrl, uploadedBy } = req.body;
    await magazineService.addMagazine({ issueNumber, issueMonth, magazineUrl, uploadedBy });
    res.status(201).send('Magazine uploaded successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getAllMagazines, uploadMagazine };
