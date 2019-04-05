"use strict";

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
        elem.parentElement.style.height = elem.parentElement.offsetHeight + 'px';
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
      mainElem.style.backgroundPosition = '0 -' + window.pageYOffset / 2 + 'px'; // images
      // console.log(fstScreenElem.getBoundingClientRect().bottom, (window.innerHeight / 3) * 2);

      if (fstScreenElem.getBoundingClientRect().bottom + 50 <= window.innerHeight / 2 + 50) {
        setPosImgBlock('fix');
      } else {
        setPosImgBlock('abs');
      } // img 2


      if (img2PointElem.getBoundingClientRect().top <= window.innerHeight / 2 + 50) {
        img2Elem.classList.add('free');
        img2Elem.classList.add('free-2');
      } else if (img2PointElem.getBoundingClientRect().top <= window.innerHeight / 2 + 50 + 110) {
        img2Elem.classList.add('free');
        img2Elem.classList.remove('free-2');
      } else if (img2PointElem.getBoundingClientRect().top >= window.innerHeight / 2 + 50 + 110) {
        img2Elem.classList.remove('free');
        img2Elem.classList.remove('free-2');
      } //img 4


      if (img4PointElem.getBoundingClientRect().top <= window.innerHeight / 2 + 50 + 220) {
        img4Elem.classList.add('free');
      } else {
        img4Elem.classList.remove('free');
      } //img 5


      if (img5PointElem.getBoundingClientRect().top <= window.innerHeight / 2 + 50) {
        img5Elem.classList.add('free');
      } else {
        img5Elem.classList.remove('free');
      } // blocks


      for (var i = 0; i < blockElements.length; i++) {
        var blockElem = blockElements[i];

        if (blockElem.getBoundingClientRect().top <= window.innerHeight / 2 + 50 || blockElem.classList.contains('block_last') && blockElem.getBoundingClientRect().top <= window.innerHeight - 100) {
          blockElem.classList.add('vis');
        } else {
          blockElem.classList.remove('vis');
        }
      } // img sirop


      var img3Offset = img3Elem.getBoundingClientRect();

      if (img3OffsetBottom >= img3PointBotElem.getBoundingClientRect().top) {
        img3Elem.style.top = img3PointBotElem.getBoundingClientRect().top + window.pageYOffset - img3Elem.offsetHeight + 'px';
        img3Elem.style.left = img3Offset.left + 'px';
        img3Elem.classList.add('abs');
        img3Elem.classList.remove('fix');
        img3Elem.parentElement.style.height = img3Elem.offsetHeight + 20 + 'px';
      } else if (window.innerHeight / 2 - 190 >= img3PointElem.getBoundingClientRect().top) {
        img3Elem.style.top = window.innerHeight / 2 - 190 + 'px';
        img3Elem.style.left = img3Offset.left + 'px';
        img3Elem.classList.add('fix');
        img3Elem.classList.remove('abs');
        img3Elem.parentElement.style.height = img3Elem.offsetHeight + 20 + 'px';
        img3OffsetBottom = window.innerHeight / 2 - 190 + img3Elem.offsetHeight;
      } else if (window.innerHeight / 2 - 190 < img3PointElem.getBoundingClientRect().top) {
        img3Elem.style.top = '';
        img3Elem.style.left = '';
        img3Elem.classList.remove('fix');
        img3Elem.classList.remove('abs');
        img3OffsetBottom = 0;
      } // arrows


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



  (function initFun() {
    if (window.innerWidth > 1000) {
      mainElem.style.backgroundSize = window.innerWidth + 'px auto';
      window.addEventListener('scroll', scrollBg);
      setPosImgBlock('abs', 'left');
    } else {
      window.removeEventListener('scroll', scrollBg);
    }

    window.addEventListener('winResized', initFun);
  })(); //popup init


  Popup.init('.js-open-popup'); //bubble

  Bubble.init({
    element: '.js-bubble'
  }); //anchor

  Anchor.init('.js-anchor', 700, 100);
  Toggle.init('.js-toggle'); //submit form

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
    srcData.push({
      val: id,
      name: name
    });
  }

  AutoComplete.valuesData = srcData;
});

// Pre-init to prevent empty objects
var APP = window.APP || {};

// shorthand operators
var _window = $(window);
var _document = $(document);
var easingSwing = [0.02, 0.01, 0.47, 1];

// force scroll to top on initial load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

$(function () {
  // APP.PreloadImages.init();  // moved to blocking flow (EoF)
  APP.Animation.init({
    element: '[js-animation]'
  });
});

