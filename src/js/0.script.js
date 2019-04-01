// global variables
;var browser, ajax, animate;

(function () {
	"use strict";

	// Get useragent

	document.documentElement.setAttribute('data-useragent', navigator.userAgent.toLowerCase());

	// Browser identify
	browser = function (userAgent) {
		userAgent = userAgent.toLowerCase();

		if (/(msie|rv:11\.0)/.test(userAgent)) {
			return 'ie';
		}
	}(navigator.userAgent);

	// Add support CustomEvent constructor for IE
	try {
		new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
		window.CustomEvent = function (event, params) {
			var evt;

			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};

			evt = document.createEvent("CustomEvent");

			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

			return evt;
		};

		CustomEvent.prototype = Object.create(window.Event.prototype);
	}

	// Window Resized Event
	var winResizedEvent = new CustomEvent('winResized'),
	    rsz = true;

	window.addEventListener('resize', function () {
		if (rsz) {
			rsz = false;

			setTimeout(function () {
				window.dispatchEvent(winResizedEvent);
				rsz = true;
			}, 1021);
		}
	});

	// Closest polyfill
	if (!Element.prototype.closest) {
		(function (ElProto) {
			ElProto.matches = ElProto.matches || ElProto.mozMatchesSelector || ElProto.msMatchesSelector || ElProto.oMatchesSelector || ElProto.webkitMatchesSelector;

			ElProto.closest = ElProto.closest || function closest(selector) {
				if (!this) {
					return null;
				}

				if (this.matches(selector)) {
					return this;
				}

				if (!this.parentElement) {
					return null;
				} else {
					return this.parentElement.closest(selector);
				}
			};
		})(Element.prototype);
	}

	// Check element for hidden
	Element.prototype.elementIsHidden = function () {
		var elem = this;

		while (elem) {
			if (!elem) break;

			var compStyle = getComputedStyle(elem);

			if (compStyle.display == 'none' || compStyle.visibility == 'hidden' || compStyle.opacity == '0') {
				return true;
			}

			elem = elem.parentElement;
		}

		return false;
	};

	// Ajax
	ajax = function ajax(options) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', options.url);

		if (typeof options.send == 'string') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				options.success(xhr.response);
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error(xhr.response);
			}
		};

		xhr.send(options.send);
	};

	/*
 Animation
 animate(function(takes 0...1) {}, Int duration in ms[, Str easing[, Fun animation complete]]);
 */
	animate = function animate(draw, duration, ease, complete) {
		var start = performance.now();

		requestAnimationFrame(function anim(time) {
			var timeFraction = (time - start) / duration;

			if (timeFraction > 1) {
				timeFraction = 1;
			}

			var progress = ease ? easing(timeFraction, ease) : timeFraction;

			draw(progress);

			if (timeFraction < 1) {
				requestAnimationFrame(anim);
			} else {
				if (complete != undefined) {
					complete();
				}
			}
		});
	};

	function easing(timeFraction, ease) {
		switch (ease) {
			case 'easeInQuad':
				return quad(timeFraction);

			case 'easeOutQuad':
				return 1 - quad(1 - timeFraction);

			case 'easeInOutQuad':
				if (timeFraction <= 0.5) {
					return quad(2 * timeFraction) / 2;
				} else {
					return (2 - quad(2 * (1 - timeFraction))) / 2;
				}
		}
	}

	function quad(timeFraction) {
		return Math.pow(timeFraction, 2);
	}
})();
;var MobNav;

(function () {
	"use strict";

	//fix header

	var headerElem = document.querySelector('.header');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 21) {
			headerElem.classList.add('header_fixed');
		} else if (!document.body.classList.contains('popup-is-opened') && !document.body.classList.contains('mob-nav-is-opened')) {
			headerElem.classList.remove('header_fixed');
		}
	});
})();
/*
Toggle.init(Str toggleSelector[, Str toggledClass (default - 'toggled')]);

Toggle.onChange = function(toggleElem, state) {
	// code...
}
*/

;var Toggle;

