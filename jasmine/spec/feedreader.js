/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     * 1 spec, 1 failure: expected 0 not to be zero.
     */

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('have associated urls', function() {
      for (i=0; i < allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });

    it('have names', function() {
      for (i=0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });

  describe('The menu', function() {
    it('is initially hidden',function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    it('visibility changes when clicked', function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    })
  });

  describe('Initial Entries', function() {
      beforeEach(function(done){
         loadFeed(0,done);
      });

      it('return at least one row', function(){
        expect($(".feed .entry").length).toBeGreaterThan(0);
      //i finally got it -- the reason i don't need a done was because of
      //BeforeEach took care of completing the async call! thanks for the pointers!
      });
  });

  describe('New Feed Selection', function(){
    it('changes after load',function(done){
      var startState = '';
      var endState =''
      loadFeed(1, function(){
        startState = $('.feed').html();
        loadFeed(2, function(){
          //to get the test to work you have to perform it inside this function
          //where you know that the second load has completed.
          endState = $('.feed').html();
          expect(endState).not.toEqual(startState);
          done();
        });
      });
    });
 });
});
