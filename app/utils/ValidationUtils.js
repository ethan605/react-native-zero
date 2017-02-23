/**
 * @providesModule ZeroProj.Utils.ValidationUtils
 */

import Singleton from 'singleton';
import _ from 'lodash';

const EMAIL = 'email';
const PASSWORD = 'password';

export const DATA_TYPES = {
  EMAIL,
  PASSWORD,
};

const PATTERNS = {
  [EMAIL]: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ig,
  [PASSWORD]: /^[\w\d\s!@#$%^&*]{8,20}$/ig,
};

class ValidationUtils extends Singleton {
  validate(inputData, dataType, { emptyMessage, invalidMessage } = {}) {
    if (_.isEmpty(inputData))
      return emptyMessage;

    const pattern = PATTERNS[dataType];
    if (pattern == null)
      return invalidMessage;

    const matches = inputData.match(pattern);

    if (matches == null || matches[0] !== inputData)
      return invalidMessage;

    return null;
  }
}

export default ValidationUtils.get();
