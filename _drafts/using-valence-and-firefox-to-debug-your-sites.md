---
layout: post
title: "Using Valence and Firefox to Debug Mobile Sites"
date:  2015-07-31
description: "A quick guide on using Valence with your Android or iOS device."
---

I've run into a few cases where a responsive design or some other element seems to break on an iOS or Android device, but not in a responsive view or emulator on the desktop.  Usually, I've popped open Safari and used it's remote debugging tool (which I'm not very familiar with) to figure out what's wrong.  It would be helpful if I could do remote debugging with a dev tool I'm more familiar with.

After trying out Firefox Developer Edition, I discovered it came pre-installed with an add-on called [Valence](https://developer.mozilla.org/en-US/docs/Tools/Valence). The goal of Valence is to allow you to use Firefox's dev tools to debug sites on other browsers or platforms.  Perfect! Let's walk through how to do this for iOS and Android.
<!--more-->

Before starting, Mozilla notes on the Valence page:

>Valence is still in its early stages, and is available only as a preview. We do not yet recommend using it for day-to-day work.

Keep that in mind in case you run into strange issues as Valence will be more frequently updated than you expect, or it may change how it functions.

## iOS

