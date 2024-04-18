const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence-plugin');

const vu92UTYSchema = new mongoose.Schema({
    register_number: {
        type: Number
    },
    register_time :{
        type: String,
        required: true,
    },
    vagon_nomer: {
        type: Number,
        required: true,
    },
    vu53_register_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vu53UTY',
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

vu92UTYSchema.plugin(AutoIncrement, { inc_field: 'register_number' });

const Vu92UTYModel = mongoose.model('Vu92UTY', vu92UTYSchema);

module.exports = Vu92UTYModel;