(function () {
	"use strict";

	Toggle = {
		toggledClass: 'toggled',
		onChange: null,

		target: function target(toggleElem, state) {
			var targetElements = document.querySelectorAll(toggleElem.getAttribute('data-target-elements'));

			if (!targetElements.length) {
				return;
			}

			if (state) {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.add(this.toggledClass);
				}

				//dependence elements
				if (toggleElem.hasAttribute('data-dependence-target-elements')) {
					var dependenceTargetElements = document.querySelectorAll(toggleElem.getAttribute('data-dependence-target-elements'));

					for (var i = 0; i < dependenceTargetElements.length; i++) {
						dependenceTargetElements[i].classList.remove(this.toggledClass);
					}
				}
			} else {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.remove(this.toggledClass);
				}
			}
		},

		toggle: function toggle(toggleElem) {
			var state;

			if (toggleElem.classList.contains(this.toggledClass)) {
				toggleElem.classList.remove(this.toggledClass);

				state = false;

				if (toggleElem.hasAttribute('data-first-text')) {
					toggleElem.innerHTML = toggleElem.getAttribute('data-first-text');
				}
			} else {
				toggleElem.classList.add(this.toggledClass);

				state = true;

				if (toggleElem.hasAttribute('data-second-text')) {
					toggleElem.setAttribute('data-first-text', toggleElem.innerHTML);

					toggleElem.innerHTML = toggleElem.getAttribute('data-second-text');
				}
			}

			//target
			if (toggleElem.hasAttribute('data-target-elements')) {
				this.target(toggleElem, state);
			}

			//call onChange
			if (this.onChange) {
				this.onChange(toggleElem, state);
			}
		},

		init: function init(toggleSelector, toggledClass) {
			var _this = this;

			if (toggledClass) {
				this.toggledClass = toggledClass;
			}

			document.addEventListener('click', function (e) {
				var toggleElem = e.target.closest(toggleSelector);

				if (toggleElem) {
					e.preventDefault();

					_this.toggle(toggleElem);
				} else if (!e.target.closest('#search-input')) {
					document.querySelector('.js-toggle').classList.remove('toggled');
					document.querySelector('#search-input').classList.remove('toggled');
				}
			});
		}
	};
})();
var Popup, MediaPopup;

