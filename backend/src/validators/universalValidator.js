const Joi = require('joi')

module.exports = {
    validate: (req, res, next) => {
        const schema = Joi.object({


           // User
           _id: Joi.optional(),
           name: Joi.string().optional(),
           phone_number: Joi.number().optional(),
           password: Joi.optional(),
           depo: Joi.string().optional(),
           role: Joi.string().optional(),
           __v: Joi.optional(),
           
           // Vagon
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

            //VU53
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

            // VU53 Expense
            register_time: Joi.string().required(),
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
            with_rurning: Joi.string().optional(),
            without_turning: Joi.string().optional(),
            otherWorks: Joi.string().optional(),
            full_examination_date: Joi.string().optional(),

            // Specific fields for referencing VagonModel
            vagonType: Joi.string().valid('Vu53KZX', 'Vu53OTY', 'Vu53SOB').required(),
            vagon: Joi.string().required(),

    });

        const { error } = schema.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    }
}
