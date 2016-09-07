import {GlobalStore} from "business/globalStore";

export class RelationModel {
  constructor (element, relationSettings, executor) {
    this._relatedModel = GlobalStore.get(relationSettings.relatedModel);

    // Wire up the behaviour to execute when the model changes
    this._relatedModel.on("change", () => executor(element, this._relatedModel, relationSettings));

    // Always execute initially
    executor(element, this._relatedModel, relationSettings);
  }

  cleanup () {
    console.log("Cleaning up updateLabel relation");
    this._relatedModel.off("change", null, this);
    delete this._relatedModel;
  }
};