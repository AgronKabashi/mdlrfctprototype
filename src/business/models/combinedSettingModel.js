import _ from "lodash";
import Backbone from "backbone";

import {GlobalStore} from "business/globalStore";
import {MODEL_METADATA} from "business/modelMetadata";

export const CombinedSettingModel = Backbone.Model.extend({
  initialize (attributes) {
    this._modelMetaData = attributes.modelMetaData;
    delete this.attributes.modelMetaData;

    setTimeout(() => {
      this._modelMetaData.dependencies
        .forEach(modelId => GlobalStore.get(MODEL_METADATA[modelId]).on("change", _.debounce(this._onChange).bind(this), this));
    });
  },

  fetch () {
    // Call fetch on dependent models
  },

  save () {
    // Call save on dependent models
    this._modelMetaData.dependencies.forEach(modelId => GlobalStore.get(MODEL_METADATA[modelId]).save("value", "test"));
  },

  _onChange (model) {
    console.log(`Combined model's [${this.cid}] dependencies changed`, model._modelMetaData);

    // Update model's attributes to match new data
    // How to combine values? Maybe attach some transformer on the modelMetadata?
    const value = this._modelMetaData.dependencies.reduce((previous, current) => {
      return previous + GlobalStore.get(MODEL_METADATA[current]).get("value");
    }, "");

    this.set("value", value);

    // And let the world know
    this.trigger("change", this);
  }
});