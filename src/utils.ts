import { validate } from 'class-validator';

export interface Answer {
  error: boolean;
  message: string;
  code?: number;
}

export const schemaValidation = async (
  entity,
  entityName: string,
): Promise<Answer> => {
  const errors = await validate(entity);
  if (errors.length > 0) {
    return { error: true, message: `Validation for ${entityName} failed!` };
  } else {
    return { error: false, message: '' };
  }
};

export const swagerAuthToken = {
  name: 'Authorization',
  description: 'Bearer Authorization token',
};
