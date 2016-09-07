import Backbone from "backbone";

import {DataAccess} from "datalayer/dataAccess";
import {GlobalStore} from "business/globalStore";
import {MODEL_METADATA} from "business/modelMetadata";

export const SettingModel = Backbone.Model.extend({
  initialize (attributes) {
    this._modelMetaData = attributes.modelMetaData;
    delete this.attributes.modelMetaData;
  },

  fetch () {
    return DataAccess.fetch(this._modelMetaData);
  },

  save (attribute, value) {
    this.set(attribute, value, {silent: true});

    DataAccess.save(this.attributes, this._modelMetaData)
      .then(() => {
        console.log("Model saved");
        this.trigger("change", this);
      })
      .catch(() => {
        // Revert change
      });
  }
});