// ==========================================================================
// Project:   ONRTestApp.bookController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller for a single book.

  @extends SC.Object
*/
ONRTestApp.bookController = SC.ObjectController.create(
/** @scope ONRTestApp.bookController.prototype */ {
	contentBinding: "ONRTestApp.booksController.selection",
	contentBindingDefault: SC.Binding.single(),

	isEditing: NO,

	beginEditing: function() {
		this.set("isEditing", YES);
    // SC.FormView has a default setting for isEditing, which is YES
		//ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.versionView").beginEditing();
	},

	endEditing: function() {
		this.set("isEditing", NO);
    // SC.FormView has a default setting for isEditing, which is YES
		//ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.versionView").commitEditing();
		ONRTestApp.store.commitRecords();
	}

//  hasCharacterInTitleFunctionCreator: function(char){
//    var title = this.get('content').get('title');
//    return function(){
//      return (title.indexOf(char)!= -1);
//    }
//  },
//
//  hasBookTypeFunctionCreator: function(type){
//    var versions = this.get('content').get('versions');
//    return function(){
//      versions.forEach(function(version) {
//        if (version.get('format') === type) {
//          return YES;
//        }
//      });
//
//      return NO;
//    }
//  },
//
//  hasHardbackVersion: this.hasBookTypeFunctionCreator('hardback'),
//  hasPaperbackVersion: this.hasBookTypeFunctionCreator('paperback'),
//  hasMediaVersion: this.hasBookTypeFunctionCreator('media'),
//
//  hasColonInTitle: this.hasCharacterInTitleFunctionCreator(':'),
//  hasOpenParenthesisInTitle: this.hasCharacterInTitleFunctionCreator('(')
});

