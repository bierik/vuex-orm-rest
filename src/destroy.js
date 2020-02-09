import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function destroy({ relations = [] } = {}) {
  const { delete: destroy } = this.http;

  if (_.isUndefined(destroy)) {
    throw new Error('HTTP Client has no `delete` method');
  }

  checkConstraints(this);
  const path = joinPath(...relations.map(r => r.apiPath()), this.apiPath());
  await destroy(path);
  return this.$delete();
}
