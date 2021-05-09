import Joi from "joi";

//Validate User Registration

export const validateRegistration = (data) => {
  const schema = Joi.object({
    givenName: Joi.string().min(3).max(20).required(),
    familyName: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    givenName: Joi.string().optional().allow(''),
    familyName: Joi.string().optional().allow(''),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().optional().allow('')
  });
  return schema.validate(data);
};

export const validatePost = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    profile_link: Joi.string().required(),
    location: Joi.string().required(), 
    education: Joi.string().optional().allow(''),
    challenges_solved: Joi.number(),
    solution_submitted: Joi.number(),
    solution_accepted: Joi.number(),
    overall_rank: Joi.number(),
    followers: Joi.number(),
    following: Joi.number(),
    competetive_profile: Joi.object({
      data_structures: Joi.number(),
      algorithm: Joi.number(),
      cpp: Joi.number(),
      java: Joi.number(),
      python: Joi.number(),
      html: Joi.number(),
      javascript: Joi.number()
    }),
    vote_count: Joi.number(),
    device_type: Joi.string().optional().allow(''),
    rating: Joi.number(),
  });
  return schema.validate(data);
}

