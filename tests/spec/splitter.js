'use strict';
describe('Controller: SplitterIndexCtrl', function() {

  var SplitterIndexCtrl,
  	SplitterServiceMock,
    scope;
	
	// load the controller's module
  beforeEach(module('CostSplitter', 'MockedServices'));

  // define SplitterServiceMock
  beforeEach(inject(function(LocalStorageMock) {
    var splitters = LocalStorageMock.CostSplitter;
    SplitterServiceMock = {
	    query: function() {
	      return splitters;
	    },
	    getEvent: function(splitterId, eventId) {
	      return splitters[splitterId].events[eventId];
	    },
	    getSplitterEvents: function (splitterId) {
	    	return splitters[splitterId].events;
	    },
	    addEventToSplitter: function (splitterId, newEvent) {
	    	splitters[splitterId].events.push(newEvent);
	    	return newEvent;
	    },
	    removeSplitter: function (splitterId) {
	    	splitters.splice(splitterId, 1);
	    	return splitterId;
	    }
	  };
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SplitterIndexCtrl = $controller('SplitterIndexCtrl', {
      $scope: scope,
      SplitterService: SplitterServiceMock
    });
  }));
  
  it('should retrieve 2 Splitters', function() {
    expect(scope.splitters.length).toBe(2);
  });

  it('should retrieve 2 Events from first Splitter', function () {
  	expect(SplitterServiceMock.getSplitterEvents(0).length).toBe(2);
  });
  
  it('should add new Event to first Splitter', function() {
  	scope.newEvent = { id: 30, title: 'newEvent' };
  	scope.addEvent(0);
  	expect(SplitterServiceMock.getSplitterEvents(0).length).toBe(3);
  	expect(scope.splitters[0].events.length).toBe(3);
  });

  it('should remove Splitter by index', function () {
  	scope.removeSplitter(1);
  	expect(SplitterServiceMock.query().length).toBe(1);
  	expect(scope.splitters.length).toBe(1);
  });

});

