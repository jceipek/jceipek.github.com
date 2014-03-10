define(['mootools', 'TangleKit', 'Tangle', 'BigInt', 'elgamal'], function($, _, Tangle, BigInt, elgamal) {

  function findGeneratorFor(p,order,seconds) {
    var startTime = new Date();
    var g, k;
    var one = BigInt.int2bigInt(1,0,p.length);
    var two = BigInt.int2bigInt(2,0,p.length);
    var three = BigInt.int2bigInt(3,0,p.length);
    var pMinusOne = BigInt.sub(p,one);
    k = BigInt.bitSize(p);
    for (g = two; !BigInt.equals(g,pMinusOne); g = BigInt.add(g, one)) {
      if ((new Date()) - startTime > seconds * 1000) {
        console.log("Aborting findGeneratorFor -- ran out of time");
        return false;
      }
      if (!BigInt.equals(BigInt.powMod(g,order,p), one)) {
        continue;
      }
      return {
        p: BigInt.bigInt2str(p,10)
      , order: BigInt.bigInt2str(order,10)
      , generator: BigInt.bigInt2str(g,10)
      , pBI: p
      , orderBI: order
      , generatorBI: g
      }
    }
    return false;
  }

  function makeList(generator,p,order) {
    var list = [];
    var one = BigInt.int2bigInt(1,0,p.length);
    var orderPlusOne = BigInt.add(order, one);
    for (j = one; !BigInt.equals(j,orderPlusOne); j = BigInt.add(j, one)) {
        var raised = BigInt.powMod(generator,j,p);
        list.push(" "+BigInt.bigInt2str(raised,10));
    }
    return list;
  }

  // function multiplicativeOrderOf(a,n,seconds) {
  //   var startTime = new Date();
  //   var k, bitsize;
  //   var one = BigInt.int2bigInt(1,0,p.length);
  //   var two = BigInt.int2bigInt(2,0,p.length);
  //   var three = BigInt.int2bigInt(3,0,p.length);
  //   bitsize = BigInt.bitSize(p);
  //   for (k = one; !BigInt.equals(k,a); k = BigInt.add(k, one)) {
  //     if ((new Date()) - startTime > seconds * 1000) {
  //       console.log("Aborting findGeneratorFor -- ran out of time");
  //       return false;
  //     }
  //     if (!BigInt.equals(BigInt.powMod(a,k,n), one)) {
  //       continue;
  //     }
  //     return k;
  //   }
  // }

  // function findPrimitiveFor(p,order,seconds) {
  //   var startTime = new Date();
  //   var g, k;
  //   var one = BigInt.int2bigInt(1,0,p.length);
  //   var two = BigInt.int2bigInt(2,0,p.length);
  //   var three = BigInt.int2bigInt(3,0,p.length);
  //   var pMinusOne = BigInt.sub(p,one);
  //   k = BigInt.bitSize(p);
  //   for (g = three; !BigInt.equals(g,pMinusOne); g = BigInt.add(g, one)) {
  //     if ((new Date()) - startTime > seconds * 1000) {
  //       console.log("Aborting findGeneratorFor -- ran out of time");
  //       return false;
  //     }
  //     // g = BigInt.randBigInt(k,0);
  //     // if (BigInt.greater(two,g) || BigInt.greater(g,pMinusOne)) {
  //       // continue;
  //     // }
  //     if (!BigInt.equals(BigInt.powMod(g,order,p), one)) {
  //       continue;
  //     }
  //     return {
  //       p: BigInt.bigInt2str(p,10)
  //     , order: BigInt.bigInt2str(order,10)
  //     , generator: BigInt.bigInt2str(g,10)
  //     , pBI: p
  //     , orderBI: order
  //     , generatorBI: g
  //     }
  //   }
  // }

  // XXX: Warning: This function is very slow. Don't run on large numbers.
  function findGeneratorOfOrder(big, options, desiredOrder) {
    var passedOptions = options || {};
    var doList = passedOptions['list'] || false;

    var bigIntBits = BigInt.bitSize(big);

    var i, j;
    var one = BigInt.int2bigInt(1,10,10);
    var two = BigInt.int2bigInt(2,10,10);
    var bigMinusOne = BigInt.sub(big, one);
    var list;
    var powList;

    for (i = two; !BigInt.equals(i, bigMinusOne); i = BigInt.add(i, one)) {
      var order = BigInt.int2bigInt(0,10,10);
      list = [];
      powList = [];
      for (j = one; !BigInt.equals(j,big); j = BigInt.add(j, one)) {
        var raised = BigInt.powMod(i,j,big);
        if (doList) {
          list.push(" "+BigInt.bigInt2str(raised,10));
          powList.push(" "+BigInt.bigInt2str(i,10)+"<sup>"+BigInt.bigInt2str(j,10)+"</sup>");
        }
        order = BigInt.add(order, one);
        if (BigInt.equals(one,raised)) {
          if (BigInt.equals(order,desiredOrder)) {
            return {
              generator: BigInt.bigInt2str(i,10)
            , order: BigInt.bigInt2str(order,10)
            , generatorBI: i
            , orderBI: order
            , list: list
            , powList: powList
            };
          }
          break;
        }
      }
    }
    throw "Unable to find a valid generator!";
  }

  var possiblyBroken = $('.js-subgroup-example-possibly-broken');

  var model = {
    initialize: function () {
      this.primeP = 11;
      this.primes = BigInt.findPrimes(30000);
    }
    , update: function () {
      this.pminusOne = this.primeP-1;

      var pminusOne = BigInt.int2bigInt(this.pminusOne,10,10);
      var p = BigInt.int2bigInt(this.primeP,10,10);

      var factors = elgamal.factor(pminusOne,0.5);
      var readableFactors = [" 1"];
      for (var i = 0; i < factors.length; i++) {
        readableFactors.push(" "+elgamal.stringifyBI(factors[i]));
      }
      this.factors = readableFactors + " ";

      var fullGen = findGeneratorOfOrder(p,{'list':true},pminusOne);

      this.fullGenerator = fullGen.generator;
      this.fullGeneratorList = fullGen.list;

      var subgroupGen = findGeneratorFor(p,factors[factors.length-1],0.5);
      if (subgroupGen !== false) {
        possiblyBroken.removeClass('hidden');
        this.subgroupList = makeList(subgroupGen.generatorBI,p,subgroupGen.orderBI);
        this.subgroupListOrder = subgroupGen.order;
        this.subgroupGenerator = this.subgroupList[0];

        var one = BigInt.int2bigInt(1,10,10);
        var subgroupGen2 = BigInt.powMod(subgroupGen.generatorBI,BigInt.sub(subgroupGen.orderBI,one),p);
        this.subgroupGenerator2 = BigInt.bigInt2str(subgroupGen2,10);
        this.subgroupList2 = makeList(subgroupGen2,p,subgroupGen.orderBI);
      } else {
        possiblyBroken.addClass('hidden');
      }
    }
  };

  var G = {
    init: function () {
      var rootElement = $('.js-subgroup-example')[0];
      var tangle = new Tangle(rootElement, model);
    }
  }

  return G;

});