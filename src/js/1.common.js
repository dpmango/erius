document.addEventListener('DOMContentLoaded', function () {
  var mainElem = document.querySelector('.main'),
    img3Elem = document.querySelector('.img-block-3'),
    img3PointElem = document.getElementById('img-3-point'),
    img3PointBotElem = document.getElementById('img-3-point-bottom'),
    img3OffsetBottom = 0,
    arrElements = document.querySelectorAll('.arr'),
    fstScreenElem = document.querySelector('.first-screen'),
    imgBlockElements = document.querySelectorAll('.img-block'),
    blockElements = document.querySelectorAll('.block'),
    img2Elem = document.querySelector('.img-block-2'),
    img2PointElem = document.getElementById('img-2-point'),
    img4Elem = document.querySelector('.img-block-4'),
    img4PointElem = document.getElementById('img-4-point'),
    img5Elem = document.querySelector('.img-block-5'),
    img5PointElem = document.getElementById('img-5-point'),
    findTextElements = document.querySelectorAll('.find-block');

  window.onload = function () {
    if (window.innerWidth > 1000) {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 21);

      for (var i = 0; i < imgBlockElements.length; i++) {
        var elem = imgBlockElements[i];

        elem.classList.add('free');

        elem.parentElement.style.height =
          elem.parentElement.offsetHeight + 'px';

        elem.classList.remove('free');
      }
    }
  };

  function setPosImgBlock(pos, prop) {
    var offsetY;

    if (pos == 'abs') {
      offsetY = fstScreenElem.offsetHeight + 50;
    } else if (pos == 'fix') {
      offsetY = window.innerHeight / 2 + 50;
    }

    for (var i = 0; i < imgBlockElements.length; i++) {
      var elem = imgBlockElements[i];

      if (prop == 'left') {
        elem.classList.remove('fix');
        elem.classList.remove('abs');
        elem.classList.remove('free');

        elem.style.left = 0;

        elem.style.left = elem.getBoundingClientRect().left + 'px';
      }

      if (elem.classList.contains('img-block-2')) {
        elem.style.top = offsetY + 110 + 'px';
      } else if (elem.classList.contains('img-block-4')) {
        elem.style.top = offsetY + 220 + 'px';
      } else {
        elem.style.top = offsetY + 'px';
      }

      if (pos == 'abs') {
        elem.classList.add('abs');
        elem.classList.remove('fix');
      } else if (pos == 'fix') {
        elem.classList.add('fix');
        elem.classList.remove('abs');
      }
    }
  }

  function scrollBg() {
    if (!document.body.classList.contains('popup-is-opened')) {
      // bg
      mainElem.style.backgroundPosition = '0 -' + window.pageYOffset / 2 + 'px';

      // images
      // console.log(fstScreenElem.getBoundingClientRect().bottom, (window.innerHeight / 3) * 2);

      if (
        fstScreenElem.getBoundingClientRect().bottom + 50 <=
        window.innerHeight / 2 + 50
      ) {
        setPosImgBlock('fix');
      } else {
        setPosImgBlock('abs');
      }

      // img 2
      if (
        img2PointElem.getBoundingClientRect().top <=
        window.innerHeight / 2 + 50
      ) {
        img2Elem.classList.add('free');
        img2Elem.classList.add('free-2');
      } else if (
        img2PointElem.getBoundingClientRect().top <=
        window.innerHeight / 2 + 50 + 110
      ) {
        img2Elem.classList.add('free');
        img2Elem.classList.remove('free-2');
      } else if (
        img2PointElem.getBoundingClientRect().top >=
        window.innerHeight / 2 + 50 + 110
      ) {
        img2Elem.classList.remove('free');
        img2Elem.classList.remove('free-2');
      }

      //img 4
      if (
        img4PointElem.getBoundingClientRect().top <=
        window.innerHeight / 2 + 50 + 220
      ) {
        img4Elem.classList.add('free');
      } else {
        img4Elem.classList.remove('free');
      }

      //img 5
      if (
        img5PointElem.getBoundingClientRect().top <=
        window.innerHeight / 2 + 50
      ) {
        img5Elem.classList.add('free');
      } else {
        img5Elem.classList.remove('free');
      }

      // blocks
      for (var i = 0; i < blockElements.length; i++) {
        var blockElem = blockElements[i];

        if (
          blockElem.getBoundingClientRect().top <=
          window.innerHeight / 2 + 50 ||
          (blockElem.classList.contains('block_last') &&
            blockElem.getBoundingClientRect().top <= window.innerHeight - 100)
        ) {
          blockElem.classList.add('vis');
        } else {
          blockElem.classList.remove('vis');
        }
      }

      // img sirop
      var img3Offset = img3Elem.getBoundingClientRect();

      if (img3OffsetBottom >= img3PointBotElem.getBoundingClientRect().top) {
        img3Elem.style.top =
          img3PointBotElem.getBoundingClientRect().top +
          window.pageYOffset -
          img3Elem.offsetHeight +
          'px';
        img3Elem.style.left = img3Offset.left + 'px';
        img3Elem.classList.add('abs');
        img3Elem.classList.remove('fix');
        img3Elem.parentElement.style.height = img3Elem.offsetHeight + 20 + 'px';
      } else if (
        window.innerHeight / 2 - 190 >=
        img3PointElem.getBoundingClientRect().top
      ) {
        img3Elem.style.top = window.innerHeight / 2 - 190 + 'px';
        img3Elem.style.left = img3Offset.left + 'px';
        img3Elem.classList.add('fix');
        img3Elem.classList.remove('abs');
        img3Elem.parentElement.style.height = img3Elem.offsetHeight + 20 + 'px';
        img3OffsetBottom = window.innerHeight / 2 - 190 + img3Elem.offsetHeight;
      } else if (
        window.innerHeight / 2 - 190 <
        img3PointElem.getBoundingClientRect().top
      ) {
        img3Elem.style.top = '';
        img3Elem.style.left = '';
        img3Elem.classList.remove('fix');
        img3Elem.classList.remove('abs');
        img3OffsetBottom = 0;
      }

      // arrows
      for (var i = 0; i < arrElements.length; i++) {
        var arrElem = arrElements[i];

        if (window.innerHeight / 2 > arrElem.getBoundingClientRect().top) {
          arrElem.classList.add('arr_vis');
        } else {
          arrElem.classList.remove('arr_vis');
        }
      }
    }
  }

  /* function smoothScroll(st) {
 	
 	Math.easeOut = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };
 	
 	var interval, // scroll is being eased
 	mult = 0, // how fast do we scroll
 	dir = 0, // 1 = scroll down, -1 = scroll up
 	steps = 100, // how many steps in animation
 	length = 30; // how long to animate
 	function MouseWheelHandler(e) {
 		if (!document.body.classList.contains('popup-is-opened')) {
 			e.preventDefault(); // prevent default browser scroll
 			clearInterval(interval); // cancel previous animation
 			++mult; // we are going to scroll faster
 			var delta = Math.max(-1, Math.min(1, (e.deltaY)));
 			if(dir!=delta) { // scroll direction changed
 				mult = 1; // start slowly
 				dir = delta;
 			}
 			for(var tgt=e.target; tgt!=document.documentElement; tgt=tgt.parentNode) {
 				var oldScroll = tgt.scrollTop;
 				tgt.scrollTop+= delta;
 				if(oldScroll!=tgt.scrollTop) break;
 			}
 			var start = tgt.scrollTop;
 			var end = start + length*mult*delta; // where to end the scroll
 			var change = end - start; // base change in one step
 			var step = 0; // current step
 			interval = setInterval(function() {
 				var pos = Math.easeOut(step++,start,change,steps);
 				// window.scrollTo(0,pos);
 				tgt.scrollTop = pos;
 				if(step>=steps) { // scroll finished without speed up - stop by easing out
 					mult = 0;
 					clearInterval(interval);
 				}
 			},10);
 		}
 	}
 	
 	if (st) {
 		document.addEventListener('wheel', MouseWheelHandler);
 	} else {
 		document.removeEventListener('wheel', MouseWheelHandler);
 	}
 } */

  (function initFun() {
    if (window.innerWidth > 1000) {
      mainElem.style.backgroundSize = window.innerWidth + 'px auto';

      window.addEventListener('scroll', scrollBg);

      setPosImgBlock('abs', 'left');
    } else {
      window.removeEventListener('scroll', scrollBg);
    }

    /* if ('onwheel' in document && window.innerWidth > 1000) {
  	smoothScroll(true);
  } else {
  	smoothScroll(false);
  } */

    window.addEventListener('winResized', initFun);
  })();

  //popup init
  Popup.init('.js-open-popup');

  //bubble
  Bubble.init({
    element: '.js-bubble'
  });

  //anchor
  Anchor.init('.js-anchor', 700, 100);

  Toggle.init('.js-toggle');

  //submit form
  Form.init('.form');

  Form.onSubmit = function () {
    return false;
  };

  var srcData = [];

  for (var i = 0; i < findTextElements.length; i++) {
    var id,
      elem = findTextElements[i],
      name;

    if (elem.id == '') {
      id = 'src-elem-' + i;
      elem.id = id;
    } else {
      id = elem.id;
    }

    name = elem.innerHTML.replace(/\<button.*?\>.*?\<\/button\>/g, '');
    name = name.replace(/\<.*?\>/g, '');
    name = name.replace(/\s+|&nbsp;/g, ' ');

    srcData.push({ val: id, name });
  }

  AutoComplete.valuesData = srcData;
});


