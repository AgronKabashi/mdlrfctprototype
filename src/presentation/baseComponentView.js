import _ from "lodash";
import Backbone from "backbone";

import {GlobalStore} from "business/globalStore";
import {RelationModel} from "business/models";
import * as behaviours from "presentation/behaviours";

export const BaseComponentView = Backbone.View.extend({
  initialize (options) {
    this.options = options;
    this.model = GlobalStore.get(options.data);

    // TODO: Call _updateView only if the change didn't originate from itself?
    this.model.on("change", _.debounce(this._updateView).bind(this), this); // Listening directly on the model? Or listen using backbone.radio?
  },

  render () {
    if (this.options.relations) {
      this.relations = this.options.relations.map(relation => new RelationModel(this.$el, relation, behaviours[relation.type]));
    }
  },

  _updateView () {},

  remove () {
    this.model.off("change", null, this);
    this.relations && this.relations.forEach(relation => relation.cleanup());

    Backbone.prototype.remove.call(this);
  }
});