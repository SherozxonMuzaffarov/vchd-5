const mongoose = require('mongoose');

const vu53ExpenseSchema = new mongoose.Schema({
    vagonType: {
        type: String,
        enum: ['Vu53KZX', 'Vu53OTY', 'Vu53SOB'],
        required: true
    },
    vagon: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'vagonType'
    },
    register_time :{
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
    with_rurning: {
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

const Vu53ExpenseModel = mongoose.model('Vu53Expense', vu53ExpenseSchema);

module.exports = Vu53ExpenseModel;
