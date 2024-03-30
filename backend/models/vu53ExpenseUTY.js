const mongoose = require('mongoose');

const vu53ExpenseUTYSchema = new mongoose.Schema({
    
    vu53: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vu53UTY'
    },
    vu53_status: {
        type: String,
        enum: ['ЎТЙ'],
        required: true
    },
    register_time :{
        type: String,
        required: true,
    },
    used_place:{
        type: String,
        required: true,
    },
    mediator: { 
        right: {
            type: Number,
        },
        left: {
            type: Number,
        }
    }, 
    obod_thickness: { 
        right: {
            type: Number
        },
        left: {
            type: Number
        }
    }, 
    prokat: { 
        right: {
            type: Number,
        },
        left: {
            type: Number,
        }
    }, 
    disk_thickness: { 
        right: {
            type: Number,
        },
        left: {
            type: Number,
        }
    }, 
    grebn_thickness: { 
        right: {
            type: Number,
        },
        left: {
            type: Number,
        }
    }, 
    diameter_krug: { 
        right: {
            type: Number,
        },
        left: {
            type: Number,
        }
    }, 
    distance: {
        type: Number,
    },
    with_turning: {
        type: String
    },
    without_turning: {
        type: String
    },
    other_works: {
        type: String
    },
    full_examination_date: {
        type: String
    }
},{
    timestamps:true
});

const Vu53ExpenseUTYModel = mongoose.model('Vu53ExpenseUTY', vu53ExpenseUTYSchema);

module.exports = Vu53ExpenseUTYModel;
