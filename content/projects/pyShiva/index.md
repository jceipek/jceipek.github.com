---
link: ''
aliases:
  - projects/pyshiva.html
link_text: about
img: pyshiva.png
dark: true
title: pyShiva
collaborators:
  - Berit Johnson
  - Diana Vermilya
  - Charles Gwennap
tagline: simple 2d vector graphics for python artists
roles:
  - Design
  - Implementation
categories:
  - experiment
---

Getting computers to draw simple 2d graphics quickly used to be much easier than it is now. Graphics cards are great at drawing triangles but need to be taught to create more complex or organic shapes.

Lots of artists use [_Processing_](https://processing.org/), but that language has all of the verbosity and incidental complexity of Java with hidden state and complexity approaching _OpenGL_. _Why_ should an interactive artist need to understand [_transformation matrices_](https://www.processing.org/reference/pushMatrix_.html) in order to rotate shapes on the screen?

Python is among my favorite prototyping languages, but its graphics libraries leave a lot to be desired (as of 2012).

_pyShiva_ makes graphics programming for Python fun again. The pyshiva Python module provides a simple, object-oriented programming interface for creating stunning 2D graphics for realtime data visualization, games, and general 2D experimentation.

Once setup, _pyShiva_ is relatively easy to use; I was able to teach a young non-programmer how to make her own graphics demos using it over the course of a few hours. [You can get it here.](https://github.com/jceipek/pyShiva/)

Note that _pyShiva_ is incomplete and its development is on hold. I still think making interactive graphics can and should be much easier, but I'm currently more interested in direct manipulation than coding as a way to empower interactive artists.

### Technical Details

pyshiva is a high level Cython extension built on the OpenGL-based ANSI-C ShivaVG graphics library and the cross-platform GLFW windowing library. It abstracts the process of drawing objects via an object-oriented API that enables programmers to create persistent vector graphics objects.