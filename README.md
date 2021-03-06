# Pictorial scales

JavaScript to build pictorial scales associated with HTML elements.

It can be used to display emoticons, arrows, sun/cloud from given values
or to associate them with slide ranges, for example for survey applications.

## Examples

- [Emoticon](https://yolftypo3.github.io/PictorialScales/Examples/Emoticon.html)
- [BiEmoticon](https://yolftypo3.github.io/PictorialScales/Examples/BiEmoticon.html)
- [Sun/Cloud](https://yolftypo3.github.io/PictorialScales/Examples/SunCloud.html)
- [Arrow](https://yolftypo3.github.io/PictorialScales/Examples/Arrow)

## Configuration

### Fuzzy partition

The fuzzy partition is an array of trapezoidal membership functions. Each membership function is defined by its type, bounds [a, b, c, d], color and label. 

The type is a constant:
- OPEN\_LEFT\_MEMBERSHIP\_FUNCTION for S-type membership function going to -infinity. 
- OPEN\_RIGHT\_MEMBERSHIP\_FUNCTION for S-type membership function going to +infinity.
- TRAPEZOIDAL\_MEMBERSHIP\_FUNCTION for trapezoidal membership function. This is the default type and it can be omitted.

For trapezoidal membershipfunctions, the bounds are defined by [a, b, c, d] where:
- "a" is the point below which the left hand side of the trapezoidal membership function is equal to 0 . 
- "b" is the point where the left hand side of the trapezoidal membership function is equal to 1, i.e. the membership function is linearly increasing from 0 to 1 between "a" and "b".
- "c" is the point such that between "b" and "c" the membership function is equal to 1.
- "d" is the point above which the right hand side of the trapezoidal membership function is equal to 0, i.e. the membership function is linearly decreasing from 1 to 0 between "c" and "d".

For S-type open left membership functions, the bounds are [a, a, b, c] where  
- "a" defines the lower bound for the display. 
- "b" is the point is the point below which the membership function is equal to 1.
- "c" is the point above which the membership function is equal to 0, i.e. the membership function is linearly decreasing from 1 to 0 between "b" and "c".

For S-type open rightt curve, the bounds are [a, b, c, c] where  
- "a" is the point below which the membership function is equal to 0 
- "b" is the point is the point below which the membership function is equal to 1, i.e. the membership function is linearly increasing from 0 to 1 between "a" and "b".
- "c" defines the upper bound for the display.

Example: modification of the default partition for Emoticon.

```
var x = new Emoticon("canvas4", "slider4", {
					"fuzzyPartition" : [ {
						"type" : OPEN_LEFT_MEMBERSHIP_FUNCTION,
						"bounds" : [ 0, 0, 15, 50 ],
						"color" : [ 0, 255, 0 ],
						"label" : "S"
					}, {
						"type" : TRAPEZOIDAL_MEMBERSHIP_FUNCTION,
						"bounds" : [ 15, 50, 55, 90 ],
						"color" : [ 255, 255, 0 ],
						"label" : "N"
					}, {
						"type" : OPEN_LEFT_MEMBERSHIP_FUNCTION,
						"bounds" : [ 55, 90, 100, 100 ],
						"color" : [ 255, 0, 0 ],
						"label" : "U"
					} ]
				});
```

### Proptotypes

The prototypes are values associated with labels. For a given label, when the grade of membership of the associated membership function is equal to 1, the output value is the prototype. In the general case, the output is a linear combination of the prototypes with the grades of membership.
 
Example: modification of the default prototypes associated with the eyes for Emoticon.

```
var x = new Emoticon("canvas4", "slider4", {
					"eyesSizePrototypes" : [ {
						"label" : "U",
						"prototype" : 0.3
					}, {
						"label" : "N",
						"prototype" : 0.9
					}, {
						"label" : "S",
						"prototype" : 1
					} ],
				});
```

#### Prototypes for Emoticon

- colorPrototypes: prototypes for the color.
- gradientPrototypes: prototypes for the gradient.
- smilePrototypes: prototypes for the smile.
- secondSmilePrototypes: prototypes for the second smile.
- eyesSizePrototypes: prototypes for eyes size.
- eyebrowsPrototypes: : prototypes for the eye brows.
	
#### Prototypes for BiEmoticon

- colorPrototypes: prototypes for the color.
- gradientPrototypes: prototypes for the gradient.
- smilePrototypes: prototypes for the smile.

#### Prototypes for Sun/Cloud

- sunSizePrototypes: prototypes for the sun size.
- sunPositionPrototypes: prototypes for the sun position.
- sunColorPrototypes: prototypes for the sun color.
- sunraySizePrototypes: prototypes for the sunray size.
- cloudSizePrototypes: prototypes for the cloud size.
- cloudPositionPrototypes: prototypes for the cloud position.
- cloudColorPrototypes: prototypes for the cloud color.
- rainLevelPrototypes: prototypes for the rain level.		
		
#### Prototypes for Arrow

- colorPrototypes: prototypes for the color.
- anglePrototypes: prototypes for the angle.
	
### Options

Example: modification the size of the canvas which displays the fuzzy canvas.

```
var x = new Emoticon("canvas1", "slider1", {
				"options" : {
					"canvasFuzzyHeight": 100,
					"canvasFuzzyWidth": 300
				}
			});
```

#### Options for Emoticon

- eyeWidthToSizeRatio (default 0.08): ratio of the eye width to the size of the emoticon.
- eyeHeightToWidthRatio (default 1.5): ratio of the eye height to the eye width.
- eyeXPositionToSizeRatio (default 0.2): ratio of the position on the x-axis of the eye to the size of the emoticon.
- eyeXPositionToSizeRatio (default 0.1): ratio of the position on the y-axis of the to the size of the emoticon.
- eyesFillColor (default "black"): color of the eyes.
- eyesSizeScaled (default false): if true eyes are scale in both direction.
- eyebrows (default true): if true eyebrows are displayed. 
- leftEyeBrowLeftYPositionToSizeRatio (default 0.25): left position on the y-axis of the left eyebrow.
- leftEyeBrowRightYPositionToSizeRatio (default 0.3): right position on the y-axis of the left eyebrow.
- mouthLengthToSizeRatio (default 0.55): ratio of the mouth length to the size of the emoticon.
- mouthFill (default false): if true the mouth is filled with mouthfillColor.
- mouthFillColor (default "black"): the color used to fill the mouth if mouthFill is true.
- smileToSizeRatio (default 0.3): ratio of the smile to the size of the emoticon.
- secondSmile (default false): if true a second smile is displayed. It can be used to simulate a mouth opening.
- smileCurve (default "quadratic") : use "cubic" or "quadratic" to change the type of Bezier curve for the smile.
- secondSmileCurve (default "quadratic") : use "cubic" or "quadratic" to change the type of Bezier curve for the second smile.
- gradient (default false): if true a gradient is applied to the head.
- gradientColorBegin (default #0752DE): begin color for the gradient.
- gradientColorEnd (default yellow): end color for the gradient.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.	
- impreciseInput (default false): if true, a triangular fuzzy input is set (use the mouse right button + wheel to modify it).
- linguisticInput (default false): if true, a linguistic fuzzy input is considered. The expression of a fuzzy input must be grade1/label1 + grade2/label2 + .... See the last emoticon example in which the default linguistic fuzzy input is 0/U + 0.3/N + 0.7/S. In such a case, only prototypes must be defined. Indeed, the fuzzy partition is not required since grades of membership are provided for each label.
Note : since labels may contain + or - signs, each part of the fuzzy input must be separated by a space.
- nanColor (default [116, 208, 241]): it may occur that an emoticon should be displayed even if the linguitic fuzzy input is not known. In that case, "nan" should be used for the input. This option defines the color when "nan" is used.
- nanSmile (default 0): smile value when "nan" is used. 
- nanEyesSize (default 1: eye size value when "nan" is used.  

#### Options for BiEmoticon

- eyeWidthToSizeRatio (default 0.08): ratio of the eye width to the size of the emoticon.
- eyeHeightToWidthRatio (default 1.5): ratio of the eye height to the eye width.
- eyeXPositionToSizeRatio (default 0.2): ratio of the position on the x-axis of the eye to the size of the emoticon.
- eyeXPositionToSizeRatio (default 0.1): ratio of the position on the y-axis of the to the size of the emoticon.
- eyesFillColor (default "black"): color of the eyes.
- eyesSizeScaled (default false): if true eyes are scale in both direction.
- eyebrows (default true): if true eyebrows are displayed. 
- leftEyeBrowLeftYPositionToSizeRatio (default 0.25): left position on the y-axis of the left eyebrow.
- leftEyeBrowRightYPositionToSizeRatio (default 0.3): right position on the y-axis of the left eyebrow.
- mouthLengthToSizeRatio (default 0.55): ratio of the mouth length to the size of the emoticon.
- smileToSizeRatio (default 0.2): ratio of the smile to the size of the emoticon.
- secondSmile (default false): if true a second smile is displayed. It can be used to simulate a mouth opening.
- smileCurve (default "quadratic") : use "cubic" or "quadratic" to change the type of Bezier curve for the smile.
- secondSmileCurve (default "quadratic") : use "cubic" or "quadratic" to change the type of Bezier curve for the second smile.
- gradient (default false): if true a gradient is applied to the head.
- gradientColorBegin (default #0752DE): begin color for the gradient.
- gradientColorEnd (default yellow): end color for the gradient.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.	
- sliderThumbWidth (default 10): width of the slider thumb.
- impreciseInputDistribution (default UNIFORM_DISTRIBUTION): this parameter defines the probability distribution
associated with the imprecise input. If set to UNIFORM_DISTRIBUTION, the transformation of the probability
distribution into a possibility distribution gives a triangular fuzzy input centered on the middle point of the 
slider thumb. The width of the slider thumb is the support of the distribution. If set to NORMAL_DISTRIBUTION,
the possibility distribution is the transformation of the normal distribution using a multilinear approximation. The possibility distribution is centered on the middle point of the slider thumb. The width of the slider thumb
is the standard deviation of the normal distribution. Instead of using a HTML range item, the middle point or the 
support (or standard deviation) can be provided by text input (see the third example of the bi-emoticons).
 

#### Options for Sun/Cloud

- impreciseInput (default false): if true, a triangular fuzzy input is set (use the mouse right button + wheel to modify it).

#### Options for Arrow

- arrowThickness (default 12): thickness of the arrow.
- arrowLength (default 95): length of the arrow.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.
- impreciseInput (default false): if true, a triangular fuzzy input is set (use the mouse right button + wheel to modify it).

## Author

* **Laurent Foulloy** 

## License

This project is licensed under the GNU Licence - see the [LICENSE.md](LICENSE.md) file for details.