(function () {
	"use strict";

	//popup core

	Popup = {
		winScrollTop: 0,
		onClose: null,
		headerSelector: '.header',
		footerSelector: '.footer',

		fixBody: function fixBody(st) {
			var headerElem = document.querySelector(this.headerSelector),
			    footerElem = document.querySelector(this.footerSelector);

			if (st && !document.body.classList.contains('popup-is-opened')) {
				this.winScrollTop = window.pageYOffset;

				var offset = window.innerWidth - document.documentElement.clientWidth;

				document.body.classList.add('popup-is-opened');

				if (headerElem) {
					headerElem.style.right = offset + 'px';
				}

				if (footerElem) {
					footerElem.style.right = offset + 'px';
				}

				document.body.style.right = offset + 'px';

				document.body.style.top = -this.winScrollTop + 'px';
			} else if (!st) {
				if (headerElem) {
					headerElem.style.right = '';
				}

				if (footerElem) {
					footerElem.style.right = '';
				}

				document.body.classList.remove('popup-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function open(elementStr, callback) {
			var elem = document.querySelector(elementStr);

			if (!elem || !elem.classList.contains('popup__window')) {
				return;
			}

			this.close();

			var elemParent = elem.parentElement;

			elemParent.classList.add('popup_visible');

			elem.classList.add('popup__window_visible');

			if (callback) {
				this.onClose = callback;
			}

			this.fixBody(true);

			Bubble.hide();

			return elem;
		},

		message: function message(elementStr, msg, callback) {
			var elem = this.open(elementStr, callback);

			elem.querySelector('.popup__inner').innerHTML = '<div class="popup__message">' + msg + '</div>';
		},

		close: function close() {
			var elements = document.querySelectorAll('.popup__window');

			if (!elements.length) {
				return;
			}

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (!elem.classList.contains('popup__window_visible')) {
					continue;
				}

				elem.classList.remove('popup__window_visible');
				elem.parentElement.classList.remove('popup_visible');
			}

			if (this.onClose) {
				this.onClose();
				this.onClose = null;
			}
		},

		init: function init(elementStr) {
			var _this = this;

			document.addEventListener('click', function (e) {
				var element = e.target.closest(elementStr),
				    closeElem = e.target.closest('.js-popup-close');

				if (element) {
					e.preventDefault();

					_this.open(element.getAttribute('data-popup'));
				} else if (closeElem || !e.target.closest('.popup__window') && e.target.closest('.popup')) {
					_this.fixBody(false);

					_this.close();
				}
			});

			if (window.location.hash) {
				this.open(window.location.hash);
			}
		}
	};
})();
;var AutoComplete;

(function () {
	"use strict";

	AutoComplete = {
		field: null,
		input: null,
		valuesData: null,
		inputValue: '',

		open: function open() {
			this.field.classList.add('autocomplete_opened');

			var opionsElem = this.field.querySelector('.autocomplete__options');

			opionsElem.style.height = opionsElem.scrollHeight + 'px';

			opionsElem.scrollTop = 0;

			setTimeout(function () {
				if (opionsElem.scrollHeight > opionsElem.offsetHeight) {
					opionsElem.classList.add('ovfauto');
				}
			}, 550);
		},

		close: function close() {
			this.field.classList.remove('autocomplete_opened');

			var opionsElem = this.field.querySelector('.autocomplete__options');

			opionsElem.classList.remove('ovfauto');

			opionsElem.style.height = 0;
		},

		getValues: function getValues() {
			var optionsElem = this.field.querySelector('.autocomplete__options');

			if (this.input.value.length) {
				var reg = new RegExp(this.input.value, 'i'),
				    data = this.valuesData,
				    values = '';

				this.inputValue = this.input.value;

				for (var i = 0; i < data.length; i++) {
					var dataVal = data[i];

					if (dataVal.name.match(reg)) {
						var rg = new RegExp('[a-zа-я0-9ё]*' + this.input.value + '[a-zа-я0-9ё]*\\s?[a-zа-я0-9ё]*', 'i'),
						    result = dataVal.name.match(rg);

						values += '<li><button type="button" class="autocomplete__val" data-val="' + dataVal.val + '">' + result[0] + '</button></li>';
					}
				}

				optionsElem.innerHTML = values;

				if (values != '') {
					this.open();
				} else {
					this.close();
				}

				values = '';
			} else {
				optionsElem.innerHTML = '';

				this.close();
			}
		},

		selectVal: function selectVal(itemElem) {
			var valueElem = itemElem.querySelector('.autocomplete__val');

			this.input.value = valueElem.innerHTML;
		},

		move: function move(itemElem) {
			var valueElem = itemElem.querySelector('.autocomplete__val');

			Anchor.scroll(valueElem.getAttribute('data-val'));
		},

		keybinding: function keybinding(e) {
			var key = e.which || e.keyCode || 0;

			if (key != 40 && key != 38 && key != 13) return;

			e.preventDefault();

			var optionsElem = this.field.querySelector('.autocomplete__options'),
			    hoverItem = optionsElem.querySelector('li.hover');

			switch (key) {
				case 40:
					if (hoverItem) {
						var nextItem = hoverItem.nextElementSibling;

						if (nextItem) {
							hoverItem.classList.remove('hover');
							nextItem.classList.add('hover');

							optionsElem.scrollTop = optionsElem.scrollTop + (nextItem.getBoundingClientRect().top - optionsElem.getBoundingClientRect().top);

							this.selectVal(nextItem);
						}
					} else {
						var nextItem = optionsElem.firstElementChild;

						if (nextItem) {
							nextItem.classList.add('hover');

							this.selectVal(nextItem);
						}
					}
					break;

				case 38:
					if (hoverItem) {
						var nextItem = hoverItem.previousElementSibling;

						if (nextItem) {
							hoverItem.classList.remove('hover');
							nextItem.classList.add('hover');

							optionsElem.scrollTop = optionsElem.scrollTop + (nextItem.getBoundingClientRect().top - optionsElem.getBoundingClientRect().top);

							this.selectVal(nextItem);
						}
					} else {
						var nextItem = optionsElem.lastElementChild;

						if (nextItem) {
							nextItem.classList.add('hover');

							optionsElem.scrollTop = 9999;

							this.selectVal(nextItem);
						}
					}
					break;

				case 13:
					if (hoverItem) {
						this.selectVal(hoverItem);
						this.move(hoverItem);
						this.input.blur();
					}
			}
		},

		init: function init() {
			var _this = this;

			// focus event
			document.addEventListener('focus', function (e) {
				var elem = e.target.closest('.autocomplete__input');

				if (!elem) return;

				_this.field = elem.closest('.autocomplete');
				_this.input = elem;

				if (_this.field.querySelector('.autocomplete__val')) {
					_this.open();
				}
			}, true);

			// blur event
			document.addEventListener('blur', function (e) {
				if (e.target.closest('.autocomplete__input')) {
					_this.close();
				}
			}, true);

			// input event
			document.addEventListener('input', function (e) {
				if (e.target.closest('.autocomplete__input')) {
					_this.getValues();
				}
			});

			// select
			document.addEventListener('click', function (e) {
				var elem = e.target.closest('.autocomplete__val');

				if (elem) {
					_this.selectVal(elem.parentElement);

					_this.move(elem.parentElement);
				}
			});

			// keyboard events
			document.addEventListener('keydown', function (e) {
				if (e.target.closest('.autocomplete_opened')) {
					_this.keybinding(e);
				}
			});
		}
	};

	// init scripts
	document.addEventListener('DOMContentLoaded', function () {
		AutoComplete.init();
	});
})();
var ValidateForm, Form;

(function () {
	"use strict";

	// validate form

	ValidateForm = {
		input: null,

		errorTip: function errorTip(err, errInd, errorTxt) {
			var field = this.input.closest('.form__field') || this.input.parentElement,
			    errTip = field.querySelector('.field-error-tip');

			if (err) {
				field.classList.remove('field-success');
				field.classList.add('field-error');

				if (!errTip) {
					return;
				}

				if (errInd) {
					if (!errTip.hasAttribute('data-error-text')) {
						errTip.setAttribute('data-error-text', errTip.innerHTML);
					}
					errTip.innerHTML = errInd != 'custom' ? errTip.getAttribute('data-error-text-' + errInd) : errorTxt;
				} else if (errTip.hasAttribute('data-error-text')) {
					errTip.innerHTML = errTip.getAttribute('data-error-text');
				}
			} else {
				field.classList.remove('field-error');
				field.classList.add('field-success');
			}
		},

		customErrorTip: function customErrorTip(input, errorTxt) {
			if (!input) {
				return;
			}

			this.input = input;

			this.errorTip(true, 'custom', errorTxt);
		},

		validateOnInput: function validateOnInput(elem) {
			this.input = elem;

			var dataType = elem.getAttribute('data-type');

			if (elem.getAttribute('data-required') && !elem.value.length) {
				this.errorTip(true);
			} else if (elem.value.length) {
				if (dataType) {
					this[dataType]();
				} else {
					this.errorTip(false);
				}
			} else {
				this.errorTip(false);
			}
		},

		validate: function validate(formElem) {
			var err = 0;

			// text, password, textarea
			var elements = formElem.querySelectorAll('input[type="text"], input[type="password"], textarea');

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (elem.elementIsHidden()) {
					continue;
				}

				this.input = elem;

				elem.setAttribute('data-tested', 'true');

				var dataType = elem.getAttribute('data-type');

				if (elem.getAttribute('data-required') && !elem.value.length) {
					this.errorTip(true);
					err++;
				} else if (elem.value.length) {
					if (dataType) {
						if (this[dataType]()) {
							err++;
						}
					} else {
						this.errorTip(false);
					}
				} else {
					this.errorTip(false);
				}
			}

			return err ? false : true;
		},

		init: function init(formSelector) {
			var _this = this;

			document.addEventListener('input', function (e) {
				var elem = e.target.closest(formSelector + ' input[type="text"],' + formSelector + ' input[type="password"],' + formSelector + ' textarea');

				if (elem && elem.hasAttribute('data-tested')) {
					_this.validateOnInput(elem);
				}
			});
		}
	};

	// form
	Form = {
		onSubmit: null,

		submit: function submit(e, formElem) {
			formElem.classList.add('form_sending');

			if (!this.onSubmit) {
				return;
			}

			// clear form
			function clear() {
				var elements = formElem.querySelectorAll('input[type="text"], input[type="password"], textarea');

				for (var i = 0; i < elements.length; i++) {
					var elem = elements[i];

					elem.value = '';

					if (window.Placeholder) {
						Placeholder.hide(elem, false);
					}
				}

				if (window.Select) {
					Select.reset();
				}

				var textareaMirrors = formElem.querySelectorAll('.form__textarea-mirror');

				for (var i = 0; i < textareaMirrors.length; i++) {
					textareaMirrors[i].innerHTML = '';
				}
			}

			// submit button
			function actSubmitBtn(st) {
				var elements = formElem.querySelectorAll('button[type="submit"], input[type="submit"]');

				for (var i = 0; i < elements.length; i++) {
					var elem = elements[i];

					if (!elem.elementIsHidden()) {
						if (st) {
							elem.removeAttribute('disabled');
						} else {
							elem.setAttribute('disabled', 'disable');
						}
					}
				}
			}

			// call onSubmit
			var ret = this.onSubmit(formElem, function (obj) {
				obj = obj || {};

				actSubmitBtn(obj.unlockSubmitButton);

				formElem.classList.remove('form_sending');

				if (obj.clearForm == true) {
					clear();
				}
			});

			if (ret === false) {
				e.preventDefault();

				actSubmitBtn(false);
			}
		},

		init: function init(formSelector) {
			var _this2 = this;

			if (!document.querySelector(formSelector)) return;

			ValidateForm.init(formSelector);

			document.addEventListener('submit', function (e) {
				var formElem = e.target.closest(formSelector);

				if (!formElem) {
					return;
				}

				if (ValidateForm.validate(formElem)) {
					_this2.submit(e, formElem);
				} else {
					e.preventDefault();
				}
			});
		}
	};
})();
/*
Bubble.init({
	element: '.js-bubble'
});
*/

