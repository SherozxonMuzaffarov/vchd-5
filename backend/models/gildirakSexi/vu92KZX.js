const mongoose = require('mongoose');

const vu92KZXSchema = new mongoose.Schema({
    register_number: {
        type: Number,
        required: true,
        unique: true
    },
    register_time :{
        type: String,
        required: true,
    },
    vagon_nomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vagon',
        required: true
    },
    vu53_register_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vu93KZX',
        required: true
    },
    vu53_number: {
        type: Number,
        required: true,
    },
    vu53_type: {
        type: String,
        enum: ['РУ1', 'РУ1Ш'],
        required: true
    },
    sostoyana: {
        type: String,
        required: true
    },
    before_inspect: {
        type: String,
        required: true
    },
    after_inspect: {
        type: String,
        required: true
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
    
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_master_sign: {
        type: Boolean,
        default: false
    },
    master_sign_data :{
        type: String
    },
    master_sign_type :{
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

const Vu92KZXModel = mongoose.model('Vu92KZX', vu92KZXSchema);

module.exports = Vu92KZXModel;
