import {MODEL_TYPES} from "datalayer/modelTypes";

export const MODEL_METADATA = {
  color: {
    type: MODEL_TYPES.PARAM,
    paramName: 'ImageSource.I{{camNbr}}.Sensor.ColorLevel',
    fallbackParamName: 'ImageSource.I{{camNbr}}.Video.Saturation'
  },

  brightness: {
    type: MODEL_TYPES.PARAM,
    paramName: 'ImageSource.I{{camNbr}}.Sensor.Brightness',
    fallbackParamName: 'ImageSource.I{{camNbr}}.Video.Brightness',
  },

  skipWizard: {
    type: MODEL_TYPES.CGI,
    getter: "clientnotes/getvalue.cgi?group=ACA&key=skip_wizard"
  },

  overlayTextColor: {
    type: MODEL_TYPES.PARAM,
    paramName: 'Image.I{{camNbr}}.Text.Color'
  },

  overlayBackgroundColor: {
    type: MODEL_TYPES.PARAM,
    paramName: 'Image.I{{camNbr}}.Text.BGColor'
  },

  rootPasswordSet: {
    type: MODEL_TYPES.CGI,
    getter: "rootpwdsetvalue.cgi"
  },

  //
  advancedOverlayAppearance: {
    type: MODEL_TYPES.COMBINED,
    dependencies: [
      'overlayTextColor',
      'overlayBackgroundColor'
    ]
  }
};