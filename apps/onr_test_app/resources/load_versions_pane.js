// ==========================================================================
// ONRTestApp.loadVersionsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadVersionsPane = SC.PanelPane.create({
  layout: { top: 0, bottom: 0, left: 0, right: 0 },
  defaultResponder: 'ONRTestApp.statechart',

  contentView: SC.View.design({

    layout: { centerX: 0, centerY: 0, width: 400, height: 380 },

    childViews: 'explanation loadVersionsButton'.w(),

    explanation: SC.LabelView.design({
      layout: { left: 60, top: 60, right: 60, height: 320 },
      value: "Review records have been loaded. Now we load versions (book versions)."
    }),

    loadVersionsButton: SC.ButtonView.design({
      layout: { right: 60, bottom: 60, width: 120, height: 32 },
      titleMinWidth: 0,
      isDefault: YES,
      title: 'Load Versions',
      action: 'loadVersions'
    })
  })
});
