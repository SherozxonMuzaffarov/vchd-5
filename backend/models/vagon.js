const mongoose = require('mongoose');

const vagonSchema = new mongoose.Schema({
    nomer: {
        type: Number,
        required: true,
        unique: true
    },
    vagon_type: {
        type: String,
        enum: ['Yopiq vagon (крыт)', 'Platforma (пф)', 'Yarim ochiq vagon (пв)', 'Sisterna (цс)', 'Boshqa turdagi (проч)'],
        required: true
    },
    repair_type: {
        type: String,
        enum: ['Depoli ta\'mir (ДР)', 'Kapital ta\'mir (КР)', 'KPR (КРП)', 'TO-3'],
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    owner_company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OwnerCompany',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    depo: {
        type: String,
        enum: ['VCHD-3', 'VCHD-5', 'VCHD-6'],
        required: true
    },
    remain_comment: {
        type: String,
    },
    status: {
        type: String,
        enum: ['remain', 'repairing', 'repaired'],
        required: true
    },
    input_data_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InputData',
    },
    output_data_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OutputData',
    }
},{
    timestamps:true
});

const VagonModel = mongoose.model('Vagon', vagonSchema);

module.exports = VagonModel;
