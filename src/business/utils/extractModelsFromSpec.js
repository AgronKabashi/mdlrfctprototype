// Extracts model metadata from components in a spec definition
export const extractModelsFromSpec = (spec) => {
  return spec.reduce((result, groupSpec) => {
    result.push(
      ...groupSpec.components
        .map(component => component.data));

    return result;
  }, []);
};