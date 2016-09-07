import $ from "jquery";

// Extracts the path to the parameter by traversing up the tree
const getParameterPath = (parameter) => {
  let result = [parameter.getAttribute('name')];

  let currentNode = parameter;

  while (currentNode.parentNode && currentNode.parentNode.localName !== "parameterDefinitions") {
    result.push(currentNode.parentNode.getAttribute('name'));
    currentNode = currentNode.parentNode;
  }

  return result.reverse().join(".");
};

// Extract the values for the requested parameters
export const parseParamDocument = (document, params) => {
  const parameters = document.getElementsByTagName("parameter");

  return [...parameters].reduce((result, parameter) => {
    const parameterPath = getParameterPath(parameter);

    // Is this parameter one of the requested ones?
    if (params[parameterPath]) {
      // Include it in the result set by the requestee's modelMetadata
      result.set(params[parameterPath], parameter.getAttribute("value"));
    }

    return result;
  }, new Map());
};