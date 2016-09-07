import Backbone from "backbone";
import {extractModelsFromSpec} from "business/utils";
import {SettingModelCollection} from "business/models";

export class GroupCollection {
  constructor (spec) {
    this._spec = spec;
  }

  fetch () {
    const modelMetaDatas = extractModelsFromSpec(this._spec);
    const settingCollection = new SettingModelCollection(modelMetaDatas);

    return settingCollection.fetch().then(() => this._spec);
  }
};