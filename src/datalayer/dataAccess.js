import $ from "jquery";
import _ from "lodash";

import {MODEL_TYPES} from "datalayer/modelTypes";
import {ParamCgi} from "datalayer/fetchers/paramCgi";
import {PlainCgi} from "datalayer/fetchers/plainCgi";

const fetchers = {
  [MODEL_TYPES.PARAM]: new ParamCgi(),
  [MODEL_TYPES.CGI]: new PlainCgi()
};

export const DataAccess = {
  fetch (modelMetaDatas) {
    const fetchId = Date.now();
    console.log("DataAccess - Starting fetch of batch:", fetchId);
    return Promise.all(modelMetaDatas.map(modelMetaData => fetchers[modelMetaData.type].fetch(modelMetaData)))
      .then(resolvedData => {
        console.log("DataAccess - Finished fetching batch:", fetchId);

        // Some of the promises might be duplicates due to batching
        // Filter these out and merge the results into a single map
        return _.uniq(resolvedData).reduce((result, map) => new Map([...result, ...map]));
      });
  },

  save (data, modelMetaData) {
    return fetchers[modelMetaData.type].save(data, modelMetaData)
  }
};