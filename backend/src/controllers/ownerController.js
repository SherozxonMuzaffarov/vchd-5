const Owner = require("../../models/Owner");

module.exports = {
    getAll: async (req, res) => {
      try {
        let model = await Owner.find({})
        res.send(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ name: 'Internal Server Error' });
      }
    },
  
    getOne: async (req, res) => {
      try {
        let model = await Owner.findById(req.params.id);
  
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
        let { name } = req.body;
  
        let model = await Owner.create({ name });
  
        res.json(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    update: async (req, res) => {
      try {
        const { id } = req.params;
  
        const { name } = req.body;
  
        const updatedModel = await Owner.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );
  
        if (!updatedModel) {
          return res.status(404).json({ message: 'Owner not found' });
        }
  
        res.send(updatedModel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    delete: async (req, res) => {
      try {
        const { id } = req.params;
  
        const deletedRowCount = await Owner.findByIdAndDelete(id);
  
        if (!deletedRowCount) {
          return res.status(404).json({ message: 'Owner not found' });
        }
  
        res.json(deletedRowCount);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };
