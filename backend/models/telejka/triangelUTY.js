const mongoose = require('mongoose');

const triangelUTYSchema = new mongoose.Schema({
    register_time :{
        type: String,
        required: true,
    },
    vagon_nomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vagon',
        required: true
    },
    size: {
        type: String,
    },
    deformation: {
        type: String,
    },
    difference: {
        type: String,
    },
    internal_edges_distance: {
        type: String,
    },
    external_edges_distance: {
        type: String,
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

const TriangelUTYModel = mongoose.model('TriangelUTY', triangelUTYSchema);

module.exports = TriangelUTYModel;
