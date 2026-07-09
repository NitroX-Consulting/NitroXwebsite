$(window).load(function(){
	var sliders = $("#_slider>div"),
		slidNumberNew=0,
		slidNumberOld=0,
		slidAll= $("#_slider>div").length,
		autoPlayState = true,
		anomationStop=false,
		MSIE = ($.browser.msie) && ($.browser.version <= 8),
		spinner = '<div id="spinnerHolder"><div id="spinnerImg"></div></div>';
		
	$(window).bind("hashchange", changeSiteHash);
	changeSiteHash()	
	init()
	function init(){
		$("#next1").click(nextClick)
		$("#prev1").click(prevClick)
		sliders.css({"position":"absolute"});
		if(!MSIE){
			sliders.not(sliders.eq(slidNumberNew)).animate({"left":'-350px'}, 0)
		}else{
			sliders.not(sliders.eq(slidNumberNew)).fadeOut(0);
		}
        
		anomationStop=true;
		autoPlay();
	}
	function changeSiteHash(){
		if(window.location.hash !="#!/home") {
			autoPlayState=false;
		}
	}
	function autoPlay(){
		setTimeout(temeOut, 3000);
		function temeOut(){
			if(autoPlayState){
				slidNumberOld = slidNumberNew
				slidNumberNew++;
				if(slidNumberNew>slidAll-1){
					slidNumberNew=0;
					autoPlayState = false;
				}
				changeImageNext();
			}
		}
	}
  
    ////////////////////////////
    
	function changeImageNext(){
		anomationStop=false;
		if(!MSIE){
			sliders.eq(slidNumberOld).css({"background":"none"}).animate({"left":'-350px'}, 500)
            
		}else{
			sliders.eq(slidNumberOld).fadeOut(500);
		}

		if(!MSIE){
			sliders.eq(slidNumberNew).css({"background":"none",'left':'350px'}).animate({"left":'0px'}, 500, function(){anomationStop=true;})
		}else{
			sliders.eq(slidNumberNew).fadeTo(500,1, function(){anomationStop=true;});
		}
 
	
		autoPlay();
	}
    
    /////////////////////////////
    	function changeImagePrev(){
		anomationStop=false;
		if(!MSIE){
			sliders.eq(slidNumberOld).css({"background":"none"}).animate({"left":'350px'}, 500)
            
		}else{
			sliders.eq(slidNumberOld).fadeOut(500);
		}

		if(!MSIE){
			sliders.eq(slidNumberNew).css({"background":"none",'left':'-350px'}).animate({"left":'0px'}, 500, function(){anomationStop=true;})
		}else{
			sliders.eq(slidNumberNew).fadeTo(500,1, function(){anomationStop=true;});
		}
 
	
		autoPlay();
	}
    
	function nextClick(){
	  
		if(anomationStop){ 
		  
			autoPlayState = false;
			slidNumberOld = slidNumberNew
			slidNumberNew++;
			if(slidNumberNew>slidAll-1){
				slidNumberNew=0;
			}
			changeImageNext();
                        
		}
		return false;
	}
	function prevClick(){
		if(anomationStop){
		  
			autoPlayState = false;
			slidNumberOld = slidNumberNew
			slidNumberNew--
			if(slidNumberNew<0){
				slidNumberNew=slidAll-1;
			}
			changeImagePrev();
		}
		return false;
	}	
})