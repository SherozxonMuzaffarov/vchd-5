require('dotenv').config();
const Employee = require('../../models/employee')

module.exports = {

  getAll: async (req, res) => {
    try {
      const { section } = req.query

      let model = await Employee.find({section: section});
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOne: async (req, res) => {
    try {
      let model = await Employee.findById(req.params.id);

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  create: async (req, res) => {
    try {
        let model = await Employee.create({
            ...req.body,
            depo: 'ВЧД-6',
        });

        res.json(model);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
},

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Employee.findByIdAndDelete(id);

      if (!deletedRowCount) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json(deletedRowCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
