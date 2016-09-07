export const visibility = (element, relatedModel, relationSettings) => {
  element.toggleClass("hidden", relatedModel.get("value") !== relationSettings.trigger);
};