/**
 * PictorialScales.js
 * 
 * Version: 1.0.0
 *
 * Copyright 2019 Laurent Foulloy
 */

/**
 * Arrow
 * 
 * @param canvas
 * @param element
 * @param configuration
 * @returns void
 */
function Arrow(canvas, element, configuration) {
	// Variables
	var self = this;
	
	// Attributes
	this.canvas = document.getElementById(canvas);
	this.element = document.getElementById(element);
	this.fuzzy = {};
	this.defaultConfiguration = {
			"fuzzyPartition" : [ {
				"bounds" : [ 0, 0, 15, 50 ],
				"color" : [ 255, 0, 0 ],
				"label" : "U"
			}, {
				"bounds" : [ 15, 50, 55, 90 ],
				"color" : [ 255, 255, 0 ],
				"label" : "N"
			}, {
				"bounds" : [ 55, 90, 100, 100 ],
				"color" : [ 0, 255, 0 ],
				"label" : "S"
			} ],
			"colorPrototypes" : [ {
				"label" : "U",
				"prototype" : [ 255, 0, 0 ]
			}, {
				"label" : "N",
				"prototype" : [ 255, 255, 0 ]
			}, {
				"label" : "S",
				"prototype" : [ 0, 255, 0 ]
			} ],		
			"anglePrototypes" : [ {
				"label" : "U",
				"prototype" : -40
			}, {
				"label" : "N",
				"prototype" : 0
			}, {
				"label" : "S",
				"prototype" : 40
			} ],				
			"options" : {
				"arrowThickness": 12,
				"arrowLength": 95,
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400
			}
	};

	/**
	 * Initializes the emoticon
	 */
	this.initialize = function(userConfiguration) {
		// Generates the configuration
		var configuration = new Configuration(this, userConfiguration);	
		
		return configuration.configuration;
	}

	// Initializes the emoticon and sets the configuration
	this.configuration = this.initialize(configuration);	

	/**
	 * Renders the arrow
	 */
	this.render = function() {				
		if (this.canvas.getContext) {
			this.draw(this.element.value);
		}
		if (this.fuzzy.canvasFuzzy !== null) {
			this.fuzzy.drawFuzzyPartition();
		}
	}
	
	/**
	 * Manages the doubleClick event
	 */
	this.doubleClickEventManager = function() {
		if (self.fuzzy.canvasFuzzy === null) {
			self.fuzzy.drawFuzzyPartition();
		} else {
			self.canvas.parentNode.removeChild(self.fuzzy.canvasFuzzy);
			self.fuzzy.canvasFuzzy = null;
		}
	} 
		
	/**
	 * Draws the arrow
	 */
	this.draw = function(x) {
		var color = [];
		var smile;
		var size = this.canvas.width;
		var context = this.canvas.getContext("2d");

		// Creates the fuzzy object and set the imput
		this.fuzzy = new Fuzzy(this);
		this.fuzzy.fuzzyInput = x;

		// Fuzzifies the value
		var xFuzzy = this.fuzzy.fuzzyDescription(x, this.configuration.fuzzyPartition);

		// Gets the color and the smile
		color = this.fuzzy.defuzzify(xFuzzy, this.configuration.colorPrototypes);
		angle = this.fuzzy.defuzzify(xFuzzy, this.configuration.anglePrototypes);		
			
		// Clears the canvas
		context.clearRect(0, 0, size, size);
		
		// Draws the arrow
		var arrowLength = this.configuration.options.arrowLength;
		var arrowThickness = this.configuration.options.arrowThickness;
		var u = arrowThickness;
		var v = size/2;
		var theta = -angle * Math.PI / 180;
		
		context.beginPath();
		context.save();
		context.rotate(theta);
		context.translate(v*Math.sin(theta) + u*Math.cos(theta), v*Math.cos(theta) - u*Math.sin(theta) - size/2);
		context.fillStyle = "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
		context.moveTo(u, v);
		context.lineTo(u, v - this.configuration.options.arrowThickness);
		context.lineTo(u + arrowLength-2*arrowThickness, size/2 - arrowThickness);
		context.lineTo(u + arrowLength-2*arrowThickness, size/2 - 2*arrowThickness);
		context.lineTo(u + arrowLength, size/2);
		context.lineTo(u + arrowLength-2*arrowThickness, size/2 + 2*arrowThickness);
		context.lineTo(u + arrowLength-2*arrowThickness, size/2 + arrowThickness);
		context.lineTo(u, size/2 + arrowThickness);	
		context.closePath();
		context.fill();
		context.restore();
		context.stroke();
	}
}

/**
 * SunCloud
 * 
 * @param canvas
 * @param element
 * @param configuration
 * @returns void
 */
