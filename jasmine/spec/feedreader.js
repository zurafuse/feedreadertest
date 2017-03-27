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
		 * Answer: It says 'Expected 0 to not be 0'. This makes sense because
		 * it is an empty array, so the expectation that allFeeds.length is not
		 * 0 is not met.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         * This for loop checks the url property of each object in the allFeeds array and checks to
		 * make sure no .url property is defined or empty.
		*/		 
		it('has a defined URL that is not empty', function() {
			for (i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe("");
			}
		});
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         * This for loop checks the name property of each object in the allFeeds array and checks to
		 * make sure no .name property is defined or empty.
         */
		it('has a defined URL that is not empty', function() {
			for (i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe("");
			}
		});		 
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
		 * If the .menu-hidden class is available, the style sheet has the transform
		 * attribute of the slide-menu set to -12em, thus hiding it.
         */
		it('is hidden by default', function(){
			expect($('.menu-hidden')[0]).toBeDefined();
		});
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
		  * Perform the same check as 'is hidden by default' but this time check
		  * once after a user clicks the hamburger icon to make sure .menu-hidden 
		  * is no longer available, and check again after the user clicks a second 
		  * time to make sure .menu-hidden has returned.
          */
		it('visibility toggles correctly when hamburger icon is clicked', function() {
			//click once to remove "menu-hidden" and make sure the menu is now visible.
			$('.menu-icon-link').click();
			expect($('.menu-hidden')[0]).not.toBeDefined();
			//click a second time to add the "menu-hidden" class back again and check to make sure it is hidden.
			$('.menu-icon-link').click();
			expect($('.menu-hidden')[0]).toBeDefined();
		});
	});
    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
		 * Before each run of loadFeed(), "done' is passed as the call back.
		 * This is to prevent expect() to run again before the previous instance
		 * of loadFeed has completed.
         */
		beforeEach(function(done){
			loadFeed(0, function(){
				done();
			})
		});
		//make sure there is at least one entry after loadFeed is called.
		it('exist in the .feed container when the loadFee() function is called', function(){
			expect($('.entry-link')[0]).toBeDefined();
		});
	});
    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
		 * First, before a new entry is created, assign the last entry to
		 * a variable called previousEntry. Then after the function has run,
		 * compare the last entry to what the last entry was before the function
		 * and make sure they are not the same thing.
         */
		var previousEntry;
		beforeEach(function(done){
			loadFeed(0, function(){
				previousEntry = $('.entry-link').last().html();
				//run loadFeed() a second time to create a new feed that we can compare to the previous one.
				loadFeed(1, function() {
					done();
				});
			});
		});
		
		it('actually changes the content', function(){
			expect(previousEntry).not.toBe($('.entry-link').last().html());
		});
	});
}());
