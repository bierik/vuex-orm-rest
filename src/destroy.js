import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default async function destroy() {
  const { delete: destroy } = this.http;

  if (_.isUndefined(destroy)) {
    throw new Error('HTTP Client has no `delete` method');
  }

  checkConstraints(this);

  await destroy(this.apiPath());
  return this.$delete();
}
