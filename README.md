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

The fuzzy partition is an array of trapezoidal membership functions. Each membership function is defined by its bounds [a, b, c, d], a color and a label. 

- "a" is the point below which the left hand side of the trapezoidal membership function is equal to 0.
- "b" is the point where the left hand side of the trapezoidal membership function is equal to 1, i.e. the membership function is linearly increasing from 0 to 1 between "a" and "b".
- "c" is the point such that between "b" and "c" the membership function is equal to 1.
- "d" is the point above which the right hand side of the trapezoidal membership function is equal to 0, i.e. the membership function is linearly decreasing from 1 to 0 between "c" and "d".

Example: modification of the default partition for Emoticon.

```
var x = new Emoticon("canvas4", "slider4", {
					"fuzzyPartition" : [ {
						"bounds" : [ 0, 0, 15, 50 ],
						"color" : [ 0, 255, 0 ],
						"label" : "S"
					}, {
						"bounds" : [ 15, 50, 55, 90 ],
						"color" : [ 255, 255, 0 ],
						"label" : "N"
					}, {
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
	
#### Options for BiEmoticon

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
- eyesSizeScaled (default false): if true eyes are scale in both direction.
- eyebrows (default true): if true eyebrows are displayed. 
- leftEyeBrowLeftYPositionToSizeRatio (default 0.25): left position on the y-axis of the left eyebrow.
- leftEyeBrowRightYPositionToSizeRatio (default 0.3): right position on the y-axis of the left eyebrow.
- mouthLengthToSizeRatio (default 0.55): ratio of the mouth length to the size of the emoticon.
- smileToSizeRatio (default 0.3): ratio of the smile to the size of the emoticon.
- secondSmile (default false): if true a second smile is displayed. It can be used to simulate a mouth opening.
- gradient (default false): if true a gradient is applied to the head.
- gradientColorBegin (default #0752DE): begin color for the gradient.
- gradientColorEnd (default yellow): end color for the gradient.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.	

#### Options for BiEmoticon

- eyeWidthToSizeRatio (default 0.08): ratio of the eye width to the size of the emoticon.
- eyeHeightToWidthRatio (default 1.5): ratio of the eye height to the eye width.
- eyeXPositionToSizeRatio (default 0.2): ratio of the position on the x-axis of the eye to the size of the emoticon.
- eyeXPositionToSizeRatio (default 0.1): ratio of the position on the y-axis of the to the size of the emoticon.
- mouthLengthToSizeRatio (default 0.55): ratio of the mouth length to the size of the emoticon.
- smileToSizeRatio (default 0.3): ratio of the smile to the size of the emoticon.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.	
- sliderThumbWidth (default 10): width of the slider thumb.

#### Options for Sun/Cloud

- None.

#### Options for Arrow

- arrowThickness (default 12): thickness of the arrow.
- arrowLength (default 95): length of the arrow.
- canvasFuzzyHeight (default 150): height of the canvas used to display the fuzzy partition.
- canvasFuzzyWidth (default 400): width of the canvas used to display the fuzzy partition.

## Author

* **Laurent Foulloy** 

## License

This project is licensed under the GNU Licence - see the [LICENSE.md](LICENSE.md) file for details.
