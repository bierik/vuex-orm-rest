import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function save(keys = Object.keys(this.$toJson()), { relations = [] } = {}) {
  const { post } = this.http;

  if (_.isUndefined(post)) {
    throw new Error('HTTP Client has no `post` method');
  }

  checkConstraints(this);
  const path = joinPath(...relations.map(r => r.apiPath()), this.constructor.apiPath);
  const { data, status } = await post(path, this.pickKeys(keys));

  if (status === 201) {
    const stored = await this.$insert({ data });
    await this.$delete();
    return stored[this.constructor.entity][0];
  }

  return { data, status };
}
