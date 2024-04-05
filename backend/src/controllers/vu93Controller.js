const mongoose = require('mongoose');

const Vu93UTYModel = require('../../models/vu93UTY');
const Vu93SOBModel = require('../../models/vu93SOB');
const Vu93KZXModel = require('../../models/vu93KZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await Vu93UTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await Vu93SOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'КЗХ') {
                let model = await Vu93KZXModel.create({
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
                model = await Vu93UTYModel
                    .find({status})
                    .populate('repairman', 'name')
                    .populate('master', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СОБ') {
                model = await Vu93SOBModel
                    .find({status})
                    .populate('repairman', 'name')
                    .populate('master', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'КЗХ') {
                model = await Vu93KZXModel
                    .find({status})
                    .populate('repairman', 'name')
                    .populate('master', 'name')
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
                model = await Vu93UTYModel.findById(id)
            } else if (status == 'СОБ') {
                model = await Vu93SOBModel.findById(id);
            } else if (status == 'КЗХ') {
                model = await Vu93KZXModel.findById(id);
            }

            if (!model) {
                return res.status(404).json({ message: ' Record not found' });
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
                updatedModel = await Vu93UTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await Vu93SOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'КЗХ') {
                updatedModel = await Vu93KZXModel.findByIdAndUpdate(
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
