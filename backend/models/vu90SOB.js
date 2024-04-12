const mongoose = require('mongoose');

const vu90SOBSchema = new mongoose.Schema({
    register_number: {
        type: Number
    },
    register_time :{
        type: String,
        required: true,
    },
    vu53_register_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vu53SOB',
        required: true
    },
    vu53_number: {
        type: Number
    },
    stamps: {
        type: String,
        required: true
    },

    diameter_sheyka_right_d1: {
        type: String,
    },
    diameter_sheyka_Right_d11: {
        type: String,
    },
    diameter_sheyka_left_d1: {
        type: String,
    },
    diameter_sheyka_left_d11: {
        type: String,
    },

    diameter_sheyka_Right_d2: {
        type: String,
    },
    diameter_sheyka_Right_d22: {
        type: String,
    },
    diameter_sheyka_left_d2: {
        type: String,
    },
    diameter_sheyka_left_d22: {
        type: String,
    },

    diameter_sheyka_Right_d3: {
        type: String,
    },
    diameter_sheyka_Right_d33: {
        type: String,
    },
    diameter_sheyka_left_d3: {
        type: String,
    },
    diameter_sheyka_left_d33: {
        type: String,
    },

    greatest_ovality: {
        type: String,
    },
    greatest_taper: {
        type: String,
    },
    
    posad_diameter_kolsa_right: {
        type: String,
    },
    posad_diameter_kolsa_left: {
        type: String,
    },
    preload_kolsa_right: {
        type: String,
    },
    preload_kolsa_left: {
        type: String,
    },

    radial_gap_right_rear: {
        type: String,
    },
    radial_gap_right_front: {
        type: String,
    },
    radial_gap_left_rear: {
        type: String,
    },
    radial_gap_left_front: {
        type: String,
    },

    posad_diameter_buks_right_D1: {
        type: String,
    },
    posad_diameter_buks_right_D11: {
        type: String,
    },
    posad_diameter_buks_left_D1: {
        type: String,
    },
    posad_diameter_buks_left_D11: {
        type: String,
    },
    posad_diameter_buks_right_D2: {
        type: String,
    },
    posad_diameter_buks_right_D22: {
        type: String,
    },
    posad_diameter_buks_left_D2: {
        type: String,
    },
    posad_diameter_buks_left_D22: {
        type: String,
    },

    manufacturer_right_rear: {
        type: Number
    },
    design_right_rear: {
        type: String
    },

    manufacturer_left_rear: {
        type: Number
    },
    design_right_left_rear: {
        type: String
    },
    manufacturer_right_front: {
        type: Number
    },
    design_right_front: {
        type: String
    },

    manufacturer_left_front: {
        type: Number
    },
    design_right_left_front: {
        type: String
    },

    output_vtuki_right_1: {
        type: Number
    },
    output_vtuki_right_2: {
        type: Number
    },
    output_vtuki_left_1: {
        type: Number
    },
    output_vtuki_left_2: {
        type: Number
    },

    internal_diameter_kolsa_right_1: {
        type: Number,
    },
    internal_diameter_kolsa_right_2: {
        type: Number
    },
    internal_diameter_kolsa_left_1: {
        type: Number
    },
    internal_diameter_kolsa_left_2: {
        type: Number
    },

    internal_preload_kolsa_right_1: {
        type: Number
    },
    internal_preload_kolsa_right_2: {
        type: Number
    },
    internal_preload_kolsa_left_1: {
        type: Number
    },
    internal_preload_kolsa_left_2: {
        type: Number
    },

    lzsni: {
        type: Number
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


const Vu90SOBModel = mongoose.model('Vu90SOB', vu90SOBSchema);

module.exports = Vu90SOBModel;
