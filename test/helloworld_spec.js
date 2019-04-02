describe('hello world', () => {
  it('returns string hello world', () => {
    var string = 'hello world';
    expect(string).toEqual('hello world');
  });
});

angular.module('sampleDirectives', [])
  .directive('firstDirective', function() {
    return function(scope, elem) {
      elem.append('<span>This span is appended from directive.</span>');
    };
  });

describe('testing my directive tests', () => {
  var compile, scope, directiveElem;

  beforeEach(function(){
    module('sampleDirectives');

    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement(){
    var element = angular.element('<div first-directive></div>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  it('should have span element', () => {
    var spanElement = directiveElem.find('span');
    expect(spanElement).toBeDefined();
    expect(spanElement.text()).toEqual('This span is appended from directive.');
  })
});
