const Vu53UTYModel = require('../../models/vu53UTY');
const Vu53SOBModel = require('../../models/vu53SOB');
const Vu53KZXModel = require('../../models/vu53KZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await Vu53UTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await Vu53SOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'КЗХ') {
                let model = await Vu53KZXModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getAll: async (req, res) => {
        const status = req.query.status;
        console.log("status: " + status);
        try {
            let model;
            if (status == 'ЎТЙ') {
                model = await Vu53UTYModel.find({status}).populate('vagon', 'nomer').sort({ register_number: -1 });
            } else if (status == 'СОБ') {
                model = await Vu53SOBModel.find({status}).populate('vagon', 'nomer').sort({ register_number: -1 });
            } else if (status == 'КЗХ') {
                model = await Vu53KZXModel.find({status}).populate('vagon', 'nomer').sort({ register_number: -1 });
            }

            if (!model) {
                return res.status(404).json({ message: ' Record not found' });
            }

            res.send(model);
        } catch (error) {
            throw error;
        }
    },
    getOne: async (req, res) => {
        try {
            let model = await Vu53UTYModel.findById(req.params.id);

            if (!model) {
                return res.status(404).json({ message: `${req.params.id} id record not found` });
            }

            res.send(model);
        } catch (error) {
            throw error;
        }
    },
    update: async (req, res) => {
        try {

            const { id } = req.params;
            const {
                register_number,
                registerTime,
                type,
                number,
                defective,
                oSYear,
                last_repair,
                buksa,
                diameter
            } = req.body;
            
            let updatedModel = await VagonModel.findByIdAndUpdate(
                id,
                {
                    register_number,
                    registerTime,
                    type,
                    number,
                    defective,
                    oSYear,
                    last_repair,
                    buksa,
                    diameter,
                },
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'Model not found' });
            }

            res.send(updatedModel);

            const updatedVu53 = await Vu53UTYModel.findByIdAndUpdate(id, newData, { new: true });
            return updatedVu53;
        } catch (error) {
            throw error;
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            let deletedModel = await Vu53UTYModel.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'Model not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            throw error;
        }
    }
};
