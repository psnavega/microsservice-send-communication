import * as Joi from 'joi';
import { CommunicationType } from '../../../shared/enums/communicationType.enum';

const smsSchema = Joi.object({
  to: Joi.string().required(),
  body: Joi.string().required(),
});

const emailSchema = Joi.object({
  to: Joi.string().required(),
  body: Joi.string().required(),
  subject: Joi.string().required(),
  from: Joi.string().required(),
});

export function getValidatorSchema(type: CommunicationType): Joi.Schema {
  switch (type) {
    case CommunicationType.SMS:
      return smsSchema;
    case CommunicationType.EMAIL:
      return emailSchema;
    default:
      throw new Error('Invalid communication type');
  }
}
