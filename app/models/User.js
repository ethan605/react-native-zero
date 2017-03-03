/**
 * @providesModule ZeroProj.Models.User
 */

/* eslint-disable camelcase, newline-per-chained-call */

import Joi from 'react-native-joi';

// Models
import BaseModel from 'app/models/BaseModel';

export default class User extends BaseModel {
  static dataValidator() {
    return {
      id: Joi.number().min(0).required(),
      username: Joi.string().empty(['', null]).required(),
      email: Joi.string().empty(['', null]).required(),
      auth_token: Joi.string().empty(['', null]).required(),
    };
  }
}

/* eslint-enable camelcase, newline-per-chained-call */
