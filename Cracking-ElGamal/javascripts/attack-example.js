define(['mootools', 'TangleKit', 'Tangle', 'BigInt', 'elgamal'], function($, _, Tangle, BigInt, elgamal) {

  var recompute = function (model) {
    var k = model.pBits;
    var oneBI = BigInt.int2bigInt(1,0,0);
    var twoBI = BigInt.int2bigInt(2,0,0);

    var foundGenerator = elgamal.findPrimeAndGenerator(k,10,10);
    if (foundGenerator === false) {
      throw "Unable to proceed because of time!";
    }

    var pBI = foundGenerator.pBI;
    var gBI = foundGenerator.generatorBI;
    var nBI = foundGenerator.orderBI;

    model.primeP = BigInt.bigInt2str(pBI,10);
    model.generatorG = BigInt.bigInt2str(gBI,10);
    model.orderN = BigInt.bigInt2str(nBI,10);


    var xBI = BigInt.int2bigInt(0,0,0);
    while (BigInt.greater(oneBI,xBI) || BigInt.greater(xBI,BigInt.sub(nBI,oneBI))) {
      xBI = BigInt.randBigInt(k-1,0);
    }

    var privateKey = {
      x: xBI // can be 1...n-1
    };
    model.keyX = BigInt.bigInt2str(xBI,10);


    var yBI = elgamal.findY(gBI,pBI,privateKey);
    var publicKey = {
      p: pBI
    , g: gBI
    , y: yBI
    };
    model.valueY = BigInt.bigInt2str(yBI,10);
  }

  var model = {
    initialize: function () {
      this.pBits = 32;
      // this.primeP = 11;
      // this.primes = BigInt.findPrimes(30000);
    }
    , update: function () {
        recompute(this);
      // this.pminusOne = this.primeP-1;

      // var pminusOne = BigInt.int2bigInt(this.pminusOne,10,10);
      // var p = BigInt.int2bigInt(this.primeP,10,10);

      // var factors = elgamal.factor(pminusOne,0.5);
      // var readableFactors = [" 1"];
      // for (var i = 0; i < factors.length; i++) {
      //   readableFactors.push(" "+elgamal.stringifyBI(factors[i]));
      // }
      // this.factors = readableFactors + " ";

      // var fullGen = findGeneratorOfOrder(p,{'list':true},pminusOne);

      // this.fullGenerator = fullGen.generator;
      // this.fullGeneratorList = fullGen.list;

      // var subgroupGen = findGeneratorFor(p,factors[factors.length-1],0.5);
      // if (subgroupGen !== false) {
      //   possiblyBroken.removeClass('hidden');
      //   this.subgroupList = makeList(subgroupGen.generatorBI,p,subgroupGen.orderBI);
      //   this.subgroupListOrder = subgroupGen.order;
      //   this.subgroupGenerator = this.subgroupList[0];

      //   var one = BigInt.int2bigInt(1,10,10);
      //   var subgroupGen2 = BigInt.powMod(subgroupGen.generatorBI,BigInt.sub(subgroupGen.orderBI,one),p);
      //   this.subgroupGenerator2 = BigInt.bigInt2str(subgroupGen2,10);
      //   this.subgroupList2 = makeList(subgroupGen2,p,subgroupGen.orderBI);
      // } else {
      //   possiblyBroken.addClass('hidden');
      // }
    }
  };

  var G = {
    init: function () {
      var rootElement = $('.js-attack-example')[0];
      var tangle = new Tangle(rootElement, model);
      $('.js-attack-example-pick-p').addEvent('click',function() {
        model.update();
      });
    }
  }

  return G;

});