function SunCloud(canvas, element, configuration) {
	// Variables
	var self = this;
	
	// Attributes
	this.canvas = document.getElementById(canvas);
	this.element = document.getElementById(element);
	this.fuzzy = {};
	this.defaultConfiguration = {		
			"fuzzyPartition" : [ {
				"bounds" : [ 0, 0, 0, 25 ],
				"color" : [ 255, 0, 0 ],
				"label" : "VL"
			}, {
				"bounds" : [ 0, 25, 25, 50 ],
				"color" : [ 255, 128, 0 ],
				"label" : "L"
			}, {
				"bounds" : [ 25, 50, 50, 75 ],
				"color" : [ 255, 255, 0 ],
				"label" : "N"
			}, {
				"bounds" : [ 50, 75, 75, 100 ],
				"color" : [ 128, 255, 0 ],
				"label" : "R"		
			}, {
				"bounds" : [ 75, 100, 100, 100 ],
				"color" : [ 0, 255, 0 ],
				"label" : "VR"					
			} ],
			"sunSizePrototypes" : [ {
				"label" : "VL",
				"prototype" : 0
			}, {
				"label" : "L",
				"prototype" : 0
			}, {
				"label" : "N",
				"prototype" : 30
			}, {
				"label" : "R",
				"prototype" : 35
			}, {
				"label" : "VR",
				"prototype" : 40		
			} ],
			"sunPositionPrototypes" : [ {
				"label" : "VL",
				"prototype" : [0, 0]
			}, {
				"label" : "L",
				"prototype" : [0, 0]
			}, {
				"label" : "N",
				"prototype" : [0, 0]
			}, {
				"label" : "R",
				"prototype" : [0, 0]
			}, {
				"label" : "VR",
				"prototype" : [0, 0]			
			} ],
			"sunColorPrototypes" : [ {
				"label" : "VL",
				"prototype" : [ 255, 255, 255 ]
			}, {
				"label" : "L",
				"prototype" : [ 255, 128, 0 ]
			}, {
				"label" : "N",
				"prototype" : [ 204, 204, 0 ]
			}, {
				"label" : "R",
				"prototype" : [ 230, 230, 0 ]
			}, {
				"label" : "VR",
				"prototype" : [ 255, 255, 0 ]			
			} ],	
			"sunraySizePrototypes" : [ {
				"label" : "VL",
				"prototype" : 0
			}, {
				"label" : "L",
				"prototype" : 0
			}, {
				"label" : "N",
				"prototype" : 0.8
			}, {
				"label" : "R",
				"prototype" : 1.0
			}, {
				"label" : "VR",
				"prototype" : 1.3				
			} ],			
			"cloudSizePrototypes" : [ {
				"label" : "VL",
				"prototype" : 1.3
			}, {
				"label" : "L",
				"prototype" : 1
			}, {
				"label" : "N",
				"prototype" : 0.8
			}, {
				"label" : "R",
				"prototype" : 0
			}, {
				"label" : "VR",
				"prototype" : 0				
			} ],
			"cloudPositionPrototypes" : [ {
				"label" : "VL",
				"prototype" : [-50, 0]
			}, {
				"label" : "L",
				"prototype" : [-15, 0]
			}, {
				"label" : "N",
				"prototype" : [0, 0]
			}, {
				"label" : "R",
				"prototype" : [5, 0]
			}, {
				"label" : "VR",
				"prototype" : [5, 0]			
			} ],
			"cloudColorPrototypes" : [ {
				"label" : "VL",
				"prototype" : [ 25, 25, 25 ]
			}, {
				"label" : "L",
				"prototype" : [ 127, 127, 127 ]
			}, {
				"label" : "N",
				"prototype" : [ 192, 192, 192 ]
			}, {
				"label" : "R",
				"prototype" : [ 255, 255, 255 ]
			}, {
				"label" : "VR",
				"prototype" : [ 255, 255, 255 ]			
			} ],
			"rainLevelPrototypes" : [ {
				"label" : "VL",
				"prototype" : 10
			}, {
				"label" : "L",
				"prototype" : 7
			}, {
				"label" : "N",
				"prototype" : 0
			}, {
				"label" : "R",
				"prototype" : 0
			}, {
				"label" : "VR",
				"prototype" : 0				
			} ],			
			"options" : {
			}
	};
	
	/**
	 * Initializes the sun/cloud
	 */
	this.initialize = function(userConfiguration) {
		// Generates the configuration
		var configuration = new Configuration(this, userConfiguration);	
	
		return configuration.configuration;
	}

	// Initializes the sun/cloud and sets the configuration
	this.configuration = this.initialize(configuration);	

	/**
	 * Renders the sun/cloud
	 */
	this.render = function() {				
		if (this.canvas.getContext) {
			this.draw(this.element.value);
		}
		if (this.fuzzy.canvasFuzzy !== null) {
			this.fuzzy.drawFuzzyPartition();
		}
	}

	/**
	 * Manages the doubleClick event
	 */
	this.doubleClickEventManager = function() {
		if (self.fuzzy.canvasFuzzy === null) {
			self.fuzzy.drawFuzzyPartition();
		} else {
			self.canvas.parentNode.removeChild(self.fuzzy.canvasFuzzy);
			self.fuzzy.canvasFuzzy = null;
		}
	} 
	
	/**
	 * Draws the sun/cloud
	 */
	this.draw = function(x) {
		var size = this.canvas.width;
		var context = this.canvas.getContext("2d");

		// Creates the fuzzy object and set the imput
		this.fuzzy = new Fuzzy(this);
		this.fuzzy.fuzzyInput = x;

		// Fuzzifies the value
		var xFuzzy = this.fuzzy.fuzzyDescription(x, this.configuration.fuzzyPartition);

		// Gets the color and the smile
		var sunSize = this.fuzzy.defuzzify(xFuzzy, this.configuration.sunSizePrototypes);
		var sunPosition = this.fuzzy.defuzzify(xFuzzy, this.configuration.sunPositionPrototypes);
		var sunColor = this.fuzzy.defuzzify(xFuzzy, this.configuration.sunColorPrototypes);
		var sunraySize = this.fuzzy.defuzzify(xFuzzy, this.configuration.sunraySizePrototypes);
		var cloudSize = this.fuzzy.defuzzify(xFuzzy, this.configuration.cloudSizePrototypes);
		var cloudPosition = this.fuzzy.defuzzify(xFuzzy, this.configuration.cloudPositionPrototypes);
		var cloudColor = this.fuzzy.defuzzify(xFuzzy, this.configuration.cloudColorPrototypes);
		var rainLevel = this.fuzzy.defuzzify(xFuzzy, this.configuration.rainLevelPrototypes);
		
		// Clears the canvas
		context.clearRect(0, 0, size, size);
		
		// Draws the sun
		if (sunSize > 0) {				
			// Draws the sunrays
			context.save();
			context.beginPath();	
			context.strokeStyle = "rgb(" + Math.round(sunColor[0]) + "," + Math.round(sunColor[1]) + "," + Math.round(sunColor[2]) + ")";
			for (var i = 0; i < 12; i++) {
				context.moveTo(sunPosition[0]+size/2+sunSize*Math.cos(i*Math.PI/6), sunPosition[1]+size/2+sunSize*Math.sin(i*Math.PI/6));
				context.lineTo(sunPosition[0]+size/2+ sunSize*(1 + sunraySize)* Math.cos(i*Math.PI/6), sunPosition[1]+size/2+ sunSize*(1 + sunraySize)* Math.sin(i*Math.PI/6))
				context.stroke();
			}
			context.closePath();
			context.restore();
			
			// Draws the sun
			context.beginPath();	
			context.fillStyle = "rgb(" + Math.round(sunColor[0]) + "," + Math.round(sunColor[1]) + "," + Math.round(sunColor[2]) + ")";
			context.arc(sunPosition[0]+size/2, sunPosition[1]+size/2, sunSize, 0, Math.PI * 2, true);
			context.fill();	
			context.stroke();
			context.closePath();
		}

		// Draws the clouds
	    if (cloudSize > 0) {
	       // Definition of the circles
	        var circle1 = [cloudPosition[0]+size/2, cloudPosition[1]+size/2, 10*cloudSize];
	        var circle2 = [circle1[0]+ 20*cloudSize, circle1[1]- 8*cloudSize, 20*cloudSize];
	        var circle3 = [circle2[0]+ 24*cloudSize, circle1[1]- 12*cloudSize, 30*cloudSize];
	        var circle4 = [circle3[0]+ 24*cloudSize, circle1[1]- 6*cloudSize, 16*cloudSize];	        
        
	       // Intersection points
	        var p1 = this.circleIntersection(circle1, circle2, -1);
	        var p2 = this.circleIntersection(circle2, circle3, -1);
	        var p3 = this.circleIntersection(circle3, circle4, 1);	   
	                
	        // Sets the filling color
			context.save();
			context.fillStyle = "rgb(" + Math.round(cloudColor[0]) + "," + Math.round(cloudColor[1]) + "," + Math.round(cloudColor[2]) + ")";
			context.beginPath();    
			
	        // First circle arc 
			context.arc(circle1[0], circle1[1], circle1[2], Math.PI/2, 3*Math.PI/2, false);			
			
	        // Second circle arc 
	        var theta1 = Math.atan2(p1[1] - circle2[1], p1[0] - circle2[0]);
	        var theta2 = Math.atan2(p2[1] - circle2[1], p2[0] - circle2[0]);       
			context.arc(circle2[0], circle2[1], circle2[2], theta1, theta2, false);
			
	        // Third circle arc
	        var theta1 = Math.atan2(p2[1] - circle3[1], p2[0] - circle3[0]);
	        var theta2 = Math.atan2(p3[1] - circle3[1], p3[0] - circle3[0]);
			context.arc(circle3[0], circle3[1], circle3[2], theta1, theta2, false);
	        
	        // Fourth circle arc
	        var theta1 = Math.atan2(p3[1] - circle4[1], p3[0] - circle4[0]);
	        var theta2 = Math.PI/2;
			context.arc(circle4[0], circle4[1], circle4[2], theta1, theta2, false);	        
       
			context.closePath();
			context.fill();	
			context.stroke();
	
			context.restore();
			
		    // Rain
		    if (rainLevel > 1) {
				context.save();
				context.strokeStyle = "rgb(" + Math.round(cloudColor[0]) + "," + Math.round(cloudColor[1]) + "," + Math.round(cloudColor[2]) + ")";
				var deltaX = Math.round((circle4[0] - circle1[0]) / (rainLevel - 1));  
		    	for (var i=0; i < Math.round(rainLevel); i++) {
		    		context.moveTo(circle1[0]+deltaX*i, circle1[1] + circle1[2]);
		    		context.lineTo(circle1[0]+deltaX*i + 5*cloudSize, circle1[1] + circle1[2] + 5*cloudSize);
		    		context.stroke();
		    	}
				context.restore();
		    }			
	    }
	}
	
	/**
	 * Computes the intersection between two circles
	 */
	this.circleIntersection = function(circle1, circle2, sign) {
		var q = (circle2[0] - circle1[0])/(circle2[1] - circle1[1]);
		var N = (circle1[2]*circle1[2] - circle2[2]*circle2[2] - circle1[0]*circle1[0] + circle2[0]*circle2[0] - circle1[1]*circle1[1] + circle2[1]*circle2[1]) / (2*(circle2[1]-circle1[1]));
		var A = q*q + 1;
		var B = 2*circle2[1]*q - 2*N*q - 2*circle2[0];
		var C = circle2[0]*circle2[0] + circle2[1]*circle2[1] + N*N - circle2[2]*circle2[2] - 2*circle2[1]*N;
		var delta = Math.sqrt(B*B - 4*A*C);		
		var x =(-B + sign*delta)/(2*A);
		var y = N-x*q;
		return [x, y];
	}
}

