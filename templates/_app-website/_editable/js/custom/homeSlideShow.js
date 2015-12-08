$( document ).ready(function() {
    
    //if slider exists
    if($("#topSliderC").length){
    
        var swipeSelector = document.getElementById('topSliderC');
        var swipeInstance = new Hammer(swipeSelector);


        var currSlide = 0;
        var prevSlide = 0;

        var totalSlides = $("#topSliderC #slides .slide").length;

        //create slideShow Navigation
        var slideNav = "";
        for (i = 0; i <= totalSlides - 1; i++) { 
            slideNav = slideNav + '<a href="#" id="sn' + i + '"></a>';
        }
        $("#topSliderC #topSliderNavC").html(slideNav)

        //variable starting pos
        var leftStartPos = "50"

        //initialize SlideShow
        function initSlideShow() {

            //prep new slide
            $("#topSliderC #slides .slide:eq(0)").css({"display":"block", "opacity":0.0, "left":leftStartPos+"px","z-index":"1"})

            //Animate slide in
            $("#topSliderC #slides .slide:eq(0)").animate({
                opacity: 1.0,
                left: "0px"
            }, 500, "easeOutQuad");

            //set active link indicator
            $("#topSliderC #topSliderNavC a:eq(0)").addClass("active");

        }
        initSlideShow()


        //SlideShow
        function runSlideShow(status) {



            if(status == "forward"){    
                //update slide number
                prevSlide = currSlide
                currSlide = Number(currSlide) + 1;

                if(currSlide > totalSlides - 1 ){
                  currSlide = 0;
                }

                //if number is positive switch it to negative
                if(leftStartPos < 0){
                    leftStartPos = leftStartPos * -1;
                }

            }

            if(status == "reverse"){ 

                //update slide number
                prevSlide = currSlide
                currSlide = Number(currSlide) - 1;

                if(currSlide < 0 ){
                  currSlide = totalSlides - 1;
                }

                //if number is positive switch it to negative
                if(leftStartPos > 0){
                    leftStartPos = leftStartPos * -1;
                }

            }

            //prep new slide
            $("#topSliderC #slides .slide:eq(" + currSlide + ")").css({"display":"block", "opacity":0.0, "left":leftStartPos+"px", "z-index":"2"})

            //Animate new slide in
            $("#topSliderC #slides .slide:eq(" + currSlide + ")").animate({
                opacity: 1.0,
                left: "0px"
            }, 500, "easeOutQuad");    

            //re-adjust prev slide
            $("#topSliderC #slides .slide:eq(" + prevSlide + ")").css({"display":"none", "z-index":"1"})

            //update active link indicator
            $("#topSliderC #topSliderNavC a").removeClass("active")
            $("#topSliderC #topSliderNavC a:eq(" + currSlide + ")").addClass("active");

        }    

        //slideShow Timer
        var slideShowTimer = setInterval(function(){ runSlideShow("forward") }, 8000);



        //Navigation Functionality
        $("#topSliderC #topSliderNavC a").click(function(e) {

            e.preventDefault();

            clearInterval(slideShowTimer);

            //slideNumb
            var slideID = $(this).attr("id")
            slideNumChange = slideID.replace("sn", "");

            if(slideNumChange != currSlide) {

                //update slide status
                prevSlide = currSlide;       
                currSlide = slideNumChange;

                runSlideShow();

            }

        });


        function nSlide() {

            clearInterval(slideShowTimer);

            runSlideShow("forward");

        }

        //swipe left
        swipeInstance.on("swipeleft", function(ev) { 
            nSlide();        
        });

        //rtBtn
        $("#topSliderArrowsC #rtArrow").click(function(e) {

            e.preventDefault();

            nSlide()
        });



        function pSlide() {

            clearInterval(slideShowTimer);

            runSlideShow("reverse");

        }

        //swipe right
        swipeInstance.on("swiperight", function(ev) { 
            pSlide();        
        });


        //lftBtn
        $("#topSliderArrowsC #lftArrow").click(function(e) {

            e.preventDefault();

            pSlide()
        });

    }
        
});