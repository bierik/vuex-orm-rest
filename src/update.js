import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function update(keys = Object.keys(this.$toJson()), { relations = [] } = {}) {
  const { patch } = this.http;

  if (_.isUndefined(patch)) {
    throw new Error('HTTP Client has no `patch` method');
  }

  checkConstraints(this);

  const path = joinPath(...relations.map(r => r.apiPath()), this.apiPath());
  const { data } = await patch(path, this.pickKeys(keys));
  const stored = await this.$insertOrUpdate(data);
  return stored[this.constructor.entity][0];
}
