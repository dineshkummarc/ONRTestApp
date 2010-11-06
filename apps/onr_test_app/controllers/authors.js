// ==========================================================================
// Project:   ONRTestApp.authorsController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller for a list of authors.

  @extends SC.ArrayController
*/
ONRTestApp.authorsController = SC.ArrayController.create(SC.CollectionViewDelegate,
/** @scope ONRTestApp.authorsController.prototype */ {
	allowMultipleSelection: YES,
	all: null,
	selection: null,
	_observingAuthors: [],

	allDidChange: function(){
	  if (!this.get("selection")) {
      this.set("effectiveSelection", this.get("all"));
      this.set("allIsSelected", YES);
    } else {
      this.recalculateFromAuthors();
    }
	}.observes("all", "[]"),

	selectAllAuthorsItem: function(){
	  this.set("selection", null);
	  this.set("effectiveSelection", this.get("all"));
	  this.set("allIsSelected", YES);
	},

	selectionDidChange: function() {
	  this.recalculateFromAuthors();
	}.observes("selection"),

	recalculateFromAuthors: function() {
	  if (this.get("selection") && this.get("selection").get("length") > 0) {
	    var result = SC.Set.create();
	    this.get("selection").forEach(function(author){
	      author.get("books").forEach(function(book) {
          result.add(book);
        });
	    });

      this.set("effectiveSelection", result.toArray());
	    this.set("allIsSelected", NO);
    }
	},

	collectionViewDeleteContent: function(view, content, indexes) {
	  this._pendingOperation = { action: "deleteAuthors", indexes: indexes  };
	  SC.AlertPane.warn(
	    "Be Careful!",
	    "Are you sure you want to delete these " + indexes.get("length") + " authors?",
	    null,
	    "Keep Authors",
	    "Delete Authors",
	    null,
	    this
	  );
	},

	deleteAuthors: function(op)
	{
	  var indexes = op.indexes;
	  var records = indexes.map(function(idx) {
	    return this.objectAt(idx);
	  }, this);
	  records.invoke('destroy');

	  var selIndex = indexes.get('min') - 1;
	  if (selIndex < 0) selIndex = 0;
	  this.selectObject(this.objectAt(selIndex));

		ONRTestApp.store.commitRecords();
	},

	alertPaneDidDismiss: function(pane, status) {
	  if (!this._pendingOperation) return;
	  switch (status) {
	    case SC.BUTTON2_STATUS:
	      this[this._pendingOperation.action].call(this, this._pendingOperation);
	      this._pendingOperation = null;
	      break;
	    case SC.BUTTON1_STATUS:
	      break;
	  }
	},

	removeBooks: function(books) {
	  var sel = this.get("selection");
	  if (!sel) return;

	  sel.forEach(function(item) {
	    item.get("books").removeObjects(books);
	  });
	  ONRTestApp.store.commitRecords();
	},

  isSingleSelection: function(){
    var sel = this.get("selection");
    if (!sel) return NO;
    if (sel.get('length') > 1) return NO;
    return YES;
  },

	addNewBook: function(book) {
	  var sel = this.get("selection");
	  if (!sel) return;
    if (sel.get('length') > 1) return; // although multiselect authors allowed, not for adding book
	  book.set("author", sel.firstObject());
    sel.firstObject().get('books').pushObject(book);

    this.recalculateFromAuthors();
	},

  generateCheckAuthorsFunction: function(){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        ONRTestApp.bumpAuthorCount();
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          var authorRecords = ONRTestApp.store.find(ONRTestApp.Author);
          var bookRecords = ONRTestApp.store.find(ONRTestApp.Book);
          authorRecords.forEach(function(authorRecord) {
            var fixturesKey = authorRecord.readAttribute('fixturesKey');

            // this causes bucket prototype error in ONR:
            //var bookRecords = ONRTestApp.store.find(SC.Query.local({
            //recordType: ONRTestApp.Book,
            //conditions: "fixturesKey ANY {id_fixtures_array}",
            //parameters: { id_fixtures_array: ONRTestApp.Author.FIXTURES[fixturesKey-1].books }
            //}));

            var bookRecordsForAuthor = [];
            bookRecords.forEach(function(bookRecord) {
              if (ONRTestApp.Author.FIXTURES[fixturesKey-1].books.indexOf(bookRecord.readAttribute('fixturesKey')) !== -1) {
                bookRecordsForAuthor.pushObject(bookRecord);
              }
            });

            authorRecord.get('books').pushObjects(bookRecordsForAuthor);
          });

          ONRTestApp.store.commitRecords();
        }
        return YES;
      }
      else return NO;
    };
  },

  generateCheckAuthorFunction: function(authorRecord){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        ONRTestApp.bumpAuthorCount();

        var bookRecords = ONRTestApp.store.find(ONRTestApp.Book);
        var fixturesKey = authorRecord.readAttribute('fixturesKey');

        var bookRecordsForAuthor = [];
        bookRecords.forEach(function(bookRecord) {
          if (ONRTestApp.Author.FIXTURES[fixturesKey-1].books.indexOf(bookRecord.readAttribute('fixturesKey')) !== -1) {
            bookRecordsForAuthor.pushObject(bookRecord);
          }
        });

        authorRecord.get('books').pushObjects(bookRecordsForAuthor);
        ONRTestApp.store.commitRecords();
        return YES;
      }
      else return NO;
    };
  },

  // Where to get key for new record? from global counter here? from core_actions.js?
  //    -- hard-coded 1001 now
  addAuthor: function(){
    var author;

    var authorKey = ONRTestApp.nextRecordKey();

    author = ONRTestApp.store.createRecord(ONRTestApp.Author, {
      //"key":         authorKey,
      "fixturesKey": authorKey,
      "firstName":   "First",
      "lastName":    "Last"
    });

    this.selectObject(author);
    this.invokeLater(function(){
      var contentIndex = this.indexOf(author);
      var list = ONRTestApp.mainPage.getPath("mainPane.splitter.topLeftView.authorList.contentView");
      var listItem = list.itemViewForContentIndex(contentIndex);
      listItem.beginEditing();
    });
  },

  // This function could be called loadAuthors, because it is only done on load
  createAuthors: function(){
    this._tmpRecordCount = ONRTestApp.Author.FIXTURES.get('length');
    for (var i=0,len=ONRTestApp.Author.FIXTURES.get('length'); i<len; i++){
      var author;
      author = ONRTestApp.store.createRecord(ONRTestApp.Author, {
        //"key":         ONRTestApp.Author.FIXTURES[i].key,
        "fixturesKey": ONRTestApp.Author.FIXTURES[i].key,
        "firstName":   ONRTestApp.Author.FIXTURES[i].firstName,
        "lastName":    ONRTestApp.Author.FIXTURES[i].lastName
      });
      author.addFiniteObserver('status',this,this.generateCheckAuthorsFunction(),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCount: 0

}) ;
