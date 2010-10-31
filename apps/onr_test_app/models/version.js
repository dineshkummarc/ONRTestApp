// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.Version
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.Version = SC.Record.extend(
/** @scope ONRTestApp.Version.prototype */ {
  primaryKey:  'key',
  bucket:      'version',
  publisher:       SC.Record.attr(String),
  publicationDate: SC.Record.attr(String),
  format:          SC.Record.attr(String),
  pages:           SC.Record.attr(Number),
  language:        SC.Record.attr(String),
  rank:            SC.Record.attr(Number),
  height:          SC.Record.attr(Number),
  width:           SC.Record.attr(Number),
  depth:           SC.Record.attr(Number),
  isbn10:          SC.Record.attr(String),
  isbn13:          SC.Record.attr(String),

  // Relations
  book: SC.Record.toOne("ONRTestApp.Book",  { inverse: "version", isMaster: NO }),
  reviews: SC.Record.toMany("ONRTestApp.Review", { inverse: "version", isMaster: YES })
});
