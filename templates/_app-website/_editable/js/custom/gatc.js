$(document).ready(function() {

/*
GATC and NATC calculator(s)
*/
	$("#reset").click(function(e){
		$(".pointTotal").css("visibility", "hidden");
	});

	//$(".dollarFormat").autoNumeric('init');

	$("#calculateGATC").click(function(e){
		e.preventDefault();
	    
        //Get values entered
        var calculator = $("#gatcCalculator");
        var treatRateType = calculator.find(".treatRateType").val();
        var price = calculator.find(".price").val().replace("$", "");
		var treatRate = calculator.find(".treatRate").val();
        
        //validate fields
        var gatcValidateFields = [];
        
        if(price == ""){
            gatcValidateFields.push("Price") 
        }
        if(treatRate == ""){
            gatcValidateFields.push("Treat Rate") 
        }

        // Do Calculations if validates
        if(gatcValidateFields.length >  0){
		  
            alert("Please enter the following: " + gatcValidateFields.toString() );
            
        }else{
            
            var points = findGatc(treatRateType, treatRate,price);
        
            calculator.find(".pointTotal").val(points).css("visibility", "visible");
            
        }
        
	});

	$("#calculateNATC").click(function(e){
		e.preventDefault();
        
        //Get values entered
        var calculator = $("#natcCalculator");
        var treatRate = calculator.find(".treatRate").val();
        var treatRateType = calculator.find(".treatRateType").val();
        var price = calculator.find(".price").val().replace("$", "");
        var gasolinePrice = calculator.find(".gasolinePrice").val().replace("$", "");
        var sg = calculator.find(".sg").val();
        
        
        //validate fields
        var natcValidateFields = [];
        
        if(price == ""){
            natcValidateFields.push("Price") 
        }
        if(gasolinePrice == ""){
            natcValidateFields.push("Base Oil/Gasoline Price") 
        }        
        if(treatRate == ""){
            natcValidateFields.push("Treat Rate") 
        }

        
		// Do Calculations
        if(natcValidateFields.length >  0){
		  
            alert("Please enter the following: " + natcValidateFields.toString() );
            
        }else{

		  var points = findNatc(treatRateType, treatRate, price, gasolinePrice, sg);

		  calculator.find(".pointTotal").val(points).css("visibility", "visible");
            
        }
        
	});

	function findGatc(treatRateType, treatRate, price) {
        
		return (treatRateType == "ptb")? ((price * treatRate) / 4.2) * .01 :  (treatRate/100) * price;
	}


	function findNatc(treatRateType, treatRate, price, gasolinePrice, sg){
        
	    var gatc = findGatc(treatRateType, treatRate, price) * 100; // multiple by 100 to reverse the points to cents per gallon calculation above.

		return (treatRateType == "ptb")? (gatc -((treatRate * gasolinePrice) / (sg * 4.2))) * .01 : (price - gasolinePrice) * treatRate;

	}
});