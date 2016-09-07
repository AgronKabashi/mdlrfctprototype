import $ from "jquery";

const logStyling = "font-weight:bold;color:blue";


export class PlainCgi {
  fetch (metaData) {
    console.log("%cPlainCGI - %cFETCH", logStyling, "color:red", metaData.getter);

    return new Promise((resolve) => {
      $.get(`/axis-cgi/${metaData.getter}`).then(() => {
        console.log("%cPlainCGI - %cFETCH Complete", logStyling, "color:green", metaData.getter);
        const result = new Map();
        result.set(metaData, "Some cgi value");

        resolve(result);
      });
    });
  }

  save (data, modelMetaData) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  }
}