/**
 * Emoticon
 * 
 * @param canvas
 * @param element
 * @param configuration
 * @returns void
 */
function Emoticon(canvas, element, configuration) {
	// Variables
	var self = this;
	
	// Attributes
	this.canvas = document.getElementById(canvas);
	this.element = document.getElementById(element);
	
	this.fuzzy = {};
	this.defaultConfiguration = {
			"fuzzyPartition" : [ {
				"bounds" : [ 0, 0, 15, 50 ],
				"color" : [ 255, 0, 0 ],
				"label" : "U"
			}, {
				"bounds" : [ 15, 50, 55, 90 ],
				"color" : [ 255, 255, 0 ],
				"label" : "N"
			}, {
				"bounds" : [ 55, 90, 100, 100 ],
				"color" : [ 0, 255, 0 ],
				"label" : "S"
			} ],
			"colorPrototypes" : [ {
				"label" : "U",
				"prototype" : [ 255, 0, 0 ]
			}, {
				"label" : "N",
				"prototype" : [ 255, 255, 0 ]
			}, {
				"label" : "S",
				"prototype" : [ 0, 255, 0 ]
			} ],
			"smilePrototypes" : [ {
				"label" : "U",
				"prototype" : -0.5
			}, {
				"label" : "N",
				"prototype" : 0
			}, {
				"label" : "S",
				"prototype" : 1
			} ],
			"eyesSizePrototypes" : [ {
				"label" : "U",
				"prototype" : 1
			}, {
				"label" : "N",
				"prototype" : 1
			}, {
				"label" : "S",
				"prototype" : 1
			} ],			
			"options" : {
				"eyeWidthToSizeRatio" : 0.08,
				"eyeHeightToWidthRatio" : 1.5,
				"eyeXPositionToSizeRatio" : 0.2,
				"eyeYPositionToSizeRatio" : 0.1,
				"mouthLengthToSizeRatio": 0.55,
				"mouthYPositionToSizeRatio": 0.2,
				"smileToSizeRatio": 0.3,
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400				
			}
	};

	/**
	 * Initializes the emoticon
	 */
	this.initialize = function(userConfiguration) {
		// Generates the configuration
		var configuration = new Configuration(this, userConfiguration);	
		
		return configuration.configuration;
	}

	// Initializes the emoticon and sets the configuration
	this.configuration = this.initialize(configuration);	

	/**
	 * Renders the emoticon
	 */
	this.render = function() {				
		if (this.canvas.getContext) {
			this.draw(this.element.value);
		}
		if (this.fuzzy.canvasFuzzy !== null) {
			this.fuzzy.drawFuzzyPartition();
		}
	}
	
	/**
	 * Manages the doubleClick event
	 */
	this.doubleClickEventManager = function() {
		if (self.fuzzy.canvasFuzzy === null) {
			self.fuzzy.drawFuzzyPartition();
		} else {
			self.canvas.parentNode.removeChild(self.fuzzy.canvasFuzzy);
			self.fuzzy.canvasFuzzy = null;
		}
	} 
		
	/**
	 * Draws the emoticon
	 */
	this.draw = function(x) {
		var color = [];
		var smile;
		var size = this.canvas.width;
		var context = this.canvas.getContext("2d");

		// Creates the fuzzy object and set the imput
		this.fuzzy = new Fuzzy(this);
		this.fuzzy.fuzzyInput = x;

		// Fuzzifies the value
		var xFuzzy = this.fuzzy.fuzzyDescription(x, this.configuration.fuzzyPartition);

		// Gets the color and the smile
		color = this.fuzzy.defuzzify(xFuzzy, this.configuration.colorPrototypes);
		smile = this.fuzzy.defuzzify(xFuzzy, this.configuration.smilePrototypes);
		eyesSize = this.fuzzy.defuzzify(xFuzzy, this.configuration.eyesSizePrototypes);
		
		// Head
		context.beginPath();		
		context.fillStyle = "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
		context.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
		context.fill();	
		context.closePath();

		// Mouth
		context.beginPath();
		context.moveTo(
				size*(1 - this.configuration.options.mouthLengthToSizeRatio)/2, 
				size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio))
		;
		context.closePath();
		context.quadraticCurveTo(
				size/2, 
				size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smile), 
				size*(1 + this.configuration.options.mouthLengthToSizeRatio)/2, 
				size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio)
		);
		context.stroke();

		// Left eye
		context.fillStyle = "black";
		context.beginPath();
		context.moveTo(
				size/2 - this.configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - this.configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.scale(1.0, eyesSize*this.configuration.options.eyeHeightToWidthRatio);
		context.arc(
				size/2 - this.configuration.options.eyeXPositionToSizeRatio*size, 
				(size/2  - this.configuration.options.eyeYPositionToSizeRatio*size)/(eyesSize*this.configuration.options.eyeHeightToWidthRatio), 
				this.configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);
		context.fill();
		context.restore();

		// Right eye
		context.beginPath();
		context.moveTo(
				size/2 + this.configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - this.configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();

		context.save();
		context.scale(1.0, eyesSize*this.configuration.options.eyeHeightToWidthRatio);
		context.arc(
				size/2 + this.configuration.options.eyeXPositionToSizeRatio*size, 
				(size/2 - this.configuration.options.eyeYPositionToSizeRatio*size)/(eyesSize*this.configuration.options.eyeHeightToWidthRatio), 
				this.configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true);
		context.fill();
		context.restore();

		context.stroke();
	}
}

