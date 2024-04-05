const mongoose = require('mongoose');

const vu93SOBSchema = new mongoose.Schema({
    register_number: {
        type: Number,
        required: true,
        unique: true
    },
    register_time :{
        type: String,
        required: true,
    },
    depoManifactured: {
        type: String,
        required: true,
    },
    defect: {
        type: String,
        required: true,
    },
    repairDone: {
        type: String,
        required: true,
    },
    repairman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_repairman_sign: {
        type: Boolean,
        default: false
    },
    repairman_sign_data :{
        type: String
    },
    repairman_sign_type :{
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
        enum: ['СОБ'],
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

const Vu93SOBModel = mongoose.model('Vu93SOB', vu93SOBSchema);

module.exports = Vu93SOBModel;
