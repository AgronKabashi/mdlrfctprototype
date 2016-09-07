export const updateLabel = (element, relatedModel, relationSettings) => {
  element.children("span").text(relatedModel.get("value") === relationSettings.trigger && relationSettings.label || relationSettings.defaultLabel);
};