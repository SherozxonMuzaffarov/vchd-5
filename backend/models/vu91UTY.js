const mongoose = require('mongoose');

const vu91UTYSchema = new mongoose.Schema({
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

const Vu91UTYModel = mongoose.model('Vu91UTY', vu91UTYSchema);

module.exports = Vu91UTYModel;
