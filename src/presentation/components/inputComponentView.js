import {BaseComponentView} from "presentation/baseComponentView";

export const InputComponentView = BaseComponentView.extend({
  className: 'component',
  events: {
    "change input": "_onChange"
  },

  initialize (options) {
    BaseComponentView.prototype.initialize.call(this, options);
    this.render();
  },

  render () {
    this.$el.html(`<span>${this.options.label}</span> <input value="${this.model.get("value")}">`);

    BaseComponentView.prototype.render.call(this);
  },

  _onChange (e) {
    // Saving the value directly on the model?
    // Maybe consider sending an action instead and let it be handled somewhere up the hierarchy?
    this.model.save("value", e.target.value);
  },

  _updateView () {
    console.log(`Updating view with label "${this.options.label}"`);
    this.$el.children("input").val(this.model.get("value"));
  }
});