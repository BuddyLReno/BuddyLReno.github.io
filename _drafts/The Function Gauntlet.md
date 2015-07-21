---
layout: post
title: "The Function Gauntlet"
date: 2015-07-02
description: "How to use javascript's reduce method to process an object through multiple functions."
---

Reduce is a nifty javascript array function.  It allows you to iterate on the array, doing some action to achieve a single result. Reading the [documentation on reduce](http://devdocs.io/javascript/global_objects/array/reduce) shows a simple example of taking an array of numbers and adding them to produce a single result.

The reduce function can do much more than what the docs describe though.  A little thinking outside the box is required.
<!--more-->

## How Reduce Works

Consider the following example taken from the docs (modified for simplicity):

```
[1, 2, 3, 4].reduce(function(previousValue, currentValue) {
  return previousValue + currentValue;
});
```
The `previousValue` begins life as `0`.  For each item in the array, the `currentValue` is added to the `previousValue` and returned.  The first iteration, previous and current values are `0 + 1`.  The second iteration, the values are `1 + 2`, then `3 + 3`, then finally `6 + 4` returning `10` as the final result.

You can set an initial value for `previousValue` by passing in a second parameter to reduce.

```
[1, 2, 3, 4].reduce(function(previousValue, currentValue) {
  return previousValue + currentValue;
}, 10);

// Final result: 20
```

## Other Array Types
Now that you know how to use reduce, let's invert the use of it.  Let's say you have a data object and a couple of functions that you are using to modify the object. Take those functions and assign them to an array (keep it simple for the time being).

```
var functionGauntlet = [
	func1,
	func2,
	func3
];

var data = 10;
```
Using reduce, the `data` variable can be processed through our function gauntlet.

```
data = functionGauntlet.reduce(function(memory, func) {
	return func(memory);},  data);
```
By passing in the `data` variable, `data` is assigned to `memory` and passed through to each subsequent function, finally returning the modified data.  Assuming that each function adds 2 to the passed in variable, `data` would end up equaling `16` after passing through the gauntlet.

If you're using the `this` object in those functions in the array, you'll need to tell reduce what `this` actually is.  You can use `bind` to do control `this`.

```
data = functionGauntlet.reduce(function(memory, func) {
	return func.call(this, memory);}.bind(someObject),  data);
```


var colors = ['#ccc', ''rgb(1,2,3)', '#ddd''];
var rgbs = 