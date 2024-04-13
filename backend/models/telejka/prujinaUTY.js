const mongoose = require('mongoose');

const prujinaUTYSchema = new mongoose.Schema({
    register_time :{
        type: String,
        required: true,
    },
    external_quantity: {
        type: Number,
        required: true
    },
    external_rejected: {
        type: Number,
        required: true,
    },
    internal_quantity: {
        type: Number,
        required: true
    },
    internal_rejected: {
        type: Number,
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
    brigader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_brigader_sign: {
        type: Boolean,
        default: false
    },
    brigader_sign_data :{
        type: String
    },
    brigader_sign_type :{
        type: String
    },
    status: {
        type: String,
        enum: ['ЎТЙ'],
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

const PrujinaUTYModel = mongoose.model('PrujinaUTY', prujinaUTYSchema);

module.exports = PrujinaUTYModel;