/**
 * Bi-emoticon
 * 
 * @param canvas
 * @param element
 * @param configuration
 * @returns void
 */
function BiEmoticon(canvas, element, configuration) {
	// Variables
	var self = this;
	
	// Attributes
	this.canvas = document.getElementById(canvas);
	this.element = document.getElementById(element);
	this.fuzzy = {};
	this.defaultConfiguration = {
			"fuzzyPartition" : [ {
				"bounds" : [ 0, 0, 15, 50 ],
				"color" : [ 255, 0, 0 ],
				"label" : "U"
			}, {
				"bounds" : [ 15, 50, 55, 90 ],
				"color" : [ 255, 255, 0 ],
				"label" : "N"
			}, {
				"bounds" : [ 55, 90, 100, 100 ],
				"color" : [ 0, 255, 0 ],
				"label" : "S"
			} ],
			"colorPrototypes" : [ {
				"label" : "U",
				"prototype" : [ 255, 0, 0 ]
			}, {
				"label" : "N",
				"prototype" : [ 255, 255, 0 ]
			}, {
				"label" : "S",
				"prototype" : [ 0, 255, 0 ]
			} ],
			"smilePrototypes" : [ {
				"label" : "U",
				"prototype" : -0.5
			}, {
				"label" : "N",
				"prototype" : 0
			}, {
				"label" : "S",
				"prototype" : 1
			} ],
			"options" : {
				"eyeWidthToSizeRatio" : 0.08,
				"eyeHeightToWidthRatio" : 1.5,
				"eyeXPositionToSizeRatio" : 0.2,
				"eyeYPositionToSizeRatio" : 0.1,
				"mouthLengthToSizeRatio": 0.55,
				"mouthYPositionToSizeRatio": 0.2,
				"smileToSizeRatio": 0.2,
				"sliderThumbWidth": 10,
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400
			}
	};
	this.sliderThumbWidth = 0;
	this.leftStartAngle = 0;
	this.leftEndAngle = 2*Math.PI;
    this.rightStartAngle = Math.PI/2;
	this.rightEndAngle = -Math.PI/2;	    			
	this.dashSize = 3;
	this.rightButtonDown = false;
	
	/**
	 * Initializes the bi-emoticon
	 */
	this.initialize = function(userConfiguration) {
		
		// Generates the configuration
		var configuration = new Configuration(this, userConfiguration);	
		
		// Sets the thumb width
		this.sliderThumbWidth = configuration.configuration.options.sliderThumbWidth;
		document.getElementById("slidersStyle").innerHTML = "." + this.element.id + "::-moz-range-thumb {width: " + this.sliderThumbWidth + "%;}";
		document.getElementById("slidersStyle").innerHTML += "." + this.element.id + "::-webkit-slider-thumb {width: " + this.sliderThumbWidth + "%;}";
		document.getElementById("slidersStyle").innerHTML += "." + this.element.id + "::-ms-thumb {width: " + Math.round(this.sliderThumbWidth*this.element.offsetWidth/100) + "px;}";

		// Adds the slider id as an additional class to the slider
		this.element.classList.add(this.element.id);		
			
		// Adds the Eventlistener "wheel" to change the size of the cursor
	    if (this.element.addEventListener) {
	    	this.element.addEventListener("mousewheel", function(event) {self.wheelEventManager(event)}, false); //IE9, Chrome, Safari, Oper
	    	this.element.addEventListener("wheel", function(event) {self.wheelEventManager(event)}, false); //Firefox
	    } else {
	    	this.element.attachEvent("onmousewheel", function(event) {self.wheelEventManager(event)}); //IE 6/7/8
	    }
		
	    // Adds the EventListeners "mousedown" and mouseup
	    this.element.addEventListener("mousedown", function(event) {self.rightButtonDown = true;});
	    this.element.addEventListener("mouseup", function(event) {self.rightButtonDown = false;});
	    
		// Adds the EventListener "click" to visualize left or right side of the bi-emoticon
		this.canvas.addEventListener("click", function() {self.clickEventManager(event)}, false);	
		
		return configuration.configuration;	
	}
	
	// Initializes the emoticon and sets the configuration
	this.configuration = this.initialize(configuration);	

	/**
	 * Renders the bi-emoticon
	 */
	this.render = function() {				
		if (this.canvas.getContext) {
			var x = (100 - this.sliderThumbWidth) * this.element.value/100 + this.sliderThumbWidth/2;			
			this.draw([x - this.sliderThumbWidth/2, x, x, x + this.sliderThumbWidth/2]);
		}
		if (this.fuzzy.canvasFuzzy !== null) {
			this.fuzzy.drawFuzzyPartition();	
		}
	}
	
	/**
	 * Manages the wheel event
	 */	
	this.wheelEventManager = function(event) {
		event.preventDefault();
		if(this.rightButtonDown === true) {
			var style = document.getElementById("slidersStyle");
			if (event.deltaY > 0) {
				if (parseInt(this.element.value) < 100 - this.sliderThumbWidth/2) {
					this.element.value = parseInt(this.element.value) + 1;
					if (this.sliderThumbWidth > 1) { 
						this.sliderThumbWidth -= 1;
					}
				}
			} else {
				this.element.value = parseInt(this.element.value) - 1;
				if (this.sliderThumbWidth < 100) {
					this.sliderThumbWidth +=1;
				}
			}

		  	style.innerHTML = "." + this.element.id + "::-moz-range-thumb {width: " + self.sliderThumbWidth + "%;}";
		  	style.innerHTML += "." + this.element.id + "::-webkit-slider-thumb {width: " + self.sliderThumbWidth + "%;}";
		  	style.innerHTML += "." + this.element.id + "::-ms-thumb {width: " + this.sliderThumbWidth*this.element.offsetWidth/100 + "px;}";	
	  	
		}	
		this.render();
	}
	
	/**
	 * Manages the doubleClick event
	 */
	this.doubleClickEventManager = function() {
		if (self.fuzzy.canvasFuzzy === null) {
			self.fuzzy.drawFuzzyPartition();
		} else {
			self.canvas.parentNode.removeChild(self.fuzzy.canvasFuzzy);
			self.fuzzy.canvasFuzzy = null;
		}
	} 

	/**
	 * Manages the click event
	 */
	this.clickEventManager = function(event) {
		var scrollY = window.scrollY;
		if (typeof scrollY === 'undefined') {
			scrollY = document.documentElement.scrollTop;
		}
		var x = event.pageX - self.canvas.getBoundingClientRect().left;
	    var y = event.pageY - self.canvas.getBoundingClientRect().top - scrollY;
	    var size = this.canvas.width;
	    var distance = (x - size/2)*(x - size/2) + (-y + size/2)*(-y + size/2);

	    if (distance < size*size/4) {
	    	this.leftStartAngle = 0;
	    	this.leftEndAngle = 2*Math.PI;
	        this.rightStartAngle = Math.PI/2;
	    	this.rightEndAngle = -Math.PI/2;	    			
	    	this.dashSize = 3;	    	
	    } else {
	    	if (x < size/2) {
	    		this.leftStartAngle = 0
	    		this.leftEndAngle = 2*Math.PI;
		    	this.rightStartAngle = 0;
			    this.rightEndAngle = 0;	    			
	    		this.dashSize = 0;
	    	} else {
	    		this.leftStartAngle = 0
	    		this.leftEndAngle = 0;
		    	this.rightStartAngle = 0;
			    this.rightEndAngle = 2*Math.PI;	    			
	    		this.dashSize = 0;
	    	}
	    }
    	self.render();
	} 	
	
	/**
	 * Draws the bi-emoticon
	 */
	this.draw = function(x) {		
		var colorLow = [];
		var colorHigh = [];
		var smileLow;
		var smileHigh;
		var size = this.canvas.width;
		var context = this.canvas.getContext('2d');

		// Creates the fuzzy object and set the input
		this.fuzzy = new Fuzzy(this);
		this.fuzzy.fuzzyInput = x;

		// Fuzzifies the value
		var xFuzzy = this.fuzzy.fuzzyLowerDescription(x, this.configuration.fuzzyPartition);	

		// Gets the maximimum grade of membership in the lower description
		var LowerDescriptionMax = 0;
		for (var i =0; i < xFuzzy.length; i++) {
			LowerDescriptionMax = Math.max(LowerDescriptionMax, xFuzzy[i].value);
		}

		// Cuts the fuzzy input at the level 1 - LowerDescriptionMax
		var cut = [x[1] - this.sliderThumbWidth * (1 - LowerDescriptionMax) / 2, x[1] + this.sliderThumbWidth * (1 - LowerDescriptionMax) / 2];

		// Gets the color and the smile for the lower bound
		xFuzzy = this.fuzzy.fuzzyDescription(cut[0], this.configuration.fuzzyPartition);
		colorLow = this.fuzzy.defuzzify(xFuzzy, this.configuration.colorPrototypes);
		smileLow = this.fuzzy.defuzzify(xFuzzy, this.configuration.smilePrototypes);

		// Gets the color and the smile for the upper bound
		xFuzzy = this.fuzzy.fuzzyDescription(cut[1], this.configuration.fuzzyPartition);
		colorHigh = this.fuzzy.defuzzify(xFuzzy, this.configuration.colorPrototypes);
		smileHigh = this.fuzzy.defuzzify(xFuzzy, this.configuration.smilePrototypes);			

		// Left part of the Head
		context.beginPath();		
		context.fillStyle = "rgb(" + Math.round(colorLow[0]) + "," + Math.round(colorLow[1]) + "," + Math.round(colorLow[2]) + ")";
		context.arc(size/2, size/2, size/2, this.leftStartAngle, this.leftEndAngle, false);
		context.fill();	
		context.closePath();

		// Right part of the Head
		context.beginPath();		
		context.fillStyle = "rgb(" + Math.round(colorHigh[0]) + "," + Math.round(colorHigh[1]) + "," + Math.round(colorHigh[2])	+ ")";
		context.arc(size/2, size/2, size/2, this.rightStartAngle, this.rightEndAngle, true);
		context.fill();	
		context.closePath();			

		// Left part lower Mouth
		if (this.leftEndAngle != 0) {		
			context.beginPath();
			context.moveTo(
					size*(1 - this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio)
			);
			context.closePath();
			context.quadraticCurveTo(
					size*(1.2 - this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileLow), 
					size/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileLow)
			);
			context.stroke();
			// Right part lower Mouth
			context.beginPath();
			context.moveTo(
					size/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileLow)
			);	
			context.closePath();
			context.save();
			context.setLineDash([this.dashSize, this.dashSize]);	
			context.quadraticCurveTo(
					size*(0.8 + this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileLow),
					size*(1 + this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio)
			);		
			context.stroke();						
		}
		
		// Left part upper Mouth
		if (this.rightEndAngle != 0) {		
			context.beginPath();
			context.moveTo(
					size*(1 - this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio)
			);
			context.closePath();
			context.quadraticCurveTo(
					size*(1.2 - this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileHigh), 
					size/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileHigh)
			);
			context.stroke();
			// Right part upper Mouth
			context.restore();
			context.beginPath();
			context.moveTo(
					size/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileHigh)
			);	
			context.closePath();
			context.quadraticCurveTo(
					size*(0.8 + this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio + this.configuration.options.smileToSizeRatio * smileHigh),
					size*(1 + this.configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + this.configuration.options.mouthYPositionToSizeRatio)
			);		
			context.stroke();	
		}
		// Left eye
		context.fillStyle = "black";
		context.beginPath();
		context.moveTo(
				size/2 - this.configuration.options.eyeXPositionToSizeRatio*size, 
				size/2  - this.configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.scale(1.0, this.configuration.options.eyeHeightToWidthRatio);
		context.arc(
				size/2 - this.configuration.options.eyeXPositionToSizeRatio*size, 
				(size/2  - this.configuration.options.eyeYPositionToSizeRatio*size)/this.configuration.options.eyeHeightToWidthRatio, 
				this.configuration.options.eyeWidthToSizeRatio*size, 
				0,	Math.PI * 2, true
		);
		context.fill();
		context.restore();

		// Right eye
		context.beginPath();
		context.moveTo(
				size/2 + this.configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - this.configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.scale(1.0, this.configuration.options.eyeHeightToWidthRatio);
		context.arc(
				size/2 + this.configuration.options.eyeXPositionToSizeRatio*size, 
				(size/2 - this.configuration.options.eyeYPositionToSizeRatio*size)/this.configuration.options.eyeHeightToWidthRatio, 
				this.configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);
		context.fill();
		context.restore();

		context.stroke();
	}
}

