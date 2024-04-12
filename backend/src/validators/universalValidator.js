const Joi = require('joi')

module.exports = {
    user: (req, res, next) => {
        const schema = Joi.object({
          // User
          _id: Joi.optional(),
          name: Joi.string().optional(),
          phone_number: Joi.number().optional(),
          password: Joi.optional(),
          depo: Joi.string().optional(),
          role: Joi.string().optional(),
          createdAt: Joi.date().optional(),
          updatedAt: Joi.date().optional(),
          __v: Joi.optional(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
    },

    owner: (req, res, next) => {
        const schema = Joi.object({
          // Owner
          name: Joi.string().optional(),
          
          createdAt: Joi.date().optional(),
          updatedAt: Joi.date().optional(),
          _id: Joi.optional(),
          __v: Joi.optional(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
    },

    vagon: (req, res, next) => {
        const schema = Joi.object({
          // Vagon
          _id: Joi.optional(),
          nomer: Joi.number().optional(),
          vagon_type: Joi.string().optional(),
          repair_type: Joi.string().optional(),
          last_repair_type: Joi.string().optional(),
          last_repair_year: Joi.string().optional(),
          owner_id: Joi.optional(),
          owner_company_id: Joi.optional(),
          year: Joi.optional(),
          remain_comment: Joi.optional(),
          status: Joi.string().optional(),
          input_data_id: Joi.optional(),
          output_data_id: Joi.optional(),
          
          createdAt: Joi.date().optional(),
          updatedAt: Joi.date().optional(),
          __v: Joi.optional(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
    },

    vu53: (req, res, next) => {
        const schema = Joi.object({
          // VU53
          register_number: Joi.number().required(),
          register_time: Joi.string().required(),
          vagon: Joi.optional(),
          type: Joi.string().required(),
          number: Joi.number().required(),
          defective: Joi.optional(),
          os_year: Joi.string().required(),
          last_repair: Joi.string().required(),
          buksa: Joi.string().required(),
          diameter: Joi.object({
              right: Joi.number().required(),
              left: Joi.number().required()
          }).required(),
          status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ').required(),
          depo: Joi.string().valid('ВЧД-6'),
          is_used: Joi.boolean().default(false),
          
          createdAt: Joi.date().optional(),
          updatedAt: Joi.date().optional(),
          __v: Joi.optional(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
    },

    vu53Expense: (req, res, next) => {
        const schema = Joi.object({
          // VU53 Expense
          vu53: Joi.required(),
          vu53_status: Joi.required(),
          register_time: Joi.string().required(),
          used_place: Joi.string().required(),
          mediator: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          obod_thickness: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          prokat: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          disk_thickness: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          grebn_thickness: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          diameter_krug: Joi.object({
              right: Joi.number().optional(),
              left: Joi.number().optional()
          }).optional(),
          distance: Joi.number().optional(),
          with_turning: Joi.optional(),
          without_turning: Joi.optional(),
          other_works: Joi.optional(),
          full_examination_date: Joi.string().optional(),
          
          createdAt: Joi.date().optional(),
          updatedAt: Joi.date().optional(),
          __v: Joi.optional(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        next();
    },
    
    employee: (req, res, next) => {
        const schema = Joi.object({
            // Employee
            name: Joi.string().required(),
            position: Joi.string().valid(
                'head_master',
                'group_master',
                'group_brigader',
                'svarchik',
                'tokar',
                'defektoskopist',
                'chilangar'
            ).required(),
            level: Joi.string().required(),
            group: Joi.string().valid('weekly', 'first', 'second').required(),
            section: Joi.string().valid("g'ildirakSexi").required(),
            files: Joi.array().items(Joi.object({
                name: Joi.string(),
                img: Joi.string()
            })),

            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            __v: Joi.optional(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
    naplavka: (req, res, next) => {
        const schema = Joi.object({
            // Naplavka
            _id: Joi.string().optional(),
            vu53_register_number: Joi.string().required(),
            vu53_status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ').required(),
            register_time: Joi.string().required(),
            vu53_number: Joi.number().required(),
            vu53_type: Joi.string().valid('РУ1', 'РУ1Ш').required(),
            brigader_name: Joi.string().required(),
            is_brigader_sign: Joi.boolean().default(false),
            svarchik_name: Joi.string().required(),
            is_svarchik_sign: Joi.boolean().default(false),
            tokar_name: Joi.string().required(),
            is_tokar_sign: Joi.boolean().default(false),
            defektoskopist_name: Joi.string().required(),
            is_defektoskopist_sign: Joi.boolean().default(false),
            receptionist_name: Joi.string().required(),
            is_receptionist_sign: Joi.boolean().default(false),
            depo: Joi.string().valid('ВЧД-6').optional(),

            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            __v: Joi.optional(),
            });
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation Error: " + error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
    vu93: (req, res, next) => {
        const schema = Joi.object({
            // VU93
            register_number: Joi.number().required(),
            register_time: Joi.string().required(),
            depoManifactured: Joi.string().required(),
            defect: Joi.string().required(),
            repairDone: Joi.string().required(),
            repairman: Joi.string().required(), 
            is_repairman_sign: Joi.boolean().optional(),
            repairman_sign_data: Joi.string().optional(),
            repairman_sign_type: Joi.string().optional(),
            master: Joi.string().required(), 
            is_master_sign: Joi.boolean().optional(),
            master_sign_data: Joi.string().optional(),
            master_sign_type: Joi.string().optional(),
            status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ').required(),
            depo: Joi.string().valid('ВЧД-6'),
           
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            _id: Joi.optional(),
            __v: Joi.optional(),
            });
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation Error: " + error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
    vu91: (req, res, next) => {
        const schema = Joi.object({
            // Vu91
            register_number: Joi.number().required(),
            register_time: Joi.string().required(),
            type: Joi.string().required(),
            depoManifactured: Joi.string().required(),
            nomer: Joi.number().required(),
            defect: Joi.string().required(),
            inspector: Joi.string().required(),
            is_inspector_sign: Joi.boolean().optional(),
            inspector_sign_data: Joi.string().optional(),
            inspector_sign_type: Joi.string().optional(),
            status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ').required(),
            depo: Joi.string().valid('ВЧД-6'),
           
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            _id: Joi.optional(),
            __v: Joi.optional(),
            });
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation Error: " + error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
    vu92: (req, res, next) => {
        const schema = Joi.object({
            // Vu92
            register_number: Joi.number(),
            register_time: Joi.string().required(),
            vagon_nomer: Joi.number().required(), 
            vu53_register_number: Joi.string().required(), 
            vu53_number: Joi.number().required(),
            vu53_type: Joi.string().valid('РУ1', 'РУ1Ш').required(),
            sostoyana: Joi.string().required(),
            before_inspect: Joi.string().required(),
            after_inspect: Joi.string().required(),
            inspector: Joi.string().required(), 
            is_inspector_sign: Joi.boolean().optional(),
            inspector_sign_data: Joi.string().optional(),
            inspector_sign_type: Joi.string().optional(),
            master: Joi.string().required(), 
            is_master_sign: Joi.boolean().optional(),
            master_sign_data: Joi.string().optional(),
            master_sign_type: Joi.string().optional(),

            status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ').required(),
            depo: Joi.string().valid('ВЧД-6'),
           
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            _id: Joi.optional(),
            __v: Joi.optional(),
            });
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation Error: " + error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
    vu90: (req, res, next) => {
        const schema = Joi.object({
            // Vu90
            register_time: Joi.string(),
            vu53_register_number: Joi.string(),
            vu53_number: Joi.number(),
            stamps: Joi.string(),
            diameter_sheyka_right_d1: Joi.string(),
            diameter_sheyka_Right_d11: Joi.string(),
            diameter_sheyka_left_d1: Joi.string(),
            diameter_sheyka_left_d11: Joi.string(),
            diameter_sheyka_Right_d2: Joi.string(),
            diameter_sheyka_Right_d22: Joi.string(),
            diameter_sheyka_left_d2: Joi.string(),
            diameter_sheyka_left_d22: Joi.string(),
            diameter_sheyka_Right_d3: Joi.string(),
            diameter_sheyka_Right_d33: Joi.string(),
            diameter_sheyka_left_d3: Joi.string(),
            diameter_sheyka_left_d33: Joi.string(),
            greatest_ovality: Joi.string(),
            greatest_taper: Joi.string(),
            posad_diameter_kolsa_right: Joi.string(),
            posad_diameter_kolsa_left: Joi.string(),
            preload_kolsa_right: Joi.string(),
            preload_kolsa_left: Joi.string(),
            radial_gap_right_rear: Joi.string(),
            radial_gap_right_front: Joi.string(),
            radial_gap_left_rear: Joi.string(),
            radial_gap_left_front: Joi.string(),
            posad_diameter_buks_right_D1: Joi.string(),
            posad_diameter_buks_right_D11: Joi.string(),
            posad_diameter_buks_left_D1: Joi.string(),
            posad_diameter_buks_left_D11: Joi.string(),
            posad_diameter_buks_right_D2: Joi.string(),
            posad_diameter_buks_right_D22: Joi.string(),
            posad_diameter_buks_left_D2: Joi.string(),
            posad_diameter_buks_left_D22: Joi.string(),
            manufacturer_right_rear: Joi.number(),
            design_right_rear: Joi.string(),
            manufacturer_left_rear: Joi.number(),
            design_right_left_rear: Joi.string(),
            manufacturer_right_front: Joi.number(),
            design_right_front: Joi.string(),
            manufacturer_left_front: Joi.number(),
            design_right_left_front: Joi.string(),
            output_vtuki_right_1: Joi.number(),
            output_vtuki_right_2: Joi.number(),
            output_vtuki_left_1: Joi.number(),
            output_vtuki_left_2: Joi.number(),
            internal_diameter_kolsa_right_1: Joi.number(),
            internal_diameter_kolsa_right_2: Joi.number(),
            internal_diameter_kolsa_left_1: Joi.number(),
            internal_diameter_kolsa_left_2: Joi.number(),
            internal_preload_kolsa_right_1: Joi.number(),
            internal_preload_kolsa_right_2: Joi.number(),
            internal_preload_kolsa_left_1: Joi.number(),
            internal_preload_kolsa_left_2: Joi.number(),
            lzsni: Joi.number(),
            inspector: Joi.string(),
            is_inspector_sign: Joi.boolean(),
            inspector_sign_data: Joi.string(),
            inspector_sign_type: Joi.string(),
            master: Joi.string(),
            is_master_sign: Joi.boolean(),
            master_sign_data: Joi.string(),
            master_sign_type: Joi.string(),

            status: Joi.string().valid('ЎТЙ', 'КЗХ', 'СОБ'),
            depo: Joi.string().valid('ВЧД-6'),
           
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            _id: Joi.optional(),
            __v: Joi.optional(),
            });
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation Error: " + error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    },
    
}
