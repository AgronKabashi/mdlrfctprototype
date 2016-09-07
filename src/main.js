import $ from "jquery";
import Backbone from "backbone";

import imageSpec from "business/specs/imageSpec";
import otherSpec from "business/specs/otherSpec";
import {GroupCollection} from "business/models";
import {PanelView} from "presentation/panelView";

// Process
// 1. Ensure that required models exist in globalStore
//   1.1 Extract only models that are missing from globalStore
//   1.2 Fetch data from camera by passing modelMetadata to dataAccess
//     1.2.1 Fetch data using appropriate model type reader
//     1.2.2 Parse data
//   1.3 Store models in GlobalStore
//   1.4 Trigger Sync

// 2. Render components / views

$(document).ready(() => {
  const groupCollection = new GroupCollection(otherSpec);
  const groupCollection2 = new GroupCollection(imageSpec);

  groupCollection.fetch().then((spec) => {
    const panelView = new PanelView({
      groups: spec
    });
    panelView.render();
    panelView.$el.appendTo($("#group1"));
  });

  groupCollection2.fetch().then((spec) => {
    const panelView = new PanelView({
      groups: spec
    });
    panelView.render();
    panelView.$el.appendTo($("#group2"));
  });
});