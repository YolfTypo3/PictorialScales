/**
 * PictorialScales.js
 * 
 * Version: 2.2.0
 *
 * Copyright 2020 Laurent Foulloy
 */
const OPEN_LEFT_MEMBERSHIP_FUNCTION = 0;
const OPEN_RIGHT_MEMBERSHIP_FUNCTION = 1;
const TRAPEZOIDAL_MEMBERSHIP_FUNCTION = 2;

const UNIFORM_DISTRIBUTION = 0;
const NORMAL_DISTRIBUTION = 1;

/**
 * Arrow
 * 
 * @param canvas
 * @param element
 * @param configuration
 * @returns void
 */
function Arrow(canvas, element, configuration) {
	// Attributes
	this.canvas = document.getElementById(canvas);
	if (Array.isArray(element)) {
		this.element = document.getElementById(element[0]);
		this.support = document.getElementById(element[1]);
	} else {
		this.element = document.getElementById(element);
		this.support = false;
	}
	this.defaultConfiguration = {
			"fuzzyPartition": [ {
				"type": OPEN_LEFT_MEMBERSHIP_FUNCTION,
				"bounds": [ 0, 0, 15, 50 ],
				"color": [ 255, 0, 0 ],
				"label": "U"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 15, 50, 55, 90 ],
				"color": [ 255, 255, 0 ],
				"label": "N"
			}, {
				"type": OPEN_RIGHT_MEMBERSHIP_FUNCTION,
				"bounds": [ 55, 90, 100, 100],
				"color": [ 0, 255, 0 ],
				"label": "S"
			} ],
			"colorPrototypes": [ {
				"label": "U",
				"prototype": [ 255, 0, 0 ]
			}, {
				"label": "N",
				"prototype": [ 255, 255, 0 ]
			}, {
				"label": "S",
				"prototype": [ 0, 255, 0 ]
			} ],		
			"anglePrototypes": [ {
				"label": "U",
				"prototype": -40
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "S",
				"prototype": 40
			} ],				
			"options": {
				"impreciseInput": false,
				"arrowThickness": 12,
				"arrowLength": 95,
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400
			}
	};

	// Sets the configuration manager
	this.configurationManager = new ConfigurationManager(this, configuration);
		
	/**
	 * Draws the arrow for the linguistic fuzzy input xFuzzy
	 */
	this.draw = function(xFuzzy, canvas) {
		var size = canvas.width;
		var context = canvas.getContext("2d");
		var configuration = this.configurationManager.configuration;

		// Gets the color and the smile
		var color = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.colorPrototypes);
		var angle = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.anglePrototypes);		
			
		// Clears the canvas
		context.clearRect(0, 0, size, size);
		
		// Draws the arrow
		var arrowLength = configuration.options.arrowLength;
		var arrowThickness = configuration.options.arrowThickness;
		var u = arrowThickness;
		var v = size/2;
		var theta = -angle * Math.PI / 180;
		
		context.beginPath();
		context.save();
		context.rotate(theta);
		context.translate(v*Math.sin(theta) + u*Math.cos(theta), v*Math.cos(theta) - u*Math.sin(theta) - size/2);
		context.fillStyle = "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
		context.moveTo(u, v);
		context.lineTo(u, v - configuration.options.arrowThickness);
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
	// Attributes
	this.canvas = document.getElementById(canvas);
	if (Array.isArray(element)) {
		this.element = document.getElementById(element[0]);
		this.support = document.getElementById(element[1]);
	} else {
		this.element = document.getElementById(element);
		this.support = false;
	}
	this.defaultConfiguration = {		
			"fuzzyPartition": [ {
				"type": OPEN_LEFT_MEMBERSHIP_FUNCTION,
				"bounds": [0, 0, 0, 25 ],
				"color": [ 255, 0, 0 ],
				"label": "VL"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 0, 25, 25, 50 ],
				"color": [ 255, 128, 0 ],
				"label": "L"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 25, 50, 50, 75 ],
				"color": [ 255, 255, 0 ],
				"label": "N"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 50, 75, 75, 100 ],
				"color": [ 128, 255, 0 ],
				"label": "R"		
			}, {
				"type": OPEN_RIGHT_MEMBERSHIP_FUNCTION,
				"bounds": [ 75, 100, 100, 100],
				"color": [ 0, 255, 0 ],
				"label": "VR"					
			} ],
			"sunSizePrototypes": [ {
				"label": "VL",
				"prototype": 0
			}, {
				"label": "L",
				"prototype": 0
			}, {
				"label": "N",
				"prototype": 30
			}, {
				"label": "R",
				"prototype": 35
			}, {
				"label": "VR",
				"prototype": 40		
			} ],
			"sunPositionPrototypes": [ {
				"label": "VL",
				"prototype": [0, 0]
			}, {
				"label": "L",
				"prototype": [0, 0]
			}, {
				"label": "N",
				"prototype": [0, 0]
			}, {
				"label": "R",
				"prototype": [0, 0]
			}, {
				"label": "VR",
				"prototype": [0, 0]			
			} ],
			"sunColorPrototypes": [ {
				"label": "VL",
				"prototype": [ 255, 255, 255 ]
			}, {
				"label": "L",
				"prototype": [ 255, 128, 0 ]
			}, {
				"label": "N",
				"prototype": [ 204, 204, 0 ]
			}, {
				"label": "R",
				"prototype": [ 230, 230, 0 ]
			}, {
				"label": "VR",
				"prototype": [ 255, 255, 0 ]			
			} ],	
			"sunraySizePrototypes": [ {
				"label": "VL",
				"prototype": 0
			}, {
				"label": "L",
				"prototype": 0
			}, {
				"label": "N",
				"prototype": 0.8
			}, {
				"label": "R",
				"prototype": 1.0
			}, {
				"label": "VR",
				"prototype": 1.3				
			} ],			
			"cloudSizePrototypes": [ {
				"label": "VL",
				"prototype": 1.3
			}, {
				"label": "L",
				"prototype": 1
			}, {
				"label": "N",
				"prototype": 0.8
			}, {
				"label": "R",
				"prototype": 0
			}, {
				"label": "VR",
				"prototype": 0				
			} ],
			"cloudPositionPrototypes": [ {
				"label": "VL",
				"prototype": [-50, 0]
			}, {
				"label": "L",
				"prototype": [-15, 0]
			}, {
				"label": "N",
				"prototype": [0, 0]
			}, {
				"label": "R",
				"prototype": [5, 0]
			}, {
				"label": "VR",
				"prototype": [5, 0]			
			} ],
			"cloudColorPrototypes": [ {
				"label": "VL",
				"prototype": [ 25, 25, 25 ]
			}, {
				"label": "L",
				"prototype": [ 127, 127, 127 ]
			}, {
				"label": "N",
				"prototype": [ 192, 192, 192 ]
			}, {
				"label": "R",
				"prototype": [ 255, 255, 255 ]
			}, {
				"label": "VR",
				"prototype": [ 255, 255, 255 ]			
			} ],
			"rainLevelPrototypes": [ {
				"label": "VL",
				"prototype": 10
			}, {
				"label": "L",
				"prototype": 7
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "R",
				"prototype": 0
			}, {
				"label": "VR",
				"prototype": 0				
			} ],			
			"options": {
				"impreciseInput": false,
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400				
			}
	};

	// Sets the configuration manager
	this.configurationManager = new ConfigurationManager(this, configuration);
		
	/**
	 * Draws the sun/cloud for the linguistic fuzzy input xFuzzy
	 */
	this.draw = function(xFuzzy, canvas) {
		var size = canvas.width;
		var context = canvas.getContext("2d");
		var configuration = this.configurationManager.configuration;

		// Gets the color and the smile
		var sunSize = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.sunSizePrototypes);
		var sunPosition = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.sunPositionPrototypes);
		var sunColor = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.sunColorPrototypes);
		var sunraySize = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.sunraySizePrototypes);
		var cloudSize = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.cloudSizePrototypes);
		var cloudPosition = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.cloudPositionPrototypes);
		var cloudColor = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.cloudColorPrototypes);
		var rainLevel = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.rainLevelPrototypes);
		
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
	// Attributes
	this.canvas = document.getElementById(canvas);
	if (Array.isArray(element)) {
		this.element = document.getElementById(element[0]);
		this.support = document.getElementById(element[1]);
	} else {
		this.element = document.getElementById(element);
		this.support = false;
	}
	this.defaultConfiguration = {
			"fuzzyPartition": [ {
				"type": OPEN_LEFT_MEMBERSHIP_FUNCTION,
				"bounds": [  0, 0, 15, 50 ],
				"color": [ 255, 0, 0 ],
				"label": "U"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 15, 50, 55, 90 ],
				"color": [ 255, 255, 0 ],
				"label": "N"
			}, {
				"type": OPEN_RIGHT_MEMBERSHIP_FUNCTION,
				"bounds": [ 55, 90, 100, 100 ],
				"color": [ 0, 255, 0 ],
				"label": "S"
			} ],
			"colorPrototypes": [ {
				"label": "U",
				"prototype": [ 255, 0, 0 ]
			}, {
				"label": "N",
				"prototype": [ 255, 255, 0 ]
			}, {
				"label": "S",
				"prototype": [ 0, 255, 0 ]
			} ],	
			"gradientPrototypes": [ {
				"label": "U",
				"prototype": 0
			}, {
				"label": "N",
				"prototype": 0.3*this.canvas.height
			}, {
				"label": "S",
				"prototype": 0.9*this.canvas.height
			} ],				
			"smilePrototypes": [ {
				"label": "U",
				"prototype": -0.5
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "S",
				"prototype": 1
			} ],
			"secondSmilePrototypes": [ {
				"label": "U",
				"prototype": -0.5
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "S",
				"prototype": 1
			} ],			
			"eyesSizePrototypes": [ {
				"label": "U",
				"prototype": 1
			}, {
				"label": "N",
				"prototype": 1
			}, {
				"label": "S",
				"prototype": 1
			} ],	
			"eyebrowsPrototypes": [ {
				"label": "U",
				"prototype": 0.33
			}, {
				"label": "N",
				"prototype": 0.35
			}, {
				"label": "S",
				"prototype": 0.38
			} ],				
			"options": {
				"impreciseInput": false,
				"eyeWidthToSizeRatio": 0.08,
				"eyeHeightToWidthRatio": 1.5,
				"eyeXPositionToSizeRatio": 0.2,
				"eyeYPositionToSizeRatio": 0.1,
				"eyesFillColor": "black",
				"eyesSizeScaled": false,
				"eyebrows": false,
				"leftEyeBrowLeftYPositionToSizeRatio": 0.25,
				"leftEyeBrowRightYPositionToSizeRatio": 0.3,
				"mouthLengthToSizeRatio": 0.55,
				"mouthYPositionToSizeRatio": 0.2,
				"mouthFill": false,
				"mouthFillColor": "black",
				"smileToSizeRatio": 0.3,
				"secondSmile": false,
				"smileCurve": "quadratic",
				"secondSmileCurve": "quadratic",
				"gradient": false,
				"gradientColorBegin": "#0752DE",
				"gradientColorEnd": "yellow",
				"canvasFuzzyHeight": 150,
				"canvasFuzzyWidth": 400,
				"nanColor": [116, 208, 241],
				"nanSmile": 0,
				"nanEyesSize": 1
			}
	};

	// Sets the configuration manager and the configuration
	this.configurationManager = new ConfigurationManager(this, configuration);
	
	/**
	 * Draws the emoticon for the linguistic fuzzy input xFuzzy
	 */
	this.draw = function(xFuzzy, canvas) {
		var size = canvas.width;
		var context = canvas.getContext("2d");
		var configuration = this.configurationManager.configuration;

		// Gets the color and the smile
		if (this.element.value == 'nan') {
			var color = configuration.options.nanColor;
			var smile = configuration.options.nanSmile;
			var eyesSize = configuration.options.nanEyesSize;
			
		} else {
			var color = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.colorPrototypes);
			var smile = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.smilePrototypes);
			if (configuration.eyesSizePrototypes.length == 0) {
				var eyesSize = 1;
			} else {
				var eyesSize = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.eyesSizePrototypes);
			}
		}
		
		// Other configurations
		if (configuration.options.secondSmile) {
			var secondSmile = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.secondSmilePrototypes);
		}
		if (configuration.options.gradient) {
			var gradientValue = this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.gradientPrototypes); 
			// Sets the gradient
			var gradient = context.createLinearGradient(0, 0, 0, gradientValue);
			gradient.addColorStop(0, configuration.options.gradientColorBegin);	
			gradient.addColorStop(1, configuration.options.gradientColorEnd);		
		}		
		if (configuration.options.eyebrows) {
			var eyebrows =  this.configurationManager.fuzzy.defuzzify(xFuzzy, configuration.eyebrowsPrototypes); 
		}
		
		// Head
		context.beginPath();		
		context.fillStyle = "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
		if (configuration.options.gradient && gradientValue > 0) {
			context.fillStyle = gradient;
		}
		context.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
		context.fill();	
		context.closePath();

		// Mouth
		// First smile
		context.beginPath();
		context.moveTo(
				size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
				size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
		);
		if (configuration.options.smileCurve == "cubic") {
			context.bezierCurveTo(
					size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smile), 
					size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smile), 
					size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);		
		} else {
			context.quadraticCurveTo(
					size/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smile), 
					size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);		
		}		
		// Fills the mouth with a given color if required
		if (configuration.options.mouthFill) {
			context.fillStyle = configuration.options.mouthFillColor;	
		}
		context.fill();	
		context.stroke();
		context.closePath();
		
		// Second smile
		if (configuration.options.secondSmile) {
			context.beginPath();
			context.moveTo(
					size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);
			if (configuration.options.secondSmileCurve == "cubic") {
				context.bezierCurveTo(
						size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmile), 
						size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmile), 
						size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);						
			} else {
				context.quadraticCurveTo(
						size/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmile), 
						size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);				
			}
			// Fills the mouth with a given color if required
			if (configuration.options.mouthFill) {
				context.fillStyle = configuration.options.mouthFillColor;			
			}
			context.fill();		
			context.stroke();
			context.closePath();
		}

		// Eyebrows
		if (configuration.options.eyebrows) {		
			// Left eyebrow
			context.save();
			context.beginPath();
			context.lineWidth = 2;
			context.moveTo(
					size/2 - (configuration.options.eyeXPositionToSizeRatio + configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowLeftYPositionToSizeRatio*size
			);

			context.quadraticCurveTo(
					size/2 - configuration.options.eyeXPositionToSizeRatio*size, 
					size/2 - eyebrows*size, 
					size/2 - (configuration.options.eyeXPositionToSizeRatio - configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowRightYPositionToSizeRatio*size
			);	
			context.stroke();
			context.closePath();	
			
			// Right eyebrow
			context.beginPath();
			context.moveTo(
					size/2 + (configuration.options.eyeXPositionToSizeRatio + configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowLeftYPositionToSizeRatio*size
			);
			context.quadraticCurveTo(
					size/2 + configuration.options.eyeXPositionToSizeRatio*size, 
					size/2 - eyebrows*size, 
					size/2 + (configuration.options.eyeXPositionToSizeRatio - configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowRightYPositionToSizeRatio*size
			);	
			context.stroke();
			context.closePath();
			context.restore();
		}
		
		// Left eye
		context.beginPath();
		context.moveTo(
				size/2 - configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.fillStyle = configuration.options.eyesFillColor;
		scaleWidth = 1.0;
		scaleHeight = eyesSize*configuration.options.eyeHeightToWidthRatio;
		if (configuration.options.eyesSizeScaled) {
			scaleWidth = eyesSize;
		}
		context.scale(scaleWidth, scaleHeight);
		context.arc(
				(size/2 - configuration.options.eyeXPositionToSizeRatio*size)/scaleWidth, 
				(size/2  - configuration.options.eyeYPositionToSizeRatio*size)/scaleHeight, 
				configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);
		context.fill();		
		context.restore();

		// Right eye
		context.beginPath();
		context.moveTo(
				size/2 + configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.fillStyle = configuration.options.eyesFillColor;
		scaleWidth = 1.0;
		scaleHeight = eyesSize*configuration.options.eyeHeightToWidthRatio;
		if (configuration.options.eyesSizeScaled) {
			scaleWidth = eyesSize;
		}
		context.scale(scaleWidth, scaleHeight);
		context.arc(
				(size/2 + configuration.options.eyeXPositionToSizeRatio*size)/scaleWidth, 
				(size/2  - configuration.options.eyeYPositionToSizeRatio*size)/scaleHeight, 
				configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);		
		context.fill();
		context.restore();
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
	// Attributes
	this.canvas = document.getElementById(canvas);
	if (Array.isArray(element)) {
		this.element = document.getElementById(element[0]);
		this.support = document.getElementById(element[1]);
	} else {
		this.element = document.getElementById(element);
		this.support = false;
	}
	this.defaultConfiguration = {
			"fuzzyPartition": [ {
				"type": OPEN_LEFT_MEMBERSHIP_FUNCTION,				
				"bounds": [ 0, 0, 15, 50 ],
				"color": [ 255, 0, 0 ],
				"label": "U"
			}, {
				"type": TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
				"bounds": [ 15, 50, 55, 90 ],
				"color": [ 255, 255, 0 ],
				"label": "N"
			}, {
				"type": OPEN_RIGHT_MEMBERSHIP_FUNCTION,
				"bounds": [ 55, 90, 100, 100 ],
				"color": [ 0, 255, 0 ],
				"label": "S"
			} ],
			"colorPrototypes": [ {
				"label": "U",
				"prototype": [ 255, 0, 0 ]
			}, {
				"label": "N",
				"prototype": [ 255, 255, 0 ]
			}, {
				"label": "S",
				"prototype": [ 0, 255, 0 ]
			} ],
			"gradientPrototypes": [ {
				"label": "U",
				"prototype": 0
			}, {
				"label": "N",
				"prototype": 0.3*this.canvas.height
			}, {
				"label": "S",
				"prototype": 0.9*this.canvas.height
			} ],				
			"smilePrototypes": [ {
				"label": "U",
				"prototype": -0.5
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "S",
				"prototype": 1
			} ],
			"secondSmilePrototypes": [ {
				"label": "U",
				"prototype": -0.5
			}, {
				"label": "N",
				"prototype": 0
			}, {
				"label": "S",
				"prototype": 1
			} ],						
			"eyesSizePrototypes": [ {
				"label": "U",
				"prototype": 1
			}, {
				"label": "N",
				"prototype": 1
			}, {
				"label": "S",
				"prototype": 1
			} ],	
			"eyebrowsPrototypes": [ {
				"label": "U",
				"prototype": 0.33
			}, {
				"label": "N",
				"prototype": 0.35
			}, {
				"label": "S",
				"prototype": 0.38
			} ],
			"options": {
				"impreciseInput": false,
				"impreciseInputDistribution": UNIFORM_DISTRIBUTION, 
				"eyeWidthToSizeRatio": 0.08,
				"eyeHeightToWidthRatio": 1.5,
				"eyeXPositionToSizeRatio": 0.2,
				"eyeYPositionToSizeRatio": 0.1,
				"eyesFillColor": "black",
				"eyesSizeScaled": false,
				"eyebrows": false,
				"leftEyeBrowLeftYPositionToSizeRatio": 0.25,
				"leftEyeBrowRightYPositionToSizeRatio": 0.3,				
				"mouthLengthToSizeRatio": 0.55,
				"mouthYPositionToSizeRatio": 0.2,
				"smileToSizeRatio": 0.2,
				"secondSmile": false,
				"gradient": false,
				"gradientColorBegin": "#0752DE",
				"gradientColorEnd": "yellow",				
				"sliderThumbWidth": 10,
				"canvasFuzzyHeight": 160,
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
	
	// Sets the configuration manager and the configuration
	this.configurationManager = new ConfigurationManager(this, configuration);
		
	/**
	 * Renders the bi-emoticon
	 */
	this.render = function() {			
		var xFuzzy = this.configurationManager.fuzzy.fuzzyInputProcessing();
		this.draw(xFuzzy, this.canvas);

		if (this.configurationManager.fuzzy.canvasFuzzy !== null) {
			this.configurationManager.fuzzy.drawFuzzyPartition();
		}
	}
	
	/**
	 * Draws the bi-emoticon for the linguistic fuzzy input xFuzzy
	 */
	this.draw = function(xFuzzy) {		
		var size = this.canvas.width;
		var context = this.canvas.getContext('2d');
		var configuration = this.configurationManager.configuration;
	
		// Gets the color and the smile for the lower bound
		var colorLower = this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.colorPrototypes);
		var smileLower = this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.smilePrototypes);
		if (configuration.eyesSizePrototypes.length == 0) {
			var eyesSizeLower = 1;
		} else {
			var eyesSizeLower = this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.eyesSizePrototypes);
		}		
		
		// Gets the color and the smile for the upper bound
		var colorUpper = this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.colorPrototypes);
		var smileUpper = this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.smilePrototypes);
		if (configuration.eyesSizePrototypes.length == 0) {
			var eyesSizeUpper = 1;
		} else {
			var eyesSizeUpper = this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.eyesSizePrototypes);
		}			

		// Other configurations
		if (configuration.options.secondSmile) {
			var secondSmileLower = this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.secondSmilePrototypes);
			var secondSmileUpper = this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.secondSmilePrototypes);
		}
		if (configuration.options.gradient) {
			var gradientValueLower = this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.gradientPrototypes); 
			var gradientValueUpper = this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.gradientPrototypes); 

			// Sets the gradient
			var gradientLower = context.createLinearGradient(0, 0, 0, gradientValueLower);
			gradientLower.addColorStop(0, configuration.options.gradientColorBegin);	
			gradientLower.addColorStop(1, configuration.options.gradientColorEnd);
			var gradientUpper = context.createLinearGradient(0, 0, 0, gradientValueUpper);
			gradientUpper.addColorStop(0, configuration.options.gradientColorBegin);	
			gradientUpper.addColorStop(1, configuration.options.gradientColorEnd);			
		}		
		if (configuration.options.eyebrows) {
			var eyebrowsLower =  this.configurationManager.fuzzy.defuzzify(xFuzzy[0], configuration.eyebrowsPrototypes); 
			var eyebrowsUpper =  this.configurationManager.fuzzy.defuzzify(xFuzzy[1], configuration.eyebrowsPrototypes); 		
		}
		
		// Left part of the Head
		context.beginPath();	
		context.fillStyle = "rgb(" + Math.round(colorLower[0]) + "," + Math.round(colorLower[1]) + "," + Math.round(colorLower[2]) + ")";
		if (configuration.options.gradient && gradientValueLower > 0) {
			context.fillStyle = gradientLower;
		}
		context.arc(size/2, size/2, size/2, this.leftStartAngle, this.leftEndAngle, false);
		context.fill();	
		context.closePath();

		// Right part of the Head
		context.beginPath();		
		context.fillStyle = "rgb(" + Math.round(colorUpper[0]) + "," + Math.round(colorUpper[1]) + "," + Math.round(colorUpper[2])	+ ")";
		if (configuration.options.gradient && gradientValueUpper> 0) {
			context.fillStyle = gradientUpper;
		}
		context.arc(size/2, size/2, size/2, this.rightStartAngle, this.rightEndAngle, true);
		context.fill();	
		context.closePath();			

		// Mouth	
		// Left part lower Mouth
		if (this.leftEndAngle != 0) {		
			context.beginPath();
			context.moveTo(
					size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);
			context.closePath();
			context.quadraticCurveTo(
					size*(1.2 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileLower), 
					size/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileLower)
			);
			context.stroke();
			// Right part lower Mouth
			context.beginPath();
			context.moveTo(
					size/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileLower)
			);	
			context.closePath();
			context.save();
			context.setLineDash([this.dashSize, this.dashSize]);	
			context.quadraticCurveTo(
					size*(0.8 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileLower),
					size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);		
			context.stroke();
			
			// Second smile
			if (configuration.options.secondSmile) {
				context.beginPath();
				context.moveTo(
						size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);
				context.closePath();
				context.quadraticCurveTo(
						size*(1.2 - configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileLower), 
						size/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileLower)
				);
				context.stroke();
				// Right part lower Mouth
				context.beginPath();
				context.moveTo(
						size/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileLower)
				);	
				context.closePath();
				context.save();
				context.setLineDash([this.dashSize, this.dashSize]);	
				context.quadraticCurveTo(
						size*(0.8 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileLower),
						size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);		
				context.stroke();	
				context.restore();
			}			
		}
		
		// Left part upper Mouth
		if (this.rightEndAngle != 0) {		
			context.beginPath();
			context.moveTo(
					size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);
			context.closePath();
			context.quadraticCurveTo(
					size*(1.2 - configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileUpper), 
					size/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileUpper)
			);
			context.stroke();
			// Right part upper Mouth
			context.restore();
			context.beginPath();
			context.moveTo(
					size/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileUpper)
			);	
			context.closePath();
			context.quadraticCurveTo(
					size*(0.8 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * smileUpper),
					size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
					size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
			);		
			context.stroke();
			
			// Second smile
			if (configuration.options.secondSmile) {
				context.beginPath();
				context.moveTo(
						size*(1 - configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);
				context.closePath();
				context.quadraticCurveTo(
						size*(1.2 - configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileUpper), 
						size/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileUpper)
				);
				context.stroke();
				// Right part upper Mouth
				context.restore();
				context.beginPath();
				context.moveTo(
						size/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileUpper)
				);	
				context.closePath();
				context.quadraticCurveTo(
						size*(0.8 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio + configuration.options.smileToSizeRatio * secondSmileUpper),
						size*(1 + configuration.options.mouthLengthToSizeRatio)/2, 
						size*(1/2 + configuration.options.mouthYPositionToSizeRatio)
				);		
				context.stroke();
				context.restore();
			}			
		}
		
		// Eyebrows
		if (this.leftEndAngle == 0) {	
			eyebrowsLower = eyebrowsUpper;
		}
		if (this.rightEndAngle == 0) {	
			eyebrowsUpper = eyebrowsLower;
		}
		if (configuration.options.eyebrows) {		
			// Left eyebrow
			context.save();
			context.beginPath();
			context.lineWidth = 2;
			context.moveTo(
					size/2 - (configuration.options.eyeXPositionToSizeRatio + configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowLeftYPositionToSizeRatio*size
			);

			context.quadraticCurveTo(
					size/2 - configuration.options.eyeXPositionToSizeRatio*size, 
					size/2 - eyebrowsLower*size, 
					size/2 - (configuration.options.eyeXPositionToSizeRatio - configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowRightYPositionToSizeRatio*size
			);	
			context.stroke();
			context.closePath();	
			
			// Right eyebrow
			context.beginPath();
			context.moveTo(
					size/2 + (configuration.options.eyeXPositionToSizeRatio + configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowLeftYPositionToSizeRatio*size
			);
			context.quadraticCurveTo(
					size/2 + configuration.options.eyeXPositionToSizeRatio*size, 
					size/2 - eyebrowsUpper*size, 
					size/2 + (configuration.options.eyeXPositionToSizeRatio - configuration.options.eyeWidthToSizeRatio)*size, 
					size/2 - configuration.options.leftEyeBrowRightYPositionToSizeRatio*size
			);	
			context.stroke();
			context.closePath();
			context.restore();
		}
		
		// Eyes
		if (this.leftEndAngle == 0) {	
			eyesSizeLower = eyesSizeUpper;
		}
		if (this.rightEndAngle == 0) {	
			eyesSizeUpper = eyesSizeLower;
		}
		// Left eye
		context.beginPath();
		context.moveTo(
				size/2 - configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.fillStyle = configuration.options.eyesFillColor;		
		scaleWidth = 1.0;
		scaleHeight = eyesSizeLower*configuration.options.eyeHeightToWidthRatio;
		if (configuration.options.eyesSizeScaled) {
			scaleWidth = eyesSizeLower;
		}
		context.scale(scaleWidth, scaleHeight);
		context.arc(
				(size/2 - configuration.options.eyeXPositionToSizeRatio*size)/scaleWidth, 
				(size/2  - configuration.options.eyeYPositionToSizeRatio*size)/scaleHeight, 
				configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);
		context.fill();		
		context.restore();		
		// Right eye
		context.beginPath();
		context.moveTo(
				size/2 + configuration.options.eyeXPositionToSizeRatio*size, 
				size/2 - configuration.options.eyeYPositionToSizeRatio*size
		);
		context.closePath();
		context.save();
		context.fillStyle = configuration.options.eyesFillColor;
		scaleWidth = 1.0;
		scaleHeight = eyesSizeUpper*configuration.options.eyeHeightToWidthRatio;
		if (configuration.options.eyesSizeScaled) {
			scaleWidth = eyesSizeUpper;
		}
		context.scale(scaleWidth, scaleHeight);
		context.arc(
				(size/2 + configuration.options.eyeXPositionToSizeRatio*size)/scaleWidth, 
				(size/2  - configuration.options.eyeYPositionToSizeRatio*size)/scaleHeight, 
				configuration.options.eyeWidthToSizeRatio*size, 
				0, Math.PI * 2, true
		);		
		context.fill();
		context.restore();
	}
}

/**
 * Configuration Manager
 * 
 * @returns void
 */
function ConfigurationManager(parentObject, userConfiguration) {	
	// Properties
	this.parentObject = parentObject;
	this.canvas = parentObject.canvas;
	this.element = parentObject.element;
	this.support = parentObject.support;
	this.canvasAlt = {};
	this.configuration = {};
	this.fuzzy = {};
	this.sliderThumbWidth = 10;
	this.rightButtonDown = false;
	this.canvasDisplayed = true;
	this.canvasAltDisplayed = true;
	
	// Variables
	var self = this;
		
	/**
	 * Checks if the data parameter is empty
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
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				count++;
			}
		}
		return count == 0;
	}

	/**
	 * Rendering
	 */		
	this.render = function() {	
    	if (typeof self.parentObject.render === 'undefined') {
    		// Uses the defaut rendering
    		var xFuzzy = this.fuzzy.fuzzyInputProcessing();
    		if (this.configuration.options.impreciseInput) {
    			if (this.configuration.options.displayLowerBoundOnly) {
    				this.parentObject.draw(xFuzzy[0], this.canvas);	
    			} else if (this.configuration.options.displayUpperBoundOnly) {
    				this.parentObject.draw(xFuzzy[1], this.canvas);	
    			} else {
    				this.parentObject.draw(xFuzzy[0], this.canvas);
    				this.parentObject.draw(xFuzzy[1], this.canvasAlt);					
    			}	
    		} else {
    			this.parentObject.draw(xFuzzy, this.canvas);
    		}

    		if (this.fuzzy.canvasFuzzy !== null) {
    			this.fuzzy.drawFuzzyPartition();
    		}   		
    	} else {
    		// Uses the parent rendering
    		self.parentObject.render();
    	}
	}
	
	/**
	 * Adds event listeners
	 */	
	this.addEventlisteners = function() {
		// Adds the EventListener "load" to render the parent object when page is loaded
		window.addEventListener("load", function() {self.render()}, true);
		
		// Adds the EventListener "input" and "change" to render the parent object
		this.element.addEventListener("input", function() {self.render()}, false);
		this.element.addEventListener("change", function() {self.render()}, true);
		// EventListener for the support or standard deviation of the possibility distribution
		if (typeof this.support != 'undefined' && this.support != false) {
			this.support.addEventListener("input", function() {self.render()}, false);
			this.support.addEventListener("change", function() {self.render()}, true);		
		}
		// Adds the EventListener "doubleclick" to draw the partition
		if (!this.configuration.options.linguisticInput) {
			this.parentObject.canvas.addEventListener("dblclick", function() {self.doubleClickEventManager()}, false);		
		}
		
		if (this.configuration.options.impreciseInput || this.parentObject instanceof BiEmoticon) {
			
			// Sets the thumb width
			if (!this.empty(this.configuration.options.sliderThumbWidth)) {
				this.sliderThumbWidth = this.configuration.options.sliderThumbWidth;
			}
			var style = document.createElement("style");
			style.setAttribute("id", "sliderStyle_" + this.element.id);
			document.head.append(style);
			document.getElementById("sliderStyle_" + this.element.id).innerHTML = "." + this.element.id + "::-moz-range-thumb {width: " + this.sliderThumbWidth + "%;}";
			document.getElementById("sliderStyle_" + this.element.id).innerHTML += "." + this.element.id + "::-webkit-slider-thumb {width: " + this.sliderThumbWidth + "%;}";
			document.getElementById("sliderStyle_" + this.element.id).innerHTML += "." + this.element.id + "::-ms-thumb {width: " + Math.round(this.sliderThumbWidth*this.element.offsetWidth/100) + "px;}";
	
			// Adds the slider id as an additional class to the slider
			this.element.classList.add(this.element.id);		
				
			// Adds the Eventlistener "wheel" to change the size of the cursor
		    if (this.element.addEventListener) {
		    	this.element.addEventListener("mousewheel", function(event) {self.wheelEventManager(event)}, false); //IE9, Chrome, Safari, Oper
		    	this.element.addEventListener("wheel", function(event) {self.wheelEventManager(event)}, false); //Firefox
		    } else {
		    	this.element.attachEvent("onmousewheel", function(event) {self.wheelEventManager(event)}); //IE 6/7/8
		    }
			
		    // Adds the EventListeners "mousedown" and "mouseup"
		    this.element.addEventListener("mousedown", function(event) {self.rightButtonDown = true;});
		    this.element.addEventListener("mouseup", function(event) {self.rightButtonDown = false;});		    

			// Adds the EventListener "click" 
		    this.canvas.addEventListener("click", function() {self.clickEventManager(event, self.canvas)}, false);	
		    
		    // Adds the EventListener "click" for the second canvas if the option impreciseInput is set
			if (this.configuration.options.impreciseInput) {
				// Adds the EventListener "click" 
				this.canvasAlt.addEventListener("click", function() {self.clickEventManager(event, self.canvasAlt)}, false);	

				// Adds the EventListener "doubleclick" to draw the partition
				this.canvasAlt.addEventListener("dblclick", function() {self.doubleClickEventManager()}, false);		
			}		
		}	
	}
	
	/**
	 * Manages the wheel event
	 */	
	this.wheelEventManager = function(event) {
		event.preventDefault();
		if(this.rightButtonDown === true) {
			var style = document.getElementById("sliderStyle_" + this.element.id);
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

		  	style.innerHTML = "." + this.element.id + "::-moz-range-thumb {width: " + this.sliderThumbWidth + "%;}";
		  	style.innerHTML += "." + this.element.id + "::-webkit-slider-thumb {width: " + this.sliderThumbWidth + "%;}";
		  	style.innerHTML += "." + this.element.id + "::-ms-thumb {width: " + this.sliderThumbWidth*this.element.offsetWidth/100 + "px;}\n";	
	  	
		}	
		self.render();
	}	
	
	/**
	 * Manages the click event
	 */
	this.clickEventManager = function(event, canvas) {
		var scrollY = window.scrollY;
		if (typeof scrollY === 'undefined') {
			scrollY = document.documentElement.scrollTop;
		}
		var x = event.pageX - canvas.getBoundingClientRect().left;
	    var y = event.pageY - canvas.getBoundingClientRect().top - scrollY;
	    var size = canvas.width;
	    var distance = (x - size/2)*(x - size/2) + (-y + size/2)*(-y + size/2);

    	if (event.shiftKey && this.configuration.options.impreciseInput) {
    		if (canvas == this.canvasAlt) {
    			if (this.canvasDisplayed) {
    				this.canvas.style.display = 'none';
    			} else {
    				this.canvas.style.display = 'initial';
    			}
    			this.canvasDisplayed = !this.canvasDisplayed;
    		} else {
    			if (this.canvasAltDisplayed) {
    				this.canvasAlt.style.display = 'none';
    			} else {
    				this.canvasAlt.style.display = 'initial';
    			}
    			this.canvasAltDisplayed = !this.canvasAltDisplayed;
    		}
    	} else {
    		if (distance < size*size/4) {

		    	this.parentObject.leftStartAngle = 0;
		    	this.parentObject.leftEndAngle = 2*Math.PI;
		        this.parentObject.rightStartAngle = Math.PI/2;
		    	this.parentObject.rightEndAngle = -Math.PI/2;	    			
		    	this.parentObject.dashSize = 3;
    		} else {
		    	if (x < size/2) {
		    		this.parentObject.leftStartAngle = 0
		    		this.parentObject.leftEndAngle = 2*Math.PI;
			    	this.parentObject.rightStartAngle = 0;
				    this.parentObject.rightEndAngle = 0;	    			
		    		this.parentObject.dashSize = 0;
		    	} else {
		    		this.parentObject.leftStartAngle = 0
		    		this.parentObject.leftEndAngle = 0;
			    	this.parentObject.rightStartAngle = 0;
				    this.parentObject.rightEndAngle = 2*Math.PI;	    			
		    		this.parentObject.dashSize = 0;
		    	}
    		}
    	}
    	self.render();
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
	
	// Updates the configuration
	this.update(userConfiguration);
	
	// Creates the fuzzy object
	this.fuzzy = new Fuzzy(this);
	
	// Adds a canvas in case of imprecise input
	if (this.configuration.options.impreciseInput) {
		this.canvasAlt = document.createElement("canvas");	
		this.canvasAlt.id = this.canvas.id + "Alt";	
		this.canvasAlt.width = this.canvas.width;
		this.canvasAlt.height = this.canvas.height;		
		this.canvasAlt.classList.add("alt");
		this.canvas.parentNode.insertBefore(this.canvasAlt, this.canvas.nextSibling);	
	}	
	
	// Adds the event listeners
	this.addEventlisteners();	
	
	// Adds polyfills
	this.polyfills();
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
	this.coverageInterval = null;
	this.fuzzyPartition = this.parentObject.configuration.fuzzyPartition;
	// Finds the lower and upper bounds
	this.lowerBound = this.fuzzyPartition[0].bounds[0];
	this.upperBound = this.fuzzyPartition[0].bounds[3];
	for (var i=1; i < this.fuzzyPartition.length; i++) {
		var bounds = this.fuzzyPartition[i].bounds				
		if (bounds[0] < this.lowerBound) {
			this.lowerBound = bounds[0];
		}
		if (bounds[3] > this.upperBound) {
			this.upperBound = bounds[3];
		}			
	}	

	/**
	 * Draws the fuzzy partition
	 */
	this.drawFuzzyPartition = function() {	
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
			if (this.parentObject.configuration.options.impreciseInput) {
				this.parentObject.canvas.parentNode.insertBefore(this.canvasFuzzy, this.parentObject.canvasAlt.nextSibling);									
			} else {
				this.parentObject.canvas.parentNode.insertBefore(this.canvasFuzzy, this.parentObject.canvas.nextSibling);					
			}
		}

		// Draws the the membership functions
		var context = this.canvasFuzzy.getContext("2d");
	
		if (context !== null) {
			context.clearRect(0, 0, this.canvasFuzzy.width, this.canvasFuzzy.height);
			if (Array.isArray(this.fuzzyInput)) {
				heightOffset = 20;
			}	
			context.save();
			for (var i=0; i < this.fuzzyPartition.length; i++) {			
				context.beginPath();
				context.strokeStyle = "rgb(" + this.fuzzyPartition[i].color[0] + "," + this.fuzzyPartition[i].color[1] + "," + this.fuzzyPartition[i].color[2]
				+ ")";
				var bounds = this.fuzzyPartition[i].bounds
				context.moveTo(this.xCanvas(bounds[0]), this.yCanvas(0));
				context.lineTo(this.xCanvas(bounds[1]), this.yCanvas(1));
				context.lineTo(this.xCanvas(bounds[2]), this.yCanvas(1));
				context.lineTo(this.xCanvas(bounds[3]), this.yCanvas(0));
				context.stroke();
				context.closePath();
			}	
			context.beginPath();
			context.strokeStyle = "rgb(0,0,0)";
			context.moveTo(1, this.yCanvas(0));
			context.lineTo(this.canvasFuzzy.width, this.yCanvas(0));
			
			// Draws the bounds values
			context.font = "bold 14px times";
			var text = this.lowerBound.toFixed(2)
			context.fillText(text, 1, this.canvasFuzzy.height);
			text = this.upperBound.toFixed(2)
			position = this.canvasFuzzy.width -context.measureText(text).width
			context.fillText(text, position , this.canvasFuzzy.height)
			context.stroke();
			context.closePath();
			context.restore();
			
			// Draws the input
			if (this.fuzzyInput !== null) {
				context.save();
				context.beginPath();
				context.setLineDash([3, 3]);
				if (Array.isArray(this.fuzzyInput)) {
					if (this.parentObject.configuration.options.impreciseInputDistribution == UNIFORM_DISTRIBUTION) {
						context.moveTo(this.xCanvas(this.fuzzyInput[0].x), this.yCanvas(this.fuzzyInput[0].y));
						context.lineTo(this.xCanvas(this.fuzzyInput[1].x), this.yCanvas(this.fuzzyInput[1].y));
						context.lineTo(this.xCanvas(this.fuzzyInput[2].x), this.yCanvas(this.fuzzyInput[2].y));
						context.stroke();
					} else if (this.parentObject.configuration.options.impreciseInputDistribution == NORMAL_DISTRIBUTION) {
						// Gets the mean and standard deviation [mu-3*sigma, mu, mu, mu+3*sigma]
						var mean = this.fuzzyInput[1].x;
						var std = (this.fuzzyInput[2].x - this.fuzzyInput[1].x)/3.0;
						var multiLinearApproximation = this.getMultiLinearApproximation(mean, std);
						context.moveTo(this.xCanvas(multiLinearApproximation[0].x), this.yCanvas(multiLinearApproximation[0].y));						
						for (var i = 1; i < multiLinearApproximation.length; i++) {
							context.lineTo(this.xCanvas(multiLinearApproximation[i].x), this.yCanvas(multiLinearApproximation[i].y));
						}
						context.stroke();
					}
					// Draws the coverage interval
					if (this.coverageInterval !== null) {
						context.save();
						context.beginPath();
						context.setLineDash([3, 1]);
						context.strokeStyle = "rgb(0, 0, 255)";
						context.moveTo(this.xCanvas(this.coverageInterval[0]), this.yCanvas(0));
						context.lineTo(this.xCanvas(this.coverageInterval[0]), this.yCanvas(1));
						context.lineTo(this.xCanvas(this.coverageInterval[1]), this.yCanvas(1));
						context.lineTo(this.xCanvas(this.coverageInterval[1]), this.yCanvas(0));
						context.font = "bold 15px Arial";
						context.textAlign = "center";
						context.fillText("Level of confidence = " + this.levelOfConfidence.toFixed(2), this.canvasFuzzy.width/2, 15);
						context.stroke();
						context.closePath();
						context.restore();
					}
				} else {
					context.moveTo(this.xCanvas(this.fuzzyInput), this.yCanvas(0));
					context.lineTo(this.xCanvas(this.fuzzyInput), this.yCanvas(1));
					context.stroke();
				}
				context.closePath();
				context.restore();
			}
		}
	}
	
	/**
	 * Returns the canvas x coordinate
	 */	
	this.xCanvas = function (x) {
		var coeff = this.canvasFuzzy.width/(this.upperBound - this.lowerBound);
		return coeff * (x - this.lowerBound);
	}
	
	/**
	 * Returns the canvas y coordinate
	 */
	this.yCanvas = function (y) {
		var heightOffset = 10;
		var coeff = 4*heightOffset - this.canvasFuzzy.height;
		return coeff * y + this.canvasFuzzy.height - 2 * heightOffset;
	}	
	
	/**
	 * Processes the input according to its type
	 */
	this.fuzzyInputProcessing = function() {	
		if (this.parentObject.configuration.options.impreciseInput || this.parentObject.parentObject instanceof BiEmoticon) {
			// Processing for an imprecise input
			if (this.parentObject.support !== false) {
				var sliderThumbWidth = this.parentObject.support.value;
				var x = parseFloat(this.parentObject.element.value);
				if (sliderThumbWidth == 0) {
					// Processing for a crisp input
					this.fuzzyInput = x;
					return [
						this.fuzzyDescription(this.fuzzyInput, this.parentObject.configuration.fuzzyPartition),
						this.fuzzyDescription(this.fuzzyInput, this.parentObject.configuration.fuzzyPartition)
						];	
				}	
			} else {
				var sliderThumbWidth = this.parentObject.sliderThumbWidth;
				var x = (100 - sliderThumbWidth) * this.parentObject.element.value/100 + sliderThumbWidth/2;
			}

			this.fuzzyInput = [
				{"x": x - sliderThumbWidth/2, "y": 0},
				{"x": x, "y": 1},
				{"x": x + sliderThumbWidth/2, "y": 0}
			];
			
			var fuzzyInput = this.fuzzyInput; 
			if (this.parentObject.configuration.options.impreciseInputDistribution == NORMAL_DISTRIBUTION) {
				// Gets the mean and standard deviation [mu-3*sigma, mu, mu, mu+3*sigma]
				var mean = this.fuzzyInput[1].x;
				var std = (this.fuzzyInput[2].x - this.fuzzyInput[1].x)/3.0;
				fuzzyInput = this.getMultiLinearApproximation(mean, std);			
			}
			
			// Fuzzifies the value
			var xFuzzy = this.fuzzyLowerDescription(fuzzyInput, this.parentObject.configuration.fuzzyPartition);	

			// Gets the maximimum grade of membership in the lower description
			var LowerDescriptionMax = 0;
			for (var i =0; i < xFuzzy.length; i++) {
				LowerDescriptionMax = Math.max(LowerDescriptionMax, xFuzzy[i].value);
			}

			// Cuts the fuzzy input at the level 1 - LowerDescriptionMax
			for (var i=0; i < fuzzyInput.length/2; i++) {
				var temp = this.intersect (
						fuzzyInput[0].x, 1 - LowerDescriptionMax, 
						fuzzyInput[Math.floor(fuzzyInput.length/2)].x, 1 - LowerDescriptionMax,
						fuzzyInput[i].x, fuzzyInput[i].y,
						fuzzyInput[i+1].x, fuzzyInput[i+1].y
				);
				if (temp != false) {
					var cut = [temp.x, 2*fuzzyInput[Math.floor(fuzzyInput.length/2)].x - temp.x];
				}
			}
			this.coverageInterval = cut;
			this.levelOfConfidence = LowerDescriptionMax;		
			
			return [
				this.fuzzyDescription(cut[0], this.parentObject.configuration.fuzzyPartition),
				this.fuzzyDescription(cut[1], this.parentObject.configuration.fuzzyPartition)
				];			
		} else if (this.parentObject.configuration.options.linguisticInput) {
			// The input is a linguistic fuzzy set 
			// gradeOfMembership1/label1 + ... + gradeOfMembershipn/labeln
			this.fuzzyInput = this.parentObject.element.value;

			if (this.fuzzyInput == 'nan') {
				return this.fuzzyInput;
			}
			var pattern = /(\d+(\.\d+)?)\s*\/\s*((?:\w|\+|-)+)/g;
			var result = this.fuzzyInput.match(pattern);
			var finalResult = [];
			for (var i =0; i < result.length; i++) {
				var patternGrade = /(\d+(?:\.\d+)?)/;
				var gradeOfMembership = result[i].match(patternGrade);
				var patternLabel = /\/\s*((?:\w|\+|-)+)/
				var label = result[i].match(patternLabel)[1];
				if (typeof this.parentObject.configuration.fuzzyPartition[i].alias != 'undefined' && this.parentObject.configuration.fuzzyPartition[i].alias != null) {
					label = this.parentObject.configuration.fuzzyPartition[i].alias;
				}				
				finalResult[i] = {
					"value": parseFloat(gradeOfMembership[1]),
					"label": label						
				};
			}

			return finalResult;
		} else {
			// Processing for a crisp input
			this.fuzzyInput = this.parentObject.element.value;
			return this.fuzzyDescription(this.fuzzyInput, this.parentObject.configuration.fuzzyPartition);
			
		}
	}

	/**
	 * Computes the linguistic fuzzy description (linguistic fuzzification) of
	 * the precise input x
	 */
	this.fuzzyDescription = function(x, membershipFunctions) {
		var result = [];
		
		for (i = 0; i < membershipFunctions.length; i++) {
			var label = membershipFunctions[i].label;
			if (typeof membershipFunctions[i].alias != 'undefined' && membershipFunctions[i].alias != null) {
				label = membershipFunctions[i].alias;
			}
			result[i] = {
				"value": this.gradeOfMembership(membershipFunctions[i], x),
				"label": label
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
				"value": this.gradeOfMembershipFuzzyInput(membershipFunctions[i], x),
				"label": membershipFunctions[i].label
			};
		}
		return result;
	}	

	/**
	 * Returns the grade of membership for the given membership function and for
	 * the fuzzy input x
	 */	
	this.gradeOfMembershipFuzzyInput = function(membershipFunction, x) {
		var bounds = membershipFunction.bounds
		
		var result = 1.0;
		var inputKernel = x[ Math.floor(x.length/2)].x;

		// The kernel of the input does not intersect the support of the
		// meaning : necessity = 0
		if (inputKernel > bounds[3] || inputKernel < bounds[0]) {
			return 0;
		}
		
		// The support of the input is included in the kernel of the meaning
		// : necessity = 1
		if (bounds[1] <= x[0].x && x[x.length - 1].x <= bounds[2]) {
			return 1.0;
		}

		for (var i = 0; i<x.length-1; i++) {
			var temp = this.intersect (
					bounds[0], 0, 
					bounds[1], 1,
					x[i].x, 1 - x[i].y,
					x[i+1].x, 1 - x[i+1].y
			);
			if (temp != false) {
				result = Math.min(result, temp.y);
			}
			temp = this.intersect (
					bounds[2], 1, 
					bounds[3], 0,
					x[i].x, 1 - x[i].y,
					x[i+1].x, 1 - x[i+1].y
			);
			if (temp != false) {
				result = Math.min(result, temp.y);
			}			
		}		
		return result;		
	}	
		
	/**
	 * Returns the grade of membership for the given membership function as
	 * point x
	 */
	this.gradeOfMembership = function(membershipFunction, x) {
		var bounds = membershipFunction.bounds;	
		if (typeof membershipFunction.type==="undefined"){
			membershipFunction.type = TRAPEZOIDAL_MEMBERSHIP_FUNCTION;
		}

		if (x < bounds[0]) {
			if (membershipFunction.type == OPEN_LEFT_MEMBERSHIP_FUNCTION) {
				return 1.0
			} else{
				return 0.0
			}
		} else if (x < bounds[1]) {
			return (x - bounds[0])
					/ (bounds[1] - bounds[0]);
		} else if (x < bounds[2]) {
			return 1.0;
		} else if (x < bounds[3]) {
			return (bounds[3] - x)
					/ (bounds[3] - bounds[2]);
		} else {
			if (membershipFunction.type == OPEN_RIGHT_MEMBERSHIP_FUNCTION) {
				return 1.0
			} else{
				return 0.0
			}			
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

	/*
	 * Checks the label
	 */
	this.checkLabel = function(object) {
		return object.label == this.label;
	}

	/**
	 * Multilinear approximation of the possibility distribution
	 * associated with the normal distribution. Approximation error
	 * is 0.01*std with std the standard deviation of the normal 
	 * distribution.
	 */	
	this.getMultiLinearApproximation = function(mean, std)	{
		return [
			{ "x": mean-3.0000*std, "y": 0.0027},			
			{ "x": mean-2.4154*std, "y": 0.0157},			
			{ "x": mean-1.9945*std, "y": 0.0461},			
			{ "x": mean-1.6396*std, "y": 0.1011},			
			{ "x": mean-1.3233*std, "y": 0.1857},				
			{ "x": mean-1.0215*std, "y": 0.3070},
			{ "x": mean-0.7208*std, "y": 0.4710},
			{ "x": mean-0.4090*std, "y": 0.6825},
			{ "x": mean, "y": 1.0},
			{ "x": mean+0.4090*std, "y": 0.6825},
			{ "x": mean+0.7208*std, "y": 0.4710},
			{ "x": mean+1.0215*std, "y": 0.3070},				
			{ "x": mean+1.3233*std, "y": 0.1857},	
			{ "x": mean+1.6396*std, "y": 0.1011},	
			{ "x": mean+1.9945*std, "y": 0.0461},	
			{ "x": mean+2.4154*std, "y": 0.0157},	
			{ "x": mean+3.0000*std, "y": 0.0027}		
		];		
	}
	
	// Line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
	// Determine the intersection point of two line segments
	// Return FALSE if the lines don't intersect
	this.intersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {

		// Check if none of the lines are of length 0
		if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
			return false
		}

		denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

		// Lines are parallel
		if (denominator === 0) {
			return false
		}

		let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
		let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

		// is the intersection along the segments
		if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
			return false
		}

		// Return a object with the x and y coordinates of the intersection
		let x = x1 + ua * (x2 - x1)
		let y = y1 + ua * (y2 - y1)

		return {"x":x, "y":y}
	}	
}
