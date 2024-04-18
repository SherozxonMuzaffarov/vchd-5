const mongoose = require('mongoose');

const Vu90UTYModel = require('../../../models/gildirakSexi/vu90UTY');
const Vu90SOBModel = require('../../../models/gildirakSexi/vu90SOB');
const Vu90KZXModel = require('../../../models/gildirakSexi/vu90KZX');

module.exports = {
    create: async (req, res) => {
        const { status } = req.body;
        try {
              
            if (status == 'ЎТЙ') {
                let model = await Vu90UTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СОБ') {
                let model = await Vu90SOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (status == 'СНГ') {
                let model = await Vu90KZXModel.create({
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
                model = await Vu90UTYModel
                    .find({status})
                    .populate('vu53_register_number', 'register_number')
                    .populate('master', 'name')
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СОБ') {
                model = await Vu90SOBModel
                    .find({status})
                    .populate('inspector', 'name')
                    .sort({ createdAt: -1 });
            } else if (status == 'СНГ') {
                model = await Vu90KZXModel
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
                model = await Vu90UTYModel.findById(id)
            } else if (status == 'СОБ') {
                model = await Vu90SOBModel.findById(id);
            } else if (status == 'СНГ') {
                model = await Vu90KZXModel.findById(id);
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
                updatedModel = await Vu90UTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СОБ') {
                updatedModel = await Vu90SOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СНГ') {
                updatedModel = await Vu90KZXModel.findByIdAndUpdate(
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
