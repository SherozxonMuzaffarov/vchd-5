const mongoose = require('mongoose');

const naplavkaSOBSchema = new mongoose.Schema({
    vu53_register_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vu53SOB',
        required: true
    },
    vu53_status: {
        type: String,
        enum: ['СОБ'],
        required: true
    },
    register_time :{
        type: String,
        required: true,
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
    brigader_name: {
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

    svarchik_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_svarchik_sign: {
        type: Boolean,
        default: false
    },
    svarchik_sign_data :{
        type: String
    },
    svarchik_sign_type :{
        type: String
    },

    tokar_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_tokar_sign: {
        type: Boolean,
        default: false
    },
    tokar_sign_data :{
        type: String
    },
    tokar_sign_type :{
        type: String
    },

    defektoskopist_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_defektoskopist_sign: {
        type: Boolean,
        default: false
    },
    defektoskopist_sign_data :{
        type: String
    },
    defektoskopist_sign_type :{
        type: String
    },

    receptionist_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    is_receptionist_sign: {
        type: Boolean,
        default: false
    },
    receptionist_sign_data :{
        type: String
    },
    receptionist_sign_type :{
        type: String
    },
    depo: {
        type: String,
        enum: ['ВЧД-6'],
        required: true
    }
},{
    timestamps:true
});

const NaplavkaSOBModel = mongoose.model('NaplavkaSOB', naplavkaSOBSchema);

module.exports = NaplavkaSOBModel;
