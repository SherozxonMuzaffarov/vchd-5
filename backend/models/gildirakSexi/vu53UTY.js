const mongoose = require('mongoose');

const vu53UTYSchema = new mongoose.Schema({
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
        enum: ['ЎТЙ'],
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
    }, 
    expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vu53ExpenseUTY',
    },
    updates: [
        {
          updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          updatedAt: { type: Date, default: Date.now },
          updateDetails: {}
        }
    ],
    approvalStatus: { type: String, default: 'pending' } 
},{
    timestamps:true
});

const Vu53UTYModel = mongoose.model('Vu53UTY', vu53UTYSchema);

module.exports = Vu53UTYModel;
