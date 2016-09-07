import Backbone from "backbone";
import {GlobalStore} from "business/globalStore";

export const PanelView = Backbone.View.extend({
  className: "panel",

  initialize (options) {
    this.options = options;
  },

  render () {
    this.options.groups.forEach(this._renderGroup.bind(this));
  },

  _renderGroup (groupData) {
    groupData.components.forEach(this._renderComponent.bind(this));
  },

  _renderComponent (componentData) {
    const componentView = new componentData.componentView(componentData);
    this.$el.append(componentView.$el);
  }
});