// Pre-init to prevent empty objects
APP = window.APP || {};

// shorthand operators
var _window = $(window);
var _document = $(document);
var easingSwing = [0.02, 0.01, 0.47, 1];

// force scroll to top on initial load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

$(function () {
  APP.PreloadImages.init();
  APP.Animation.init({
    element: '[js-animation]'
  });
});

(function ($, APP) {
  APP.PreloadImages = {
    data: {
      images: []
    },

    init: function () {
      var allImages = [];
      for (var i = 0; i < 400; i++) {
        allImages.push(imagePath(i + 1))
      }
      this.preload(allImages);
    },

    preload: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        this.data.images[i] = new Image();
        this.data.images[i].src = arr[i];
      }
    }
  }
})(jQuery, window.APP);


(function ($, APP) {
  APP.Animation = {

    data: {
      container: undefined,
      background: undefined,
      frames: {
        total: 400,
        current: 0
      },
      page: {
        height: 0,
        totalScrollHeight: 0
      }
    },

    init: function (params) {
      this.getParams(params.element);
      this.runListeners();
    },

    destroy: function () {
      console.log('should be destroyed ?');
    },

    runListeners: function () {
      _window.on('scroll', this.animate.bind(this));
      _window.on('resize', debounce(this.getParams.bind(this), 100));
    },

    getParams: function (el) {
      // set containers
      this.data.container = $(el);
      this.data.background = $(el).find('[js-set-background]');

      // get window params
      this.data.page.height = _window.height();
      this.data.page.totalScrollHeight = _document.height() - _window.height();

      return this.data
    },

    animate: function () {
      if (this.data.background === undefined) {
        return false
      }

      var _this = this; // just an {} ref
      var wScroll = _window.scrollTop();

      // normalize scroll position to frames
      var normalized = Math.floor(normalize(wScroll, _this.data.page.totalScrollHeight, 0, 0, _this.data.frames.total));
      var reverseNormalized = _this.data.frames.total - normalized;
      this.data.frames.current = reverseNormalized;

      console.log(normalized);

      // update image
      var imgPath = imagePath(reverseNormalized);
      this.data.background.css({
        'background-image': 'url("' + imgPath + '")',
      });
    }
  };
})(jQuery, window.APP);


//////////////////////////////////
// HELPERS and PROTOTYPE FUNCTIONS
//////////////////////////////////

// LINEAR NORMALIZATION
function normalize(value, fromMin, fromMax, toMin, toMax) {
  var pct = (value - fromMin) / (fromMax - fromMin);
  var normalized = pct * (toMax - toMin) + toMin;

  //Cap output to min/max
  if (normalized > toMax) return toMax;
  if (normalized < toMin) return toMin;
  return normalized;
}

// BUILD IMAGE PATH
// 1_0${id} or 1_0{di}_optimized
function imagePath(num) {
  var postfix = num >= 259 ? "_optimized" : ""
  return 'images/animation/1_' + (num).pad(4) + postfix + '.png'
}

// Add padding to numbers (a.k.a format by mask 00)
// use (9).pad(2) // output - 09
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};