/**
 * Configuration
 * 
 * @returns void
 */
function Configuration(parentObject, userConfiguration) {	
	// Properties
	this.parentObject = parentObject;
	this.configuration = {};
	
	var self = this;
	
	/**
	 * Checks if data is empty
	 */
	this.empty = function(data) {
		if (typeof (data) == 'number' || typeof (data) == 'boolean') {
			return false;
		}
		if (typeof (data) == 'undefined' || data === null) {
			return true;
		}
		if (typeof (data.length) != 'undefined') {
			return data.length == 0;
		}
		var count = 0;
		for ( var i in data) {
			if (data.hasOwnProperty(i)) {
				count++;
			}
		}
		return count == 0;
	}
	
	/**
	 * Adds event listeners
	 */	
	this.addEventlisteners = function() {
		// Adds the EventListener "load" to render the parent object when page is loaded
		window.addEventListener("load", function() {self.parentObject.render()}, true);
		
		// Adds the EventListener "input" and "change" to render the parent object
		this.parentObject.element.addEventListener("input", function() {self.parentObject.render()}, false);
		this.parentObject.element.addEventListener("change", function() {self.parentObject.render()}, true);
		
		// Adds the EventListener "doubleclick" to draw the partition
		this.parentObject.canvas.addEventListener("dblclick", function() {self.parentObject.doubleClickEventManager()}, false);		
	}
	
	/**
	 * Updates the configuration
	 */
	this.update = function(userConfiguration) {
		// Updates the default configuration
		if (this.empty(userConfiguration)) {
			this.configuration = this.parentObject.defaultConfiguration;
		} else {
			this.configuration = Object.assign({}, this.parentObject.defaultConfiguration, userConfiguration);
			this.configuration.options =  Object.assign({}, this.parentObject.defaultConfiguration.options, userConfiguration.options);
		}
	}	
	
	/**
	 * Defines the polyfills
	 */	
	this.polyfills = function() {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		if (typeof Object.assign != 'function') {
			// Must be writable: true, enumerable: false, configurable: true
			Object.defineProperty(Object, "assign", {
				value: function assign(target, varArgs) { // .length of
					// function is 2
					'use strict';
					if (target == null) { // TypeError if undefined or null
						throw new TypeError('Cannot convert undefined or null to object');
					}

					var to = Object(target);

					for (var index = 1; index < arguments.length; index++) {
						var nextSource = arguments[index];

						if (nextSource != null) { // Skip over if undefined or
							// null
							for (var nextKey in nextSource) {
								// Avoid bugs when hasOwnProperty is shadowed
								if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
									to[nextKey] = nextSource[nextKey];
								}
							}
						}
					}
					return to;
				},
				writable: true,
				configurable: true
			});
		}
		
		// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
		if (!Array.prototype.findIndex) {
		  Object.defineProperty(Array.prototype, 'findIndex', {
		    value: function(predicate) {
		     // 1. Let O be ? ToObject(this value).
		      if (this == null) {
		        throw new TypeError('"this" is null or not defined');
		      }

		      var o = Object(this);

		      // 2. Let len be ? ToLength(? Get(O, "length")).
		      var len = o.length >>> 0;

		      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		      if (typeof predicate !== 'function') {
		        throw new TypeError('predicate must be a function');
		      }

		      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		      var thisArg = arguments[1];

		      // 5. Let k be 0.
		      var k = 0;

		      // 6. Repeat, while k < len
		      while (k < len) {
		        // a. Let Pk be ! ToString(k).
		        // b. Let kValue be ? Get(O, Pk).
		        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
		        // d. If testResult is true, return k.
		        var kValue = o[k];
		        if (predicate.call(thisArg, kValue, k, o)) {
		          return k;
		        }
		        // e. Increase k by 1.
		        k++;
		      }

		      // 7. Return -1.
		      return -1;
		    },
		    configurable: true,
		    writable: true
		  });
		}
	}
	
	// Initializes the configuration
	this.initialize = function(userConfiguration) {
		// Adds the event listeners
		this.addEventlisteners();
		// Updates the configuration
		this.update(userConfiguration);
		// Adds polyfills
		this.polyfills();
	}
	
	this.initialize(userConfiguration);	
}

