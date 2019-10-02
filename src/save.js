import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function save(keys = Object.keys(this.$toJson()), { relations = [] } = {}) {
  const { post } = this.client;
  const self = this;

  if (_.isUndefined(post)) {
    throw new Error('HTTP Client has no `post` method');
  }

  checkConstraints(this);
  const path = joinPath(...relations.map(r => r.apiPath()), self.apiPath);
  const data = await post(path, this.pickKeys(keys));
  const stored = await this.$insert(data);
  return stored[this.constructor.entity][0];
}
