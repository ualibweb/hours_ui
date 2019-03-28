describe('Unit testing libHours directive', () => {
  var compile,
      scope,
      directiveElm;

  beforeEach(function(){
  
    module('hours.list');

    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope;
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
