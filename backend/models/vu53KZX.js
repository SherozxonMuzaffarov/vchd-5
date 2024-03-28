const mongoose = require('mongoose');

const vu53KZXSchema = new mongoose.Schema({
    register_number: {
        type: Number,
        required: true,
        unique: true
    },
    register_time :{
        type: String,
        required: true,
    },
    vagon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vagon',
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    defective: {
        type: Number,
    },
    os_year: {
        type: String,
        required: true,
    },
    last_repair: {
        type: String,
        required: true,
    },
    buksa: {
        type: String,
        required: true,
    },
    diameter: { 
        right: {
            type: Number,
            required: true,
        },
        left: {
            type: Number,
            required: true,
        }
    }, 
    status: {
        type: String,
        enum: ['КЗХ'],
        required: true
    },
    depo: {
        type: String,
        enum: ['ВЧД-6'],
        required: true
    },
    is_used: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

const Vu53KZXModel = mongoose.model('Vu53KZX', vu53KZXSchema);

module.exports = Vu53KZXModel;
