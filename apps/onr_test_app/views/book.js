// ==========================================================================
// Project:   ONRTestApp.BookView
// ==========================================================================
/*globals ONRTestApp Forms */

/** @class

        (Document Your View Here)

 @extends SC.View
 */

//SC.Animatable.defaultTimingFunction = SC.Animatable.TRANSITION_EASE_IN_OUT;

ONRTestApp.BookView = SC.View.extend(SC.Animatable,
  /** @scope ONRTestApp.BookView.prototype */ {
  layout: {left:0, right:0},
  classNames: ["book-view"],
  childViews: "versionsView authorForm bookTitleForm versionView reviewsView".w(),
  backgroundColor: "white",
  contentBindingDefault: SC.Binding.single(),

  transitions: {
    opacity: {
      duration: 0.25,
      timing: SC.Animatable.TRANSITION_EASE_IN_OUT,
      action: function(){
        if (this.style.opacity === 0) this._call_when_done();
      }
    }
  },

  layoutDidChangeFor: function(what) {
    sc_super();
    if (this.get("versionView") && !this.get("versionView").isClass) {
      this.adjust("minHeight", this.getPath("versionView.layout").minHeight + 40);
    }
  },

  versionsView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { top: 10, height: 100, left: 10, width: 150 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
      contentBinding: 'ONRTestApp.versionsController.arrangedObjects',
      selectionBinding: 'ONRTestApp.versionsController.selection',
      contentValueKey: "format",
      canEditContent: YES,
      canReorderContent: YES,
      canDeleteContent: YES,
      destroyOnRemoval: YES,
      rowHeight: 21
    })
  }),

  authorForm:  SC.FormView.design({
    layout: { top: 10, left: 490, width: 300, height: 60, centerY: 0 },
    contentBinding: "ONRTestApp.authorController",
    childViews: 'firstName lastName'.w(),

    firstName: SC.FormView.row(SC.TextFieldView.design({
      layout: { top: 0, left: 0, width: 150, height: 21, centerY: 0},
      hint: 'First Name'
      //value: "First Name"
      //isSpacer: YES,
      //autoHide: YES
    })),

    lastName: SC.FormView.row(SC.TextFieldView.design({
      layout: { top: 30, left: 0, width: 150, height: 21, centerY: 0},
      hint: 'Last Name'
      //value: "Last Name"
      //isSpacer: YES,
      //autoHide: YES
    }))
  }),

  bookTitleForm: SC.FormView.design({
    layout: { left: 490, top: 80, width: 300, height: 30, centerY: 0},
    contentBinding: "ONRTestApp.bookController",
    childViews: 'title'.w(),

    title: SC.FormView.row(SC.TextFieldView.design({
      layout: { top: 0, left: 0, width: 150, height: 21, centerY: 0},
      hint: 'New Title'
      //value: "Title"
      //isSpacer: YES,
      //autoHide: YES
    }))
  }),

  versionView: SC.FormView.design({
    layout: { top: 10, height: 300, left: 170, width: 300 },
    contentBinding: ".parentView.content",
    //rowPadding: 5,
    childViews: "publisher publicationDate format language rank height width depth isbn10 isbn13".w(),

//    publisherHeader: SC.LabelView.design({
//      layout: { width: 200, height: 21 },
//      value: "Publisher"
//    }),

    publisher: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "Bantam, etc."
      //value: "Publisher"
      //isSpacer: YES,
      //autoHide: YES
    })),

    publicationDate: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "yyyy-m-d"
      //value: "Date"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    detailsHeader: SC.LabelView.design({
//      layout: { width: 200, height: 21 },
//      //classNames: "header".w(),
//      value: "Details for this version"
//    }),

    format: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "Paperback, DVD, etc."
      //value: "Format"
      //isSpacer: YES,
      //autoHide: YES
    })),

    pages: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "Integer value"
      //value: "Pages"
      //isSpacer: YES,
      //autoHide: YES
    })),

    language: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "For book text"
      //value: "Language"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    spacer1: SC.View.design({
//      layout: { left: 0, width: 150, height: 14, centerY: 0},
//      value: "",
//      flowSize: { widthPercentage: 1 }
//    }),

    rank: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "Integer value"
      //value: "Rank"
      //isSpacer: YES,
      //autoHide: YES
    })),

    height: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "In inches"
      //value: "Height"
      //isSpacer: YES,
      //autoHide: YES
    })),

    width: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "In inches"
      //value: "Width"
      //isSpacer: YES,
      //autoHide: YES
    })),

    depth: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "In inches"
      //value: "Depth"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    spacer2: SC.View.design({
//      layout: { left: 0, width: 150, height: 14, centerY: 0},
//      value: "",
//      flowSize: { widthPercentage: 1 }
//    }),

    isbn10: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "10 character ISBN"
      //value: "ISBN (10)"
      //isSpacer: YES,
      //autoHide: YES
    })),

    isbn13: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      hint: "13 character ISBN"
      //value: "ISBN (13)"
      //isSpacer: YES,
      //autoHide: YES
    }))

  }),

  reviewsView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { left: 10, top: 320, height: 320, right: 10 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
      contentBinding: 'ONRTestApp.reviewsController.arrangedObjects',
      selectionBinding: 'ONRTestApp.reviewsController.selection',
      contentValueKey: "text",
      canEditContent: YES,
      canReorderContent: YES,
      canDeleteContent: YES,
      destroyOnRemoval: YES,
      rowHeight: 21
    })
  }),

  /* This stuff goes at the end because it is entirely to test animation. So there. */
  append: function() {
    this.disableAnimation();
    this.adjust("opacity", 1).updateLayout();
    this.enableAnimation();
    sc_super();
  },

  remove: function() {
    this._call_when_done = arguments.callee.base;
    this.adjust("opacity", 0);
  },

  index: 0
});

