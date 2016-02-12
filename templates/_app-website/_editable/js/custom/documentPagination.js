$(document).ready(function(){
    
    //get the content
    var toBePaginated = $(".documentPagination").html();
    
    //break the content into pages
    var page = toBePaginated.split("<page-break></page-break>")
    
    //if pages are set then break content into pages
    if(typeof page[1] !== "undefined"){

        //replace content with page one of content
        $(".documentPagination").html(page[0]);
        
        //find the number of pages
        var pageNum = page.length
        //pageNum = 50
        limitDisplay = 7
        currentPage = 1;
        
        //create page numbers
        pageNumDisplay = ""
        ellipse = true;
        ellipsePos = "end";
        for(i=1; i<=pageNum; i++){
            
            //If the number of items to display are under the limit display
            if(i <= limitDisplay && pageNum <= limitDisplay) {
                console.log("x")
                pageNumDisplay = pageNumDisplay + "<a href='#'>" + i + "</a>"
            }
            
            
            //If the number of items to display are over the limit display
            if(i <= (limitDisplay - 2) && pageNum > limitDisplay ){
                pageNumDisplay = pageNumDisplay + "<a href='#'>" + i + "</a>"
            }
            
            //If the limt of items to display are over add the ellipse & max number
            if(i > limitDisplay ) {                     
                
                if(ellipse){
                    
                    pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>";
                 
                    pageNumDisplay = pageNumDisplay + "<a href='#'>" + pageNum + "</a>"
                    
                    ellipse = false;
                    
                }//end eplise
                
            }//end if
            
        }//end loop
        
        //load pagination
        $(".pageNumbers").html(pageNumDisplay)
        
        //set activation to first item
        $(".paginationC .pageNumbers a:eq(0)").addClass("active")
        
        //turn on pageination
        $(".paginationC").css({"display":"block"});
        
        
        //function to update pagination
        updatePagination = function(ref) {
            
            //get current item being requested
            currentItem = $(ref).text();
            
 
            //if ellipse is at the end and 5th item is activated and it's reached its limit
            if(ellipsePos == "end" && $(ref).is(':nth-child('+ Number(limitDisplay - 2) +')') &&  Number(pageNum - currentItem) <= 3 ){
                console.log("x1")
                var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"
                
                var startWith = $(ref).text()
                startWith = Number(startWith) - 1;
                
                var endWith = startWith + (limitDisplay - 3)
                
                for(i=startWith; i<=endWith; i++){
                
                    pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                
                }
                    
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "begin"
                
            }
            
            //if ellipse is at the end and 5th item is activated and it hasn't reached it's limit
            if(ellipsePos == "end" && $(ref).is(':nth-child('+ Number(limitDisplay - 2) +')') && Number(pageNum - currentItem) > 3 ){
                console.log("x2")
                var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"
                
                var startWith = $(ref).text();
                startWith = Number(startWith) - 1;                
                var endWith = (limitDisplay - 4 - 1) + startWith 
                
                for(i=startWith; i<=endWith; i++){
                    pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                }
                
                pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                    
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "both"
                
            }

            
            //if both ellipses are displaying and the 3rd from last last trigger button is activated
            if(ellipsePos == "both" && $(ref).is(':nth-child('+ Number(limitDisplay - 2) +')') ){
                console.log("x3")
                var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"
                
                if($(ref).text() != pageNum - 3){
                    
                    var startWith = $(ref).text();
                    startWith = Number(startWith) - (limitDisplay - 4 - 2);
                    var endWith = startWith + (limitDisplay - 4 - 1)


                    for(i=startWith; i<=endWith; i++){
                        pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                    }

                    pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                    
                }else{
                    
                    var startWith = pageNum - (limitDisplay - 2 - 1);

                    for(i=startWith; i<=pageNum; i++){
                        pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                    }
                    
                    ellipsePos = "begin"
                }

                
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
            }
            
            
            //if both ellipses are displaying and the 3rd from the front trigger button is activated
            if(ellipsePos == "both" && $(ref).is(':nth-child(3)') ){
                console.log("x4")
                
                if($(ref).text() != 4){ 
                    
                    var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"

                    var startWith = $(ref).text();
                    startWith = Number(startWith) - 1;                
                    var endWith = (limitDisplay - 4 - 1) + startWith 

                    for(i=startWith; i<=endWith; i++){
                        pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                    }

                    
                } else{
                    
                    var endWith = (limitDisplay - 2)
                    
                    var pageNumDisplay = "";
                    
                    for(i=1; i<=endWith; i++){
                        pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                    }
                                        
                    ellipsePos = "end"
                    
                }
                
                pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                
                
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
            }
            
            
            
            //if ellipse is at the end and last item is actived 
            if((ellipsePos == "end" || ellipsePos == "both") && $(ref).is(':nth-child('+ Number(limitDisplay) +')') ){
                console.log("x5")                
                var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"
                
                var endWith = $(ref).text();
                startWith = Number(endWith) - 4         
                
                for(i=startWith; i<=endWith; i++){
                
                    pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                
                }

                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "begin"
                
            }
            
            
            //if ellipse is at the beginning and last item is actived
            if((ellipsePos == "begin" || ellipsePos == "both") && $(ref).is(':nth-child(1)') ){
                console.log("x6")
                var pageNumDisplay = "";
                
                for(i=1; i<=5; i++){                
                    pageNumDisplay = pageNumDisplay + "<a href='#'>"+ i +"</a>"
                }
                
                pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "end"
                
            }

            
            //if ellipse is at the begining and we click on the 3rd pagination link
           //if(ellipsePos == "end" && $(ref).is(':nth-child('+ Number(limitDisplay - 2) +')') &&  Number(pageNum - currentItem) <= 3 ){
            if(ellipsePos == "begin" && $(ref).is(':nth-child(3)') && Number(pageNum - currentItem) <= 3){
                console.log("x7")
                
                var pageNumDisplay =  "<a href='#'>1</a>" + "<a href='#'>2</a>" + "<a href='#'>3</a>" + "<a href='#'>4</a>" + "<a href='#'>5</a>"
                
                pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "end"
                
            }
            
            
            if(ellipsePos == "begin" && $(ref).is(':nth-child(3)') && Number(pageNum - currentItem) > 3 ){
                console.log("x8")
                
                var pageNumDisplay = "<a href='#'>1</a>" + "<span class='nextGroup'>...</span>"
                
                var startWith = $(ref).text();
                startWith = Number(startWith) - 1;                
                var endWith = (limitDisplay - 4 - 1) + startWith 
                
                for(i=startWith; i<=endWith; i++){
                    pageNumDisplay =  pageNumDisplay + "<a href='#'>"+ i +"</a>"
                }
                
                pageNumDisplay = pageNumDisplay + "<span class='nextGroup'>...</span>" + "<a href='#'>"+ pageNum +"</a>"
                    
                //load pagination
                $(".pageNumbers").html(pageNumDisplay)
                
                //update ellipse position
                ellipsePos = "both"
                
            }
            
            
        }
        
        
        //function to update active links
        setActiveNum = function(ref){
            
            //remove active likd
            $(".paginationC .pageNumbers a").removeClass("active")
            
            //add correct active link
            $(".paginationC .pageNumbers a").filter(function(){
                return $(this).text() === String(ref);   
            }).addClass("active")
            
                        
        }
        
        
        
        //change scroll position so pagination is in viewable area
        adjScrollPos = function(){
            
            var moveTo = $("html .paginationC").offset().top 
                
            $('html, body').animate({
                scrollTop: moveTo - 200
            }, 500);
        
        }
        
            
        
        //previous button
        $( ".paginationC" ).on( "click", ".prev", function(e) {
            
            e.preventDefault();
            
            if(currentPage != 1){
                
                //update current page
                currentPage = Number(currentPage) - 1;
                
                //load page
                $(".documentPagination").html(page[currentPage - 1 ]);
                
                //check if we need to update pagination
                //updatePagination( $(".paginationC .pageNumbers a:contains('"+ currentPage +"')") ); 
                updatePagination(
                    $(".paginationC .pageNumbers a").filter(function(){
                        return $(this).text() === String(currentPage);   
                    })
                )
                
                
                //set active state
                setActiveNum(currentPage)
                
                //set scroll position
                adjScrollPos()
                
            }
            
        });
        
        
        //next button
        $( ".paginationC" ).on( "click", ".next", function(e) {
            
            e.preventDefault();
            
            if(currentPage != pageNum){
                
                //update current page
                currentPage = Number(currentPage) + 1;
                
                //load page
                $(".documentPagination").html(page[currentPage - 1 ]);

                //check if we need to update pagination
                updatePagination(
                    $(".paginationC .pageNumbers a").filter(function(){
                        return $(this).text() === String(currentPage);   
                    })
                )
                
                //set active state
                setActiveNum(currentPage)
                
                //set scroll position
                adjScrollPos()

            }
            
        });
        
        
        
        
        //click on a number pagination
        $( ".paginationC .pageNumbers" ).on( "click", "a", function(e) {
        
            e.preventDefault();
            
            //find the value of request
            var getValue = $(this).text();
            
            //update current page
            currentPage = getValue;
            
            //load page
            $(".documentPagination").html(page[currentPage - 1 ]);
            
            //check if we need to update pagination
            updatePagination( $(this) );           
               
            //set active state
            setActiveNum(currentPage)
            
            //set scroll position
            adjScrollPos()
            
        });
        
    }
    
});