;var Bubble;

(function () {
	"use strict";

	Bubble = {
		bubbleDiv: null,
		bubbleClass: null,
		winScrollTop: 0,

		fixBody: function fixBody(st) {
			if (st) {
				this.winScrollTop = window.pageYOffset;

				document.body.classList.add('popup-is-opened');
				document.body.style.top = -this.winScrollTop + 'px';
			} else {
				document.body.classList.remove('popup-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		show: function show(elem) {
			this.bubbleDiv.querySelector('.bubble__inner div').innerHTML = elem.getAttribute('data-bubble');

			this.bubbleClass = elem.getAttribute('data-bubble-class');

			if (this.bubbleClass) {
				this.bubbleDiv.classList.add(this.bubbleClass);
			}

			var bubleStyle = this.bubbleDiv.style,
			    bubbleMinWidth = 100,
			    bubblePotentWidth = window.innerWidth - (elem.getBoundingClientRect().left + elem.offsetWidth) - 10,
			    coordX = elem.getBoundingClientRect().left + elem.offsetWidth;

			if (bubblePotentWidth < bubbleMinWidth) {
				bubblePotentWidth = bubbleMinWidth;

				coordX = window.innerWidth - bubbleMinWidth - 10;
			}

			bubleStyle.width = bubblePotentWidth + 'px';
			bubleStyle.left = coordX + 'px';

			var coordY = elem.getBoundingClientRect().top + pageYOffset - this.bubbleDiv.offsetHeight;

			bubleStyle.top = coordY + 'px';

			this.bubbleDiv.classList.add('bubble_visible');

			if (window.innerWidth < 1000) {
				this.fixBody(true);
			}
		},

		hide: function hide() {
			this.bubbleDiv.classList.remove('bubble_visible');
			this.bubbleDiv.removeAttribute('style');
			this.bubbleDiv.querySelector('.bubble__inner div').innerHTML = '';

			if (this.bubbleClass) {
				this.bubbleDiv.classList.remove(this.bubbleClass);

				this.bubbleClass = null;
			}
		},

		init: function init(opt) {
			var _this = this;

			document.addEventListener('click', function (e) {
				var elem = e.target.closest(opt.element),
				    closeBtnElem = e.target.closest('.bubble-close-btn');

				if (elem) {
					_this.hide();

					_this.show(elem);
				} else if (closeBtnElem || !e.target.closest('.bubble__inner') && e.target.closest('.bubble')) {
					_this.hide();

					if (window.innerWidth < 1000) {
						_this.fixBody(false);
					}
				}
			});

			//add bubble to DOM
			this.bubbleDiv = document.createElement('div');
			this.bubbleDiv.className = 'bubble';
			this.bubbleDiv.innerHTML = '<div class="bubble__inner"><div></div><button class="bubble-close-btn"></button></div>';

			document.body.appendChild(this.bubbleDiv);
		}
	};
})();
/*
Anchor.init(Str anchor selector[, Int duration ms[, Int shift px]]);
*/

var Anchor;

(function () {
	"use strict";

	Anchor = {
		duration: 1000,
		shift: 0,

		scroll: function scroll(anchorId, e) {
			var anchorSectionElem = document.getElementById(anchorId);

			if (!anchorSectionElem) {
				return;
			}

			if (e) {
				e.preventDefault();
			}

			var scrollTo = anchorSectionElem.getBoundingClientRect().top + window.pageYOffset,
			    scrollTo = scrollTo - this.shift;

			animate(function (progress) {
				window.scrollTo(0, scrollTo * progress + (1 - progress) * window.pageYOffset);
			}, this.duration, 'easeInOutQuad');
		},

		init: function init(elementStr, duration, shift) {
			var _this = this;

			if (duration) {
				this.duration = duration;
			}

			if (shift) {
				this.shift = shift;
			}

			//click anchor
			document.addEventListener('click', function (e) {
				var elem = e.target.closest(elementStr);

				if (elem) {
					_this.scroll(elem.getAttribute('href').split('#')[1], e);
				}
			});

			//hash anchor
			if (window.location.hash) {
				window.addEventListener('load', function () {
					_this.scroll(window.location.hash.split('#')[1]);
				});
			}
		}
	};
})();
//# sourceMappingURL=script.js.map
