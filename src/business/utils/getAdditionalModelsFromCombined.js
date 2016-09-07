import {MODEL_METADATA} from "business/modelMetadata";
import {filterCombinedModels, filterNativeModels} from "business/filters";

// Recursive method that traverses combined models and extracts
// the required models
export const getAdditionalModelsFromCombined = (combinedModels) => {
  // Extract the model Ids from the models property on each combined model
  const modelIds = [...new Set(combinedModels.reduce((a, b) => [...a, ...b.dependencies], []))];

  // Get the actual model metadata references
  const models = modelIds.map(m => MODEL_METADATA[m]);

  // Filter out the native and combined models. The combined models will require
  // additional traversing since they allow nesting on many levels
  let combined = models.filter(filterCombinedModels);
  let native = models.filter(filterNativeModels);

  if (combined.length) {
    const additionalModels = getAdditionalModelsFromCombined(combined);
    native = native.concat(additionalModels.native);
    combined = combined.concat(additionalModels.combined);
  }

  return {
    native,
    combined
  };
};