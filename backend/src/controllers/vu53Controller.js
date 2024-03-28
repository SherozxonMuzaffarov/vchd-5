const Vu53UTYModel = require('../../models/vu53UTY');
const Vu53SOBModel = require('../../models/vu53SOB');
const Vu53KZXModel = require('../../models/vu53KZX');
const Vu53ExpenseModel = require('../../models/vu53Expense');

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
    createExpense: async (req, res) => {
        try {
              
            let createdModel = await Vu53ExpenseModel.create(req.body);

            let updatedModel = await Vu53UTYModel.findByIdAndUpdate(
                {id: req.body.vagon},
                {is_used: true, expense: createdModel._id},
                { new: true }
            );
            
            
            if (!updatedModel) {
                let nestedUpdatedModel = await Vu53SOBModel.findByIdAndUpdate(
                    {id: req.body.vagon},
                    {is_used: true, expense: createdModel._id},
                    { new: true }
                );

                if (!nestedUpdatedModel) {
                    let twiceNestedUpdatedModel = await Vu53KZXModel.findByIdAndUpdate(
                        {id: req.body.vagon},
                        {is_used: true, expense: createdModel._id},
                        { new: true }
                    ); 
                    if (!twiceNestedUpdatedModel) {
                        return res.status(404).json({ message: 'Model not found' });
                    } else {
                        res.send(twiceNestedUpdatedModel);
                    }
                } else {
                    res.send(nestedUpdatedModel);
                }
            } else {
                res.send(updatedModel);
            }

            if (!updatedModel) {
                return res.status(404).json({ message: 'Model not found' });
            }

            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getAll: async (req, res) => {
        const status = req.query.status;
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
        const {id, status} = req.params;
        try {
            let model;
            if (status == 'ЎТЙ') {
                model = await Vu53UTYModel.findById(id).populate('vagon', 'nomer');
            } else if (status == 'СОБ') {
                model = Vu53SOBModel.findById(id).populate('vagon', 'nomer');
            } else if (status == 'КЗХ') {
                model = await Vu53KZXModel.findById(id).populate('vagon', 'nomer');
            }

            if (!model) {
                return res.status(404).json({ message: ' Record not found' });
            }

            res.send(model);
        } catch (error) {
            throw error;
        }
    },
    update: async (req, res) => {
        
        try {

            const { id } = req.params;
            const status = req.body.status 
           
            let updatedModel;
            if (status == 'ЎТЙ') {
                updatedModel = await Vu53UTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await Vu53SOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'КЗХ') {
                updatedModel = await Vu53KZXModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            }

            if (!updatedModel) {
                return res.status(404).json({ message: 'Model not found' });
            }

            res.send(updatedModel);
        } catch (error) {
            throw error;
        }
    },
};
