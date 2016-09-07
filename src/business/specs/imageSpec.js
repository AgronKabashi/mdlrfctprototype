import {MODEL_METADATA} from "business/modelMetadata";
import * as components from "presentation/components";

export default [
  {
    label: "Components with native models",
    components: [
      {
        label: "Color",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.color
      },
      {
        label: "Brightness",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.brightness
      },
      {
        //label: "Skip Wizard",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.skipWizard,
        relations: [{
          type: "updateLabel",
          relatedModel: MODEL_METADATA.color,
          trigger: "33",
          label: "New label",
          defaultLabel: "Skip Wizard"
        }]
      },
      {
        label: "Rootpassword set",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.rootPasswordSet,
        relations: [{
          type: "visibility",
          relatedModel: MODEL_METADATA.color,
          trigger: "40"
        }]
      }
    ]
  },
  {
    label: "Components using combined models",
    components: [
      {
        label: "Overlay appearance",
        componentView: components.InputComponentView,
        data: MODEL_METADATA.advancedOverlayAppearance
      }
    ]
  }
];