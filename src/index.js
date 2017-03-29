'use strict'

var wj = require('webjerk')

wj.run({
  plugins: [
    {
      name: 'webjerk-snaps',
      config: {
        desiredCapabilities: [
          { browserName: 'safari' },
          { browserName: 'firefox' }
        ],
        url: 'http://localhost:3333',
        testName: 'bananas',
        snapDefinitionsFromWindow: function snapDefinitionsFromWindow (divs, message) {
          // @NOTE this JS is run in the _browser_ context
          // webdriverio JS serialziation requires semis. :/
          var divs = document.getElementsByTagName('div');
          var map = [];
          var i = 0;
          var tDiv;
          while (divs[i]) {
            tDiv = divs[i];
            if (!tDiv.id) tDiv.id = '__dummy_div_' + i;
            map.push({ elem: '#' + tDiv.id, name: tDiv.id });
            ++i;
          }
          return map;
        }
      }
    }
  ]
})
