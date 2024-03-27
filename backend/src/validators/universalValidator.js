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
           owner_id: Joi.optional(),
           owner_company_id: Joi.optional(),
           year: Joi.optional(),
           remain_comment: Joi.optional(),
           status: Joi.string().optional(),
           input_data_id: Joi.optional(),
           output_data_id: Joi.optional(),
           
           createdAt: Joi.date().optional(),
           updatedAt: Joi.date().optional(),
    });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    }
}
