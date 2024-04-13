const mongoose = require('mongoose');

const TyagaUTYModel = require('../../../models/telejka/tyagaUTY');
const TyagaSOBModel = require('../../../models/telejka/tyagaSOB');
const TyagaKZXModel = require('../../../models/telejka/tyagaKZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await TyagaUTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await TyagaSOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'КЗХ') {
                let model = await TyagaKZXModel.create({
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
                model = await TyagaUTYModel
                    .find({status})
                    .populate('brigader', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СОБ') {
                model = await TyagaSOBModel
                    .find({status})
                    .populate('brigader', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'КЗХ') {
                model = await TyagaKZXModel
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
                model = await TyagaUTYModel.findById(id)
            } else if (status == 'СОБ') {
                model = await TyagaSOBModel.findById(id);
            } else if (status == 'КЗХ') {
                model = await TyagaKZXModel.findById(id);
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
                updatedModel = await TyagaUTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await TyagaSOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'КЗХ') {
                updatedModel = await TyagaKZXModel.findByIdAndUpdate(
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
