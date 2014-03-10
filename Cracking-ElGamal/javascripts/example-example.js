define(['mootools', 'TangleKit', 'Tangle', 'BigInt', 'elgamal'], function($, _, Tangle, BigInt, elgamal) {

  function allFactors(n,seconds) {
      var factors = elgamal.factor(n,0.5);
      var readableFactors = [" 1"];
      for (var i = 0; i < factors.length; i++) {
        readableFactors.push(" "+elgamal.stringifyBI(factors[i]));
      }
    return readableFactors;
  }

  var model = {
    initialize: function () {
      this.exampleN = 100;
    }
    , update: function () {
      var p = BigInt.int2bigInt(this.exampleN,10,10);
      this.exampleFactors = allFactors(p,0.5) + " ";
    }
  };

  var G = {
    init: function () {
      var rootElement = $('.js-example-example')[0];
      var tangle = new Tangle(rootElement, model);
    }
  }

  return G;

});