;( function( $, window, document, undefined ) {

	"use strict";
		// Create the defaults once
		var pluginName = "highscrollJS", 
			defaults = {
				elementID: "return-to-top",
				scrollLimit: 50,
				fontToUse: '"Times New Roman",Georgia,serif',
				css:{
					"rootElement":{
						"z-index":"99999",
						"position":"fixed",
					    "bottom":"1em",
					    "right":"1em",
					    "background": "#62B5E5",
					    "width": "50px",
					    "height": "50px",
					    "display": "block",
					    "text-decoration": "none",
					    "-webkit-border-radius": "35px",
					    "-moz-border-radius": "35px",
					    "border-radius": "35px",
					    "font-weight":"bold",
					    "display": "none",
					},
					"internalSpan":{
						"color": "#fff",
					    "margin": "0",
					    "position": "relative",
					    "left": "12px",
						"top": "0px",
						"font-size": "45px",
					},
					"rootElementHover":{
						"background": "#62B5E5"
					},
					"internalSpanHover":{
						"color": "#fff"
					}
				}
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init(this.settings);
		}
		var tweakCSS = function(settings,element2mod,property,value){
			var newSettings = settings;
			if(typeof newSettings.css[element2mod] !== 'undefined'){
				newSettings.css[element2mod][property] = String(value);
			}
			console.log('old',settings);
			console.log('new',newSettings);
			return newSettings;
		};
		
		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function(settings) {
				console.log('settings',settings);
				this.addElementToDOM(settings);
				this.setupClickListener(settings);
				this.setupScrollListener(settings);
				this.applyCSS(settings);
			},
			
			addElementToDOM: function(settings){
				if(!$('#'+settings.elementID).length){
					//add element
					//<a href="javascript:" id="return-to-top"><span>&#94;</span></a>
					$(document.body).append('<a href="javascript:" id="'+settings.elementID+'"><span>&#94;</span></a>');
				}else{
					$('#'+settings.elementID).remove();
					$(document.body).append('<a href="javascript:" id="'+settings.elementID+'"><span>&#94;</span></a>');

				}
			},
			setupClickListener: function(settings){
				$('#'+settings.elementID).off('click').on('click',function(e) {      // When arrow is clicked
					e.preventDefault();
					window.scrollTo(0,0);
				});
			},
			setupScrollListener: function(settings) {
				//===== Scroll to Top ==== 
				$(window).scroll(function() {
				    if ($(this).scrollTop() >= settings.scrollLimit) {        // If page is scrolled more than 50px
				        $('#'+settings.elementID).show();    
				    } else {
				        $('#'+settings.elementID).hide();  
				    }
				});
			},
			applyCSS: function(settings){
				//tweakCSS: function(settings,element2mod,property,value){}
				var activeSettings = settings;
				console.log('initialSettings',settings);
				if(settings.TweakCSS){
					$.each(settings.TweakCSS, function(e2mod,eCSS){
						$.each(eCSS,function(eCSSprop,eCSSval){
							activeSettings = tweakCSS(activeSettings, e2mod, eCSSprop, eCSSval);
						});
					});
				}
				$("#"+settings.elementID).css(activeSettings.css.rootElement);
				$("#"+settings.elementID+":hover").css(activeSettings.css.rootElementHover);
				$("#"+settings.elementID).css("font-family",activeSettings.fontToUse);
				$("#"+settings.elementID+" span").css(activeSettings.css.internalSpan);
				$("#"+settings.elementID+":hover span").css(activeSettings.css.internalSpanHover);
				console.log('activeSettings',activeSettings,'settings',settings);
			}
		} );

		$.fn[ pluginName ] = function( options ) {
			new Plugin( this, options ) ;
		};

} )( jQuery, window, document );