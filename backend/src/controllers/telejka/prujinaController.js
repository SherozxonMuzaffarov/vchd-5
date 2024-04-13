const mongoose = require('mongoose');

const PrujinaUTYModel = require('../../../models/telejka/prujinaUTY');
const PrujinaSOBModel = require('../../../models/telejka/prujinaSOB');
const PrujinaKZXModel = require('../../../models/telejka/prujinaKZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await PrujinaUTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await PrujinaSOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'КЗХ') {
                let model = await PrujinaKZXModel.create({
                    ...req.body,
                    depo: 'ВЧД-6'
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
        try {
            let model;
            if (status == 'ЎТЙ') {
                model = await PrujinaUTYModel
                    .find({status})
                    .populate('brigader', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СОБ') {
                model = await PrujinaSOBModel
                    .find({status})
                    .populate('brigader', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'КЗХ') {
                model = await PrujinaKZXModel
                    .find({status})
                    .populate('brigader', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
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
                model = await PrujinaUTYModel.findById(id)
            } else if (status == 'СОБ') {
                model = await PrujinaSOBModel.findById(id);
            } else if (status == 'КЗХ') {
                model = await PrujinaKZXModel.findById(id);
            }

            if (!model) {
                return res.status(404).json({ message: 'Record not found' });
            }

            res.json(model);
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
                updatedModel = await PrujinaUTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await PrujinaSOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'КЗХ') {
                updatedModel = await PrujinaKZXModel.findByIdAndUpdate(
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
