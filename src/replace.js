import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default function replace() {
  const { put } = this.http;

  if (_.isUndefined(put)) {
    throw new Error('HTTP Client has no `put` method');
  }

  checkConstraints(this);

  put(this.apiPath(), _.omit(this.$toJson(), '$id'));
}
