const mongoose = require('mongoose');

const vu91SOBSchema = new mongoose.Schema({
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

const Vu91SOBModel = mongoose.model('Vu91SOB', vu91SOBSchema);

module.exports = Vu91SOBModel;
