//-------------------------------Function isset-------------------------------//
// Purpose: Determines if a variable has been set/initialized
// PARAMETERS:
// 		Var: A variable of any type.
// Postcondition: Returns boolean true if the variable is set. False otherwise.
//----------------------------------------------------------------------------//
function isset(Var)
{
	return !(typeof Var == 'undefined' || Var === null  || Var === "");
}

(function(jQuery) {
//--------------------------------plugin equalTo------------------------------//
// Description: Determines the equality of 2 jQuery objects.
// PARAMETERS:
//		obj;     //The jQuery object being compared
// Postcondition: Returns boolean true if objects are equal. False if not.
//----------------------------------------------------------------------------//
jQuery.fn.equalTo = function(obj)
{
	return !jQuery(this).not( jQuery(obj) ).length;
};

//------------------------------plugin arrayShift-----------------------------//
// Description: Takes an index of an array, places it at
// another index, and shifts the rest of the array into place
// PARAMETERS:
//		 index;       //The index being moved
//		 newLocation; //The new index of index
// Postcondition: returns an altered jQuery object
//----------------------------------------------------------------------------//
jQuery.fn.arrayShift = function(index, newLocation)
{
	//Copy all matched elements of the jQuery object to an array
	var tempArr = jQuery.makeArray(jQuery(this));	
	
	//Loop through arguments and convert strings into integers.
	for(var i=0; i<arguments.length; i++)
	{
		if(isNaN(arguments[i]))
		{
			if(arguments[i] == "first")
			{
				//The first index of the array
				arguments[i] = 0;
			}
			else if (arguments[i] == "last")
			{
				//The last index of the array
				arguments[i] = tempArr.length-1;
			}
		}
		else
		{
			arguments[i] = parseInt(arguments[i], 10);
		}
	}
	
	
	//Create a temporary copy of array[index]
	var tempVal = tempArr[index];
	
	if(index > newLocation)
	{
		
		//For every index starting from [index] until (but not including)
		//the index newLocation, Copy the value of the previous index to the 
		//current index
		for(i=index; i>newLocation; i--)
		{
			tempArr[i] = tempArr[i-1];
		}
		
		//Copy the stored value to the newLocation index
		tempArr[newLocation] = tempVal;
		
	}
	else if(index < newLocation)
	{
		//For every index starting from [index] up until (but not including)
		//[newLocation], copy the value of the next index into the current index.
		for(i=index; i<newLocation; i++)
		{
			tempArr[i] = tempArr[i+1];
		}
		
		//Copy the stored value to the newLocation index
		tempArr[newLocation] = tempVal;		
	}
	
	return jQuery(tempArr);
};
//------------------------------plugin fakeFloat------------------------------//
// Description: Aligns elements in a jQuery object based on their index 
// PARAMETERS:
//	options;  //Object that contains settings
//         margin: The margin/blank space between each element in pixels
//         offset: The initial offset in pixels
// Postcondition: Performs an animation
//----------------------------------------------------------------------------//
jQuery.fn.fakeFloat = function(options)
{
	
	var defaults = {
	margin: 0,
	offset: 0,
	},
	settings = jQuery.extend(defaults, options);  
		
	//Initialize counter
	var i=0;
	
	//Initialize element width
	var elemWidth = 0;
	
	jQuery(this).each(function()
	{
		elemWidth = jQuery(this).width();
		
/*
 * Consider three 100px width boxes we want to fakeFloat left with 10px between 
 * and with a 5px offset. (Remember the 'left' property is in reference to the
 * left-most portion of the box)
 
    ____________________     ____________________      ___________________
	|                   |    |                   |    |                   |
	| (100+10)*0+5 == 5 |    | (100+10)*1+5==115 |    | (100+10)*2+5==225 |   
	|___________________|(10)|___________________|(10)|___________________|(10)
   ____________________________________________________________________________
     5                       115                      225             
 */

		var newLoc = ((settings.margin) + elemWidth)*i + (settings.offset) 

		//.css doesn't work as well for this, probably due to the queue.
		jQuery(this).animate({"left": newLoc}, 0);

		i++;
	});
	return this;
	
};

//------------------------------plugin getIndexOf-----------------------------//
// Description: Retrieves the relative index of an object within a jQuery 
//              object.
// PARAMETERS:
//		jQobj;     //The jQuery object being searched through
// Postcondition: Returns an integer corresponding to the location of the 
//                object; if nothing is found, returns boolean false.
//----------------------------------------------------------------------------//
jQuery.fn.getIndexOf = function(jQobj)
{
	//Assume value isn't found
	var index = false;
	
	//Define scope
	var value = jQuery(this);
	
	//Initiate index counter
	var i=0;
	jQuery(jQobj).each(function()
	{
		if(jQuery(this).equalTo(jQuery(value)))
		{
			index = i;
		}
		
		//Increment index counter
		i++;
	});
	
	return index;
};

})(jQuery); //End jQuery
