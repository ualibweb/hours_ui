// don't forget to include ngMockAnimate in beforeEach... or maybe do? I don't think it's necessary
describe('ListCtrl', () => {
  beforeEach(module('hours.list'));
  
  var $contoller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_; 
  }));

  describe('setStatus', () => {
    it('checks data for library hours and sets status to open', () => {
      //isOpen
    });
    it('checks data for library hours and sets status to closing soon', () => {
      //closing soon
    });
    it('checks data for library hours and sets status to closed', () => {
      //closed
    });
    it('checks data for children of library and sets the status', () => {
      //children status
    });
    it('pushes new data to array of hours data', () => {
      //push to array
    });
  })

})



//testing a directive... putting this on hold until I can get angular testing straight
describe('Unit testing libHours directive', () => {
  var compile,
      scope,
      directiveElm;

  beforeEach(function(){
  
    module('hours.list');

    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
    });
    
    directiveElm = getCompiledElement();

  });

  function getCompiledElement(){
    var element = angular.element('<div class="lib-hours"></div>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  it('should inject div with class responsive table', () => {
    var divElement = directiveElm.find('div');
    expect(divElement).toBeDefined;
    // expect(divElement).toHaveClass('lib-hours');
  })
});