(function ($, APP) {
  APP.PreloadImages = {
    data: {
      imageUrls: [], // array of all urls
      imageUrlsById: [], // array of all url id's
      imageCache: [], // preloaded images
      preloadedFramesIds: [], // preloaded id's
      imageSprite: {
        cached: new Image(),
        isLoaded: false
      },
    },

    init: function () {
      this.generateUrls();

      this.buildFrames();
      // this.preloadAll();
      this.runListeners();
      this.preloadSprite();
    },

    generateUrls: function () {
      for (var i = 0; i < 401; i++) {
        this.data.imageUrlsById.push(i);
        this.data.imageUrls.push(imagePath(i));
      }
    },

    buildFrames: function (arr) {
      var arr = this.data.imageUrls;
      var ids = this.data.imageUrlsById;

      // get only required based on framerate
      var requiredFrames = [];
      var sections = APP.Animation.data.sections;
      for (var i = 0; i < sections.length - 1; i++) {
        // minus 1 because section id 4 doest contain any frames
        var section = sections[i];
        var frames = Math.abs(section.frames[0] - section.frames[1]);
        for (var f = 0; f <= frames; f++) {
          // inside sections frames - skip by framerate
          if (f % section.framerate === 0) {
            requiredFrames.push(section.frames[0] + f)
          }
        }
      }

      // covert general array to array of target preloaded frames
      var preloadedFrames = [];
      for (var i = 0; i < requiredFrames.length; i++) {
        var reqFrame = requiredFrames[i]; // get val
        if (ids.indexOf(reqFrame) !== -1) {
          preloadedFrames.push(reqFrame)
        }
      }

      this.data.preloadedFramesIds = preloadedFrames;
    },

    runListeners: function () {
      // _window.on('resize', debounce(this.preloadAll.bind(this), 100));
      _window.on('resize', debounce(this.preloadSprite.bind(this), 100));
    },

    preloadAll() {
      var wWidth = window.innerWidth

      if (wWidth > 1000) {
        for (var i = 0; i < this.data.preloadedFramesIds.length; i++) {
          this.data.imageCache[i] = new Image();
          // last loaded
          if (i === this.data.preloadedFramesIds.length - 1) {
            this.data.imageCache[i].onload = function () {
              $('.preloader').addClass('is-loaded');
              $('body').removeClass('body-locked');
            };
          }
          this.data.imageCache[i].src = arr[this.data.preloadedFramesIds[i]];
        }
      } else {
        $('.preloader').addClass('is-loaded');
        $('body').removeClass('body-locked');
      }
    },

    preloadSprite: function () {
      var _this = this;
      var wWidth = window.innerWidth

      if (wWidth > 1000) {
        this.data.imageSprite.cached.onload = function () {
          _this.data.imageSprite.isLoaded = true;
          $('.preloader').addClass('is-loaded');
          $('body').removeClass('body-locked');
          APP.Animation.data.background.addClass('should-use-sprite');
        };
        this.data.imageSprite.cached.src = 'images/sprite.png';
      }
    },
  }
})(jQuery, window.APP);


