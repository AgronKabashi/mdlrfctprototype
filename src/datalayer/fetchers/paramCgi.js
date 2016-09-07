import $ from "jquery";
import _ from "lodash";

import {parseParamDocument} from "datalayer/utils";

const logStyling = "font-weight:bold;color:purple";

const resolveCamNbr = (value) => value.replace(/{{camNbr}}/g, 0);

export class ParamCgi {
  fetch (modelMetaData) {
    console.log("%cParamCGI - %cFETCH Requested", logStyling, "font-weight:bold;color:orange");

    // The promise will represent a batch request to the camera. As long as it exists
    // we will keep appending parameters
    this.promise = this.promise || new Promise((resolve, reject) => {
      this.params = {};

      this.debouncedFetch = _.debounce(() => {
        console.log("%cParamCGI - %cI've waited enough, STARTING FETCH", logStyling, "color:red");

        const params = this.params;
        const keysToFetch = Object.keys(params).join(",");
        // This batch of paramNames is about to be requested from the camera. Cleanup the existing promise and
        // params so we can start collecting a new batch of requests.
        delete this.params;
        delete this.promise;

        $.get(`/axis-cgi/param.cgi?action=listdefinitions&listformat=xmlschema&responseformat=rfc&responsecharset=utf8&group=${keysToFetch}`)
          .then(document => {
            console.log("%cParamCGI - %cDEBOUNCED FETCH Complete", logStyling, "color:green");
            resolve(parseParamDocument(document, params));
          });
      });
    });

    // Include both paramName and fallbackParamName in the params so we don't have to
    // apply some special check later, we simply resolve based on parameters in response
    this.params[resolveCamNbr(modelMetaData.paramName)] = modelMetaData;
    if (modelMetaData.fallbackParamName) {
      this.params[resolveCamNbr(modelMetaData.fallbackParamName)] = modelMetaData;
    }

    this.debouncedFetch();

    return this.promise;
  }

  save (data, modelMetaData) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  }
}