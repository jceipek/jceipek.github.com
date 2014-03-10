"use strict";

require.config({
  paths: {
      // zepto: '3rdparty/zepto.min'
      mootools: '3rdparty/TangleKit/mootools'
    , Tangle: '3rdparty/Tangle'
      /* Note the `delayStartupUntil=configured` parameter */
    , mathjax: 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured'
    // , sprintf: '3rdparty/TangleKit/sprintf.js'
    , BVTouchable: '3rdparty/TangleKit/BVTouchable'
    , TangleKit: '3rdparty/TangleKit/TangleKit'
    , BigInt: '3rdparty/BigInt'

  },

  shim: {
          mootools: { exports: '$$' }
        , Tangle: { exports: 'Tangle' }
        , mathjax: { exports: 'MathJax'
                   , init: function () { MathJax.Hub.Config({ jax: ["input/TeX", "output/HTML-CSS"]
                                                            , extensions: ["tex2jax.js","MathMenu.js","MathZoom.js"]
                                                            , TeX: { extensions: [ "AMSmath.js"
                                                                                 , "AMSsymbols.js"
                                                                                 , "noErrors.js"
                                                                                 , "noUndefined.js"
                                                                                 ]
                                                                   }
                                                            , tex2jax: { inlineMath: [ ['%%','%%'] ]
                                                                       , displayMath: [ ['$$','$$'] ]
                                                                       , processEscapes: true
                                                                       }
                                                            , "HTML-CSS": { availableFonts: ["TeX"] }
                                                            });
                                          MathJax.Hub.Startup.onload();
                                          return MathJax;
                                       }
                   }
        }
});

require([ '3rdparty/domReady!'
        , 'mathjax'
        , 'example-example'
        , 'modulo-example'
        , 'subgroup-example'
        , 'attack-example'
        ]
       , function(_, mathjax, exampleExample, moduloExample, subgroupExample, attackExample) {
  exampleExample.init();
  moduloExample.init();
  subgroupExample.init();
  attackExample.init();
});