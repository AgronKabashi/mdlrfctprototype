import Backbone from "backbone";

import {DataAccess} from "datalayer/dataAccess";
import {MODEL_TYPES} from "datalayer/modelTypes";

import {GlobalStore} from "business/globalStore";
import {CombinedSettingModel, SettingModel} from "business/models";
import {getAdditionalModelsFromCombined} from "business/utils";
import {filterCombinedModels, filterNativeModels} from "business/filters";

export class SettingModelCollection {
  constructor (modelMetadatas) {
    this._modelMetadatas = modelMetadatas;
  }

  fetch () {
    let requiredNativeModels = this._modelMetadatas.filter(filterNativeModels);
    // Combined models are composite models, they depend on other native or combined models and need to be massaged
    let requiredCombinedModels = this._modelMetadatas.filter(filterCombinedModels);

    if (requiredCombinedModels.length) {
      const additionalModels = getAdditionalModelsFromCombined(requiredCombinedModels);
      requiredNativeModels = requiredNativeModels.concat(additionalModels.native);
      requiredCombinedModels = requiredCombinedModels.concat(additionalModels.combined);
    }

    // TODO: Filter out models already in GlobalStore

    [...new Set([...requiredNativeModels])].forEach(nativeModel => GlobalStore.add(nativeModel, new SettingModel({modelMetaData: nativeModel})));
    [...new Set([...requiredCombinedModels])].forEach(combinedModel => GlobalStore.add(combinedModel, new CombinedSettingModel({modelMetaData: combinedModel})));

    //console.log(requiredNativeModels.length);

    if (requiredNativeModels.length) {
      return DataAccess.fetch(requiredNativeModels)
        .then(parsedData => {
          parsedData.forEach((value, key) => {
            GlobalStore.get(key).set("value", value);
          });
        });
    }

    return Promise.resolve();
  }
};