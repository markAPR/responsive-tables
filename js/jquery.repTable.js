/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||function(e){var b=e.documentElement,m=b.firstElementChild||b.firstChild,d=e.createElement("body"),a=e.createElement("div");a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(a);var g=function(c){a.innerHTML='&shy;<style media="'+c+'"> #mq-test-1 { width: 42px; }</style>';b.insertBefore(d,m);bool=42===a.offsetWidth;b.removeChild(d);return{matches:bool,media:c}},j=function(){var c=b.body,h=!1;a.style.cssText="position:absolute;font-size:1em;width:1em"; c||(c=h=e.createElement("body"),c.style.background="none");c.appendChild(a);b.insertBefore(c,b.firstChild);h?b.removeChild(c):c.removeChild(a);return f=parseFloat(a.offsetWidth)},f,n=g("(min-width: 0px)").matches;return function(c){if(n)return g(c);var a=c.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),b=c.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),d=null===a,k=null===b,l=e.body.offsetWidth;a&&(a= parseFloat(a)*(-1<a.indexOf("em")?f||j():1));b&&(b=parseFloat(b)*(-1<b.indexOf("em")?f||j():1));bool=(!d||!k)&&(d||l>=a)&&(k||l<=b);return{matches:bool,media:c}}}(document);

/* jQuery Table Reflow Plugin
*Author - Mark A Price 
* http://www.markaprice.co.uk
* contact : markprice@markaprice.co.uk
* purpose  - to reflox table into linear format for responsive websites 
* Based on the table reflow idea y jquery mobile : http://jquerymobile.com/demos/1.3.0-beta.1/docs/tables/table-reflow.html
* Great Props to this fella for the tip on paginating the table
http://blog.gabrieleromanato.com/jquery-easy-table-pagination/
* Licensed Under MIT Licence - see below

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/

(function ($) {
    //
    // plugin definition
    //
    $.fn.repTable = function (options) {

        // build main options before element iteration
        var o = $.extend({}, $.fn.repTable.defaults, options);
        // iterate and reformat each matched element
        return this.each(function () {
			
			// set up some vars here for elements etc
			var headArray = [];
			var $elem = jQuery(this), bodyEls = $elem.find(o.bodyElements),
			headEls  = 	$elem.find(o.headElements), headKids	= headEls.children(),eStart = o.headingTagOpen, eEnd = o.headingTagClose;
			
			// loop through headings, and dump them into an array
			headKids.each(function() {
				var $hk = jQuery(this), theText = $hk.text();
				headArray.push(theText);				
			});
			
		
			
			function injectElements() {
				
				bodyEls.each(function() {
					var tk = jQuery(this).children();					
					
					tk.each(function(index) {
						var thisEl = jQuery(this);
						
						thisEl.prepend(eStart + headArray[index] + eEnd);							
						
					});				
					
				});					
			}
			
				
			injectElements();
			
		
			function addPagination(threshold) {
				
				if(bodyEls.length > threshold) {	
				
				var $pager
					
					if(!$elem.hasClass('paginated')) {
					
						var currentPage = 0;
						var numPerPage = o.paginateThreshold;
					
						$elem.bind('paginateTable', function() {
							bodyEls.removeClass('tr-visible');
							 bodyEls.hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show().addClass('tr-visible');				
						});	
					
					}
				
					$elem.trigger('paginateTable');
													
					function addPagNav() {			
						if($elem.hasClass('paginated')) {
						jQuery('.' + o.pagerClass).show();
						return;	
							
						} else {
							
							var numRows = bodyEls.length;
							var numPages = Math.ceil(numRows / numPerPage);
							var $pagerElement = jQuery('<div class="' + o.pagerClass +'"></div>');
							
							for (var page = 0; page < numPages; page++) {
								jQuery('<a href="#" class="page-number"></a>').text(page + 1)
								.bind('click', 
									{newPage: page}
									, function(event) {
										event.preventDefault();
										currentPage = event.data['newPage'];
										$elem.trigger('paginateTable');
										jQuery(this).addClass('active').siblings().removeClass('active');
										
										if(o.addRowCount) {
											addRowCount();
										}
								})
								.appendTo($pagerElement).addClass('clickable');
							} 
							
							$pagerElement.append('<span class ="rowCount"></span>');   				
							
						//console.log($pagerElement);	
						$pagerElement.insertBefore($elem).find('span.page-number:first').addClass('active');
						$elem.addClass('paginated');	
						}							
					}
					
					addPagNav();
					
					function addRowCount() {
						
						var totRows = bodyEls.length;
						
						var visFirst = jQuery('.tr-visible:first').index() +1;
						var visLast =  jQuery('.tr-visible:last').index() +1;
						
						var rcMsg = 'Displaying rows ' + visFirst + ' to ' + visLast + ' of ' + totRows;
						
						jQuery('.rowCount').text(rcMsg);
						
					
					}
					
					if(o.addRowCount) {
						addRowCount();
					}
				}
			}			
		
			
			function removePagination() {
				bodyEls.show();
				jQuery('.' + o.pagerClass).hide();
				
			}
		
			
			function doPagination() {
				if (matchMedia('only screen and (max-width: ' + o.breakPoint + ')').matches) {
  					addPagination(o.paginateThreshold);					
				}else {	
					removePagination();			
				}
			}	
			
			if(o.paginate) {
				
				doPagination();	
				
				jQuery(window).resize(function() {			
					doPagination();				
				});				
			}
			
		


        }); // close return this each
    }; // close outer function call
    //  specify plugin defaults
    $.fn.repTable.defaults = {
		headElements: 'thead tr',
		bodyElements: 'tbody tr',
		headingTagOpen: '<b class ="rt-ss-label">',
		headingTagClose: ' : </b>',
		breakPoint: '640px',
		paginate: true,
		paginateThreshold: 5,
		pagerClass: 'pager',
		addRowCount: true
    };
    //
    // end of closure
    //
})(jQuery);