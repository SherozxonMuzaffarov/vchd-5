const mongoose = require('mongoose');

const Vu53UTYModel = require('../../../models/gildirakSexi/vu53UTY');
const Vu53SOBModel = require('../../../models/gildirakSexi/vu53SOB');
const Vu53KZXModel = require('../../../models/gildirakSexi/vu53KZX');
const Vu53ExpenseUTYModel = require('../../../models/gildirakSexi/vu53ExpenseUTY');
const Vu53ExpenseSOBModel = require('../../../models/gildirakSexi/vu53ExpenseSOB');
const Vu53ExpenseKZXModel = require('../../../models/gildirakSexi/vu53ExpenseKZX');

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
            } else if (status == 'СНГ') {
                let model = await Vu53KZXModel.create({
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

    createExpense: async (req, res) => {
        try {
            const { vu53_status } = req.body;

            let createdModel;
            let updatedModel;

            if (vu53_status == 'ЎТЙ') {
                createdModel = await Vu53ExpenseUTYModel.create(req.body);
                updatedModel = await Vu53UTYModel.findByIdAndUpdate(
                    {_id: req.body.vu53},
                    {is_used: true, expense: createdModel._id},
                    { new: true }
                );
            } else if (vu53_status == 'СОБ') {
                createdModel = await Vu53ExpenseSOBModel.create(req.body);
                updatedModel = await Vu53SOBModel.findByIdAndUpdate(
                    {_id: req.body.vu53},
                    {is_used: true, expense: createdModel._id},
                    { new: true }
                );
            } else if (vu53_status == 'СНГ') {
                createdModel = await Vu53ExpenseKZXModel.create(req.body);
                updatedModel = await Vu53KZXModel.findByIdAndUpdate(
                    {_id: req.body.vu53},
                    {is_used: true, expense: createdModel._id},
                    { new: true }
                );
            }
            if (!updatedModel) {
                return res.status(404).json({ message: 'Vu53KZXModel not found' });
            }

            res.json(createdModel);
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
                model = await Vu53UTYModel
                    .find({status})
                    .populate('vagon', 'nomer')
                    .populate('expense')
                    .populate({
                        path: 'updates.updatedBy', // Populate the updatedBy field within the updates array
                        model: 'User', // Reference to the User model
                        select: 'namr' // Select the fields you want to populate
                    })
                    
                    .sort({ register_number: -1 });
            } else if (status == 'СОБ') {
                model = await Vu53SOBModel.find({status}).populate('vagon', 'nomer').populate('expense').sort({ register_number: -1 });
            } else if (status == 'СНГ') {
                model = await Vu53KZXModel.find({status}).populate('vagon', 'nomer').populate('expense').sort({ register_number: -1 });
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
                model = await Vu53UTYModel.findById(id).populate('vagon', 'nomer')?.populate('expense');
            } else if (status == 'СОБ') {
                model = await Vu53SOBModel.findById(id).populate('vagon', 'nomer')?.populate('expense');
            } else if (status == 'СНГ') {
                model = await Vu53KZXModel.findById(id).populate('vagon', 'nomer')?.populate('expense');
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

            // const { name, model, price } = req.body;
            const updatedBy = "Admin"; // You can change this based on the logged-in user
            const updateDetails = req.body;
           
            let updatedModel;
            if (status == 'ЎТЙ') {
                const updatedModel = await Vu53UTYModel.findByIdAndUpdate(
                    id, 
                    {
                         $push: { 
                            updates: { updatedBy: req.user.id, updateDetails: req.body } 
                        }, 
                        approvalStatus: 'pending' 
                    }, { new: true }
                );
                // updatedModel = await Vu53UTYModel.findByIdAndUpdate(
                //     id,
                //     req.body,
                //     { new: true }
                // );
            } else if (status == 'СОБ') {
                updatedModel = await Vu53SOBModel.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );
            } else if (status == 'СНГ') {
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