/**
 * Fuzzy processing
 * 
 * @returns void
 */
function Fuzzy(parentObject) {
	
	this.parentObject = parentObject;
	this.canvasFuzzy = document.getElementById(parentObject.canvas.id + "Fuzzy");
	this.fuzzyInput = null;

	/**
	 * Draws the fuzzy partition
	 */
	this.drawFuzzyPartition = function() {
		var fuzzyPartition = this.parentObject.configuration.fuzzyPartition; 
		
		// Creates the canvas if it does not exist
		if (this.canvasFuzzy === null) {
			this.canvasFuzzy = document.createElement("canvas");
			this.canvasFuzzy.id = this.parentObject.canvas.id + "Fuzzy";
			if (this.parentObject.element.type == "range") {
				this.canvasFuzzy.width = this.parentObject.element.offsetWidth;
			} else {
				this.canvasFuzzy.width = this.parentObject.configuration.options.canvasFuzzyWidth;
			}
			this.canvasFuzzy.height = this.parentObject.configuration.options.canvasFuzzyHeight;			
			this.canvasFuzzy.classList.add("fuzzy");
			this.parentObject.canvas.parentNode.insertBefore(this.canvasFuzzy, this.parentObject.canvas.nextSibling);	
		}
		
		// Finds the lower and upper bounds
		var lowerBound = fuzzyPartition[0].bounds[0];
		var upperBound = fuzzyPartition[0].bounds[3];
		for (var i=1; i < fuzzyPartition.length; i++) {
			if (fuzzyPartition[i].bounds[0] < lowerBound) {
				lowerBound = fuzzyPartition[i].bounds[0];
			}
			if (fuzzyPartition[i].bounds[3] > upperBound) {
				upperBound = fuzzyPartition[i].bounds[3];
			}			
		}
		
		// Draws the the membership functions
		var context = this.canvasFuzzy.getContext("2d");
		var coeff = this.canvasFuzzy.width/(upperBound - lowerBound);
		
		if (this.canvasFuzzy.getContext) {
			context.clearRect(0, 0, this.canvasFuzzy.width, this.canvasFuzzy.height);
			for (var i=0; i < fuzzyPartition.length; i++) {			
				context.save();
				context.beginPath();
				context.strokeStyle = "rgb(" + fuzzyPartition[i].color[0] + "," + fuzzyPartition[i].color[1] + "," + fuzzyPartition[i].color[2]
				+ ")";
				context.moveTo(coeff*(fuzzyPartition[i].bounds[0] - lowerBound), 140);
				context.lineTo(coeff*(fuzzyPartition[i].bounds[1] - lowerBound), 10);
				context.lineTo(coeff*(fuzzyPartition[i].bounds[2] - lowerBound), 10);
				context.lineTo(coeff*(fuzzyPartition[i].bounds[3] - lowerBound), 140);
				context.closePath();
				context.stroke();
				context.restore();
			}	

			// Draws the input
			if (this.fuzzyInput !== null) {
				context.save();
				context.beginPath();
				context.setLineDash([3, 3]);
				if (Array.isArray(this.fuzzyInput)) {			
					context.moveTo(coeff*(this.fuzzyInput[0] - lowerBound), 140);
					context.lineTo(coeff*(this.fuzzyInput[1] - lowerBound), 10);
					context.lineTo(coeff*(this.fuzzyInput[3] - lowerBound), 140);
				} else {
					context.moveTo(coeff*(this.fuzzyInput - lowerBound), 140);
					context.lineTo(coeff*(this.fuzzyInput - lowerBound), 10);
				}
				context.stroke();
				context.restore();
			}
		}

	}

	/**
	 * Computes the linguistic fuzzy description (linguistic fuzzification) of
	 * the precise input x
	 */
	this.fuzzyDescription = function(x, membershipFunctions) {
		var result = [];
		for (i = 0; i < membershipFunctions.length; i++) {
			result[i] = {
				"value" : this.gradeOfMembership(membershipFunctions[i], x),
				"label" : membershipFunctions[i].label
			};
		}
		return result;
	}

	/**
	 * Computes the linguistic lower description of the trapezoidal input x
	 */
	this.fuzzyLowerDescription = function(x, membershipFunctions) {	
		var result = [];
		for (i = 0; i < membershipFunctions.length; i++) {
			result[i] = {
				"value" : this.gradeOfMembershipTrapezoidalInput(membershipFunctions[i], x),
				"label" : membershipFunctions[i].label
			};
		}
		return result;
	}	

	/**
	 * Returns the grade of membership for the given membership function and for
	 * the trapezoidal input x
	 */	
	this.gradeOfMembershipTrapezoidalInput = function(membershipFunction, x) {
		var g1  = x[0];
		var mg1 = x[1];
		var md1 = x[2];
		var d1  = x[3];
		var result = 1;
		var u;

		g2  = membershipFunction.bounds[0];
		mg2 = membershipFunction.bounds[1];
		md2 = membershipFunction.bounds[2];
		d2  = membershipFunction.bounds[3];

		// The input is crisp
		if (g1 == mg1 && g1 == md1 && g1 == d1)
			return(this.gradeOfMembership(membershipFunction, g1));

		var result = 1.0;

		// + = Inscreasing part of the membership function
		// - = Decreasing part of the membership function

		// The kernel of the input does not intersect the support of the
		// meaning : necessity = 0
		if (mg1 > d2 || md1 < g2) {
			return 0;
		}
		
		// The support of the input is included in the kernel of the meaning
		// : necessity = 1
		if (mg2 <= g1 && d1 <= md2) {
			return 1.0;
		}

		// Intersection Input+ Signification+
		if (mg2 == g2) {
			if (g1 <= mg2 && mg2 <= mg1) {
				result = Math.min(result, (g2 - mg1) / (mg1 - g1));
			}
		} else {	    
			if (mg1 == g1) {
				u = g1;
			} else {
				u = ((mg2 - g2) * mg1 + (mg1 - g1) * g2) / ((mg2 - g2) + (mg1 - g1));
			}
			if (g2 <= u && u <= mg2) {
				result = Math.min(result, (u - g2) / (mg2 - g2));
			}
		}

		// Intersection Input+ Signification-
		if (md2 == d2) {
			if (g1 <= md2 && md2 <= mg1) {
				result = Math.min(result, (d2 - mg1) / (mg1 - g1));
			}
		} else {
			if (mg1 == g1) {
				u = g1;
			} else {     
				u = ((md2 - d2) * mg1 + (mg1 - g1) * d2) / ((md2 - d2) + (mg1 - g1));
			}
			if ((md2 - d2) + (mg1 - g1) == 0) { // co-linearity
				if (g1 == md2 && mg1 == d2) { // Segments are identical
					return 0;
				}
			} else {
				if (md2 <= u && u <= d2) {
					result = Math.min(result, (u - d2) / (md2 - d2));
				}
			}
		}

		// Intersection Input- Signification+
		if (mg2 == g2) {
			if (md1 <= mg2 && mg2 <= d1) {
				result = Math.min(result, (g2 - md1) / (d1 - md1));
			}
		} else {
			if (md1 == d1) {
				u = d1;
			} else {
				u = ((mg2 - g2) * md1 + (md1 - d1) * g2) / ((mg2 - g2) + (md1 - d1));
			}
			if ((mg2 - g2) + (md1 - d1) == 0) { // co-linearity
				if (g2 == md1 && mg2 == d1) {// Segments are identical
					return 0;
				}
			} else {
				if (g2 <= u && u <= mg2) {
					result = Math.min(result, (u - g2) / (mg2 - g2));
				}
			}
		}

		// Intersection Input- Signification-
		if (md2 == d2) {
			if (md1 <= md2 && md2 <= d1) {
				result = Math.min(result, (d2 - md1) / (d1 - md1));
			}
		} else {
			if (md1 == d1) {
				u = d1;
			} else {
				u = ((md2 - d2) * md1 + (md1 - d1) * d2) / ((md2 - d2) + (md1 - d1));
			}
			if (md2 < u && u <= d2) {
				result = Math.min(result, (u - d2) / (md2 - d2));
			}
		}

		return result;		
	}
	
	/**
	 * Returns the grade of membership for the given membership function as
	 * point x
	 */
	this.gradeOfMembership = function(membershipFunction, x) {
		if (x < membershipFunction.bounds[0]) {
			return 0;
		} else if (x < membershipFunction.bounds[1]) {
			return (x - membershipFunction.bounds[0])
					/ (membershipFunction.bounds[1] - membershipFunction.bounds[0]);
		} else if (x < membershipFunction.bounds[2]) {
			return 1.0;
		} else if (x < membershipFunction.bounds[3]) {
			return (membershipFunction.bounds[3] - x)
					/ (membershipFunction.bounds[3] - membershipFunction.bounds[2]);
		} else if (membershipFunction.bounds[2] == membershipFunction.bounds[3]) {
			return 1.0;
		} else {
			return 0;
		}
	}

	/**
	 * Defuzzifies the linguitic fuzzy set x with the prototypes
	 */
	this.defuzzify = function(x, prototypes) {
		var k;
		var numerator = [];
		var denominator = [];
		var result = [];

		// Initializes numerators and denominators
		if (Array.isArray(prototypes[0].prototype)) {
			for (j = 0; j < prototypes[0].prototype.length; j++) {
				numerator[j] = 0;
				denominator[j] = 0;
			}
		} else {
			numerator[0] = 0;
			denominator[0] = 0;
		}

		// Computes numerators and denominators
		for (i = 0; i < x.length; i++) {
			k = prototypes.findIndex(this.checkLabel, x[i]);
			if (Array.isArray(prototypes[k].prototype)) {
				for (j = 0; j < prototypes[0].prototype.length; j++) {
					numerator[j] = numerator[j] + x[i].value
							* prototypes[k].prototype[j];
					denominator[j] = denominator[j] + x[i].value;
				}
			} else {
				numerator[0] = numerator[0] + x[i].value
						* prototypes[k].prototype;
				denominator[0] = denominator[0] + x[i].value;
			}
		}

		// Finalizes the results
		if (Array.isArray(prototypes[0].prototype)) {
			for (j = 0; j < prototypes[0].prototype.length; j++) {
				result[j] = numerator[j] / denominator[j];
			}
			return result;
		} else {
			result[0] = numerator[0] / denominator[0];
			return result[0];
		}
	}

	this.checkLabel = function(object) {
		return object.label == this.label;
	}
}
