import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function fetch(id, { useCache = true, options = {} } = {}) {
  const { get } = this.http;

  if (_.isUndefined(get)) {
    throw new Error('HTTP Client has no `get` method');
  }

  if (_.isUndefined(id)) {
    throw new Error('No id is provided');
  }

  if (!_.isNumber(id)) {
    throw new Error('The id provided is not a number');
  }

  checkConstraints(this);

  const self = this;

  function fetchCache() {
    return new Promise((resolve) => {
      const cachedValue = self.find(id);
      if (cachedValue) {
        resolve(cachedValue);
      }
    });
  }

  function fetchAPI() {
    return new Promise(async (resolve, reject) => {
      const data = await get(
        joinPath(self.apiPath, id.toString()),
        options,
      );

      try {
        const insertedData = await self.insertOrUpdate(data);
        resolve(insertedData[self.entity][0]);
      } catch (error) {
        reject(new Error('Unable to process response.'));
      }
    });
  }

  return Promise.race([
    ...(useCache && self.useCache ? [fetchCache()] : []),
    fetchAPI(),
  ]);
}
