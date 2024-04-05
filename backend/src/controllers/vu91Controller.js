const mongoose = require('mongoose');

const Vu91UTYModel = require('../../models/vu91UTY');
const Vu91SOBModel = require('../../models/vu91SOB');
const Vu91KZXModel = require('../../models/vu91KZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await Vu91UTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await Vu91SOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'КЗХ') {
                let model = await Vu91KZXModel.create({
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
                model = await Vu91UTYModel
                    .find({status})
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СОБ') {
                model = await Vu91SOBModel
                    .find({status})
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'КЗХ') {
                model = await Vu91KZXModel
                    .find({status})
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
                model = await Vu91UTYModel.findById(id)
            } else if (status == 'СОБ') {
                model = await Vu91SOBModel.findById(id);
            } else if (status == 'КЗХ') {
                model = await Vu91KZXModel.findById(id);
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
                updatedModel = await Vu91UTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await Vu91SOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'КЗХ') {
                updatedModel = await Vu91KZXModel.findByIdAndUpdate(
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
