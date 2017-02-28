/**
 * @providesModule ZeroProj.Models.BaseModel
 */

import Joi from 'react-native-joi';
import _ from 'lodash';

// Utils
import Logger from 'app/utils/Logger';

function normalizedData(data, validatorList) {
  if (_.isEmpty(data))
    return {
      error: Error(`${this.name} model constructed with empty data`),
      normalized: {},
    };

  const attributes = Object.keys(validatorList);
  const validator = Joi.object().keys(validatorList);

  const filteredData = _.pick(data, attributes);
  const { error, value } = Joi.validate(filteredData, validator);

  const normalized = error != null ? filteredData : value;
  return { error, normalized };
}

export default class BaseModel {
  static dataValidator() {
    // Raise error if this method is absent from descendant class
    throw new Error('[BaseModel]: dataValidator() function must be provided');
  }

  static build(data) {
    const { error, normalized } = normalizedData(data, this.dataValidator());

    if (_.isEmpty(normalized)) {
      Logger.warn(error.message);
      return null;
    }

    if (error != null) {
      Logger.warn(`Validation failed for ${this.name} model with error & value:`, error, data);
      return null;
    }

    return new (this)(normalized);
  }

  static construct(data) {
    // Ignore errors
    const { normalized } = normalizedData(data, this.dataValidator());
    return new (this)(normalized);
  }

  static buildArray(dataArr) {
    if (_.isEmpty(dataArr)) return [];

    const models = dataArr.map(data => this.build(data));
    return _.compact(models);
  }

  static buildDict(dataArr) {
    if (_.isEmpty(dataArr)) return {};

    const modelsArr = this.buildArray(dataArr);

    const dataDict = modelsArr.filter(data => data.id != null)
      .map(data => ({ [data.id]: data }));

    return { ...dataDict };
  }

  static buildGeneric(genericData, outputType) {
    if (genericData == null) return null;

    const type = outputType || genericData.constructor.name;

    switch (type) {
      case 'Object': return this.build(genericData);
      case 'Array': return this.buildArray(genericData);
      case 'Dict': return this.buildDict(genericData);
      default: return genericData;
    }
  }

  constructor(data) {
    Object.assign(this, data);
  }
}
