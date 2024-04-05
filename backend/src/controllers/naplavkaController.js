const mongoose = require('mongoose');

const NaplavkaUTYModel = require('../../models/naplavkaUTY');
const NaplavkaSOBModel = require('../../models/naplavkaSOB');
const NaplavkaKZXModel = require('../../models/naplavkaKZX');

module.exports = {
    create: async (req, res) => {
        const { vu53_status } = req.body;
        try {
              
            if (vu53_status == 'ЎТЙ') {
                let model = await NaplavkaUTYModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (vu53_status == 'СОБ') {
                let model = await NaplavkaSOBModel.create({
                    ...req.body,
                    depo: 'ВЧД-6',
                });
                res.json(model);
            } else if (vu53_status == 'КЗХ') {
                let model = await NaplavkaKZXModel.create({
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
        const vu53_status = req.query.status;
        try {
            let model;
            if (vu53_status == 'ЎТЙ') {
                model = await NaplavkaUTYModel
                    .find({vu53_status})
                    .populate('vu53_register_number', 'register_number')
                    .populate('brigader_name', 'name')
                    .populate('svarchik_name', 'name')
                    .populate('tokar_name', 'name')
                    .populate('defektoskopist_name', 'name')
                    .populate('receptionist_name', 'name')
                    .sort({ createdAt: -1 });
            } else if (vu53_status == 'СОБ') {
                model = await NaplavkaSOBModel
                    .find({vu53_status})
                    .populate('vu53_register_number', 'register_number')
                    .populate('brigader_name', 'name')
                    .populate('svarchik_name', 'name')
                    .populate('tokar_name', 'name')
                    .populate('defektoskopist_name', 'name')
                    .populate('receptionist_name', 'name')
                    .sort({ createdAt: -1 });
            } else if (vu53_status == 'КЗХ') {
                model = await NaplavkaKZXModel
                    .find({vu53_status})
                    .populate('vu53_register_number', 'register_number')
                    .populate('brigader_name', 'name')
                    .populate('svarchik_name', 'name')
                    .populate('tokar_name', 'name')
                    .populate('defektoskopist_name', 'name')
                    .populate('receptionist_name', 'name')
                    .sort({ createdAt: -1 });;
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
                model = await NaplavkaUTYModel.findById(id);
            } else if (status == 'СОБ') {
                model = await NaplavkaSOBModel.findById(id);
            } else if (status == 'КЗХ') {
                model = await NaplavkaKZXModel.findById(id);
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
            const vu53_status = req.body.vu53_status 
           
            let updatedModel;
            if (vu53_status == 'ЎТЙ') {
                updatedModel = await NaplavkaUTYModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (vu53_status == 'СОБ') {
                updatedModel = await NaplavkaSOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (vu53_status == 'КЗХ') {
                updatedModel = await NaplavkaKZXModel.findByIdAndUpdate(
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
