const mongoose = require('mongoose');

const vu91KZXSchema = new mongoose.Schema({
    register_number: {
        type: Number,
        required: true,
        unique: true
    },
    register_time :{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    depoManifactured: {
        type: String,
        required: true,
    },
    nomer: {
        type: Number,
        required: true,
    },
    defect: {
        type: String,
        required: true,
    },
    inspector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_inspector_sign: {
        type: Boolean,
        default: false
    },
    inspector_sign_data :{
        type: String
    },
    inspector_sign_type :{
        type: String
    },
    status: {
        type: String,
        enum: ['СНГ'],
        required: true
    },
    depo: {
        type: String,
        enum: ['ВЧД-6'],
        required: true
    },
},{
    timestamps:true
});

const Vu91KZXModel = mongoose.model('Vu91KZX', vu91KZXSchema);

module.exports = Vu91KZXModel;
