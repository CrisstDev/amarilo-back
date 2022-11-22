import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    DATABASE_URL       : Joi.required(),
    PORT               : Joi.number().required(),
    JWT_SECRET_KEY     : Joi.string().required(),  
})