(function ($, APP) {
  APP.Animation = {

    data: {
      container: undefined,
      background: undefined,
      frames: {
        total: 400,
        current: 0,
        lockedFrame: 0,
      },
      sections: [
        {
          // pack
          id: 1,
          framerate: 5,
          frames: [0, 220],
          startPoint: null,
          endPoint: null,
        },
        {
          // bottle
          id: 2,
          framerate: 1,
          frames: [221, 240],
          startPoint: null,
          endPoint: null
        },
        {
          // liquid
          id: 3,
          framerate: 2,
          frames: [241, 401],
          startPoint: null,
          endPoint: null
        },
        {
          id: 4,
          framerate: null,
          frames: null,
          startPoint: null,
          endPoint: null
        }
      ],
      reverseSections: [],
      page: {
        height: 0,
        totalScrollHeight: 0
      }
    },

    init: function (params) {
      this.params = params;
      this.getParams();
      this.runListeners();

      // dirty fix loading dom content and .height() calcs
      setTimeout(this.getParams.bind(this), 1500)
      setTimeout(this.getParams.bind(this), 3500)
    },

    destroy: function () {
      console.log('should be destroyed ?');
    },

    runListeners: function () {
      _window.on('scroll', this.animate.bind(this));
      _window.on('resize', debounce(this.getParams.bind(this), 100));
    },

    getParams: function () {
      var _this = this;
      // set containers
      this.data.container = $(this.params.element);
      this.data.background = $(this.params.element).find('[js-set-background]');

      // get window params
      this.data.page.height = _window.height();
      this.data.page.totalScrollHeight = _document.height() - _window.height();

      // get sections params
      var $sections = $('[js-section]');
      $sections.each(function (i, sec) {
        var $sec = $(sec);
        var dataSec = _this.data.sections[$sec.data('id') - 1];
        var startOffset = i > 0 ? _this.data.page.height : 0;
        var endOffset = i > 0 ? 0 : _this.data.page.height;
        var lastOffset = i === 2 ? 250 : 0;
        var startPoint = $sec.offset().top - startOffset;
        dataSec.startPoint = startPoint;
        dataSec.endPoint = Math.floor(startPoint + $sec.outerHeight() - endOffset - lastOffset + 55);
      });

      this.data.reverseSections = $.extend([], _this.data.sections).reverse()

      // set Scale Ratio based on updated params
      this.setBackgroundScale();
    },

    animate: function () {
      if (this.data.background === undefined) {
        return false
      }

      var wWidth = window.innerWidth

      if (wWidth <= 1000) {
        return false
      }

      var _this = this; // just an {} ref
      var wScroll = _window.scrollTop();

      // define end of animation and stick animation frames
      if (wScroll > _this.data.sections[2].endPoint) {
        if (!_this.data.scrolledPastEnd) {
          _this.data.scrolledPastEnd = true;
          _this.data.container.addClass('is-stopped');
          _this.data.container.css({
            'top': wScroll + 55
          })
        }
      } else {
        _this.data.scrolledPastEnd = false;
        _this.data.container.removeClass('is-stopped');
        _this.data.container.attr('style', '');
      }

      // reverse checking to find current section based on scroll
      var curSection;
      $.each(_this.data.reverseSections, function (i, sec) {
        if (wScroll < sec.endPoint) {
          curSection = sec;
          return;
        }
      })

      var normalized
      if (!curSection) {
        this.setFrame(this.data.frames.total);
      } else if (curSection.id < 4) {
        // normalize scroll position to section frames
        normalized = Math.floor(normalize(
          wScroll - curSection.startPoint,
          0,
          curSection.endPoint - curSection.startPoint,
          curSection.frames[0],
          curSection.frames[1]
        ));
        this.setFrame(normalized, curSection)
        // var reverseNormalized = _this.data.frames.total - normalized;

        // var normalized = Math.floor(normalize(wScroll, _this.data.page.totalScrollHeight, 0, 0, _this.data.frames.total));
        // var reverseNormalized = _this.data.frames.total - normalized;
      } else {
        this.setFrame(this.data.frames.total);
      }

    },
    setFrame: function (num, curSection) {
      // find in array of preloaded images
      var _this = this;
      num = closestInArray(APP.PreloadImages.data.preloadedFramesIds, num);
      this.data.frames.current = num;
      // scip frames based on cached last
      var framesDiff = Math.abs(num - this.data.frames.lockedFrame);
      var frameRate = curSection ? curSection.framerate : 0;

      // TODO - find closest
      if (framesDiff >= frameRate) {
        this.data.frames.lockedFrame = num;

        var useSprite = true; // toggler (for debug)

        // route sprite loader or direct png
        if (useSprite && APP.PreloadImages.data.imageSprite.isLoaded) {
          var spriteData = dataPath(num);
          this.data.background.attr('data-bg', spriteData);
          this.data.background.removeStyle('background-image'); // clear background image
        } else {
          // update image
          var imgPath = imagePath(num);
          this.data.background.css({
            'background-image': 'url("' + imgPath + '")',
          });
        }
      }
    },
    setBackgroundScale: function () {
      var $backgroundEl = APP.Animation.data.background
      var pheight = _window.height() - 75 - 55;
      var iheight = 960;
      var scaleV = pheight / iheight;

      $backgroundEl.css({
        'transform': 'scale(' + scaleV + ')'
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
};

function dataPath(num) {
  var postfix = num >= 259 ? "_optimized" : ""
  return '1_' + (num).pad(4) + postfix
};

// Add padding to numbers (a.k.a format by mask 00)
// use (9).pad(2) // output - 09
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};

// find closest value in array
function closestInArray(array, num) {
  var i = 0;
  var minDiff = 1000;
  var ans;
  for (i in array) {
    var m = Math.abs(num - array[i]);
    if (m < minDiff) {
      minDiff = m;
      ans = array[i];
    }
  }
  return ans;
}

// remove single attr from inline styles
(function ($) {
  $.fn.removeStyle = function (style) {
    var search = new RegExp(style + '[^;]+;?', 'g');

    return this.each(function () {
      $(this).attr('style', function (i, style) {
        return style && style.replace(search, '');
      });
    });
  };
}(jQuery));


APP.PreloadImages.init();