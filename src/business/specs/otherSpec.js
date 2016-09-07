import {MODEL_METADATA} from "business/modelMetadata";
import * as components from "presentation/components";

export default [
  {
    label: "Other componnents",
    components: [
      {
        label: "Overlay Color",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.overlayTextColor
      },
      {
        label: "Overlay BG Color",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.overlayBackgroundColor
      }
    ]
  }
];