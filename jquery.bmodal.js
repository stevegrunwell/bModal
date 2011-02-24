/*

	bModal: a bare-bones jQuery modal plugin
	author: Steve Grunwell (http://stevegrunwell.com)
	Requires the jQuery library (http://jquery.com)
	
	Example usage:
	$.fn.bmodal('Lorem ipsum sit dolor'); // Display that message in a modal window
	
	$.fn.bmodal({ // Hide the default close button
	  content: 'Now there is no default close button!',
	  showClose: false
	});
	
*/

(function( $ ){
  
  // Default settings
  var settings = {
    content: '',
    overlayId: 'overlay',
    modalId: 'modal',
    showClose: true,
    durationIn: 300,
    durationOut: 200
  }
  
  // Define our methods
  var methods = {
    init: function(data){
      
      // Allow user to change settings
      return this.each( function() {
        if(data){ 
          $.extend(settings, data);
        }
        $('body').append('<div id="' + settings.overlayId + '">&nbsp;</div>');
        if( settings.content !== '' ){
          methods.open(settings.content);
        }
      });
    },
    
    close: function(){
      $('#' + settings.overlayId + ', #' + settings.modalId + '-wrap').fadeOut(settings.durationOut, function(){
    		$('#'+settings.modalId + '-wrap').remove();
    	});
    	return true;
    },
      
    open: function(data){
      if( data !== '' ){
    		$('#' + settings.overlayId).append('<div id="' + settings.modalId + '-wrap" style="display:none;"><div id="' + settings.modalId + '">' + data + ( !settings.showClose ? '' : '<a href="" class="static-close close">Close</a></div></div>') );
    		$('#' + settings.overlayId + ', #' + settings.modalId + '-wrap').fadeIn(settings.durationIn, function(){
    			$('#' + settings.modalId + ' .close').bind('click', function(){
    			  methods.close();
    				return false;
    			});
    		});
    	}
    	return true;
    }
  };

  $.fn.bmodal = function(data) {

      // Method calling logic
      if ( methods[data] ) {
        return methods[ data ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof data === 'object' || !data ){
        return methods.init.apply( this, arguments );
      } else if ( typeof data === 'string' ){
        methods.init.apply(this);
        return methods.open(data);
      } else {
        $.error( 'Invalid method for bModal: ' + data );
      }    

    };

})(jQuery);