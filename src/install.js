import _ from 'lodash';
import fetch from '@/fetch';
import fetchAll from '@/fetch-all';
import findOrFetch from '@/find-or-fetch';
import apiPath from '@/api-path';
import save from '@/save';
import update from '@/update';
import replace from '@/replace';
import destroy from '@/destroy';
import listKey from '@/list-key';
import routeName from '@/route-name';
import { routeURL, showURL, editURL } from '@/route-url';
import pickKeys from '@/pick-keys';

/* eslint-disable no-param-reassign */
export default function install({ Model }, { client, useCache = true } = {}) {
  // REST Client needs to be installed to make http requests
  if (_.isUndefined(client)) {
    throw new Error('HTTP-Client is not defined');
  }

  Model.http = client;
  Model.useCache = useCache;

  Model.fetch = fetch;
  Model.fetchAll = fetchAll;
  Model.findOrFetch = findOrFetch;

  Model.prototype.http = client;
  Model.prototype.save = save;
  Model.prototype.update = update;
  Model.prototype.replace = replace;
  Model.prototype.destroy = destroy;
  Model.prototype.listKey = listKey;
  Model.prototype.apiPath = apiPath;
  Model.prototype.routeName = routeName;
  Model.prototype.routeURL = routeURL;
  Model.prototype.showURL = showURL;
  Model.prototype.editURL = editURL;
  Model.prototype.pickKeys = pickKeys;
}
/* eslint-enable no-param-reassign */
