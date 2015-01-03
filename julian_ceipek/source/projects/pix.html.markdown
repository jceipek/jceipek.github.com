---
link: 'projects/pix.html'
link_text: about/play it!
img: pix.png
dark: true
title: Pix.
collaborators:
  - Riley Butler
  - Alyssa Bawgus
  - Jazmin Gonzalez-Rivero
tagline: 16-bit runner in assembly
roles:
  - Art
  - Design
  - Tools
  - Implementation
---

In 2012, @notch, the creator of [Minecraft](https://minecraft.net/), started working on 0x10<sup>c</sup>, a space game in which players could program virtual spaceships with "DCPU-16" processors.

Shortly after it was announced, I teamed up with some students in my Computer Architecture class at [Olin](http://olin.edu/) to create Pix, a 16-bit arcade game that would have run on these virtual processors. Although @notch has since cancelled 0x10<sup>c</sup>, you can still [play Pix in an online emulator](http://www.dcpu-ide.com/?program=sn6vvsxr).

### Gameplay
Due to the limitations of the processor and the time we had to develop the game, we decided to build a game with a very simple game mechanic. For inspiration, we turned to Canabalt, an endless one-button game in which the objective is to survive as long as possible by jumping over gaps and obstacles.

In Pix, you play a thief running on rooftops. In the spirit of Canabalt, the world is procedurally generated and the objective is to run as long as possible without falling to your doom.

### Technical Limitations
The DCPU-16 specification we used does not provide audio support, so Pix doesn't have music or sound effects.
The simple monitor it provides, the LEM1802, is designed to display text rather than game sprites. The screen consists of 32x12 4x8 pixel character blocks that can each have a foreground and background color. There can be no more than 128 unique blocks and no more than 16 unique colors. As a result, we had to limit the gameplay to jumping over gaps rather than diverse obstacles, and the background is a static backdrop.

### Tools
We initially had a lot of trouble creating graphics and animations for the DCPU-16 emulator because modern image editors are optimized for large images rather than hexadecimal data blocks.
I made a Python toolkit to translate traditional image files and animation spritesheets into unique image tilesets and look-up tables that we could paste into the data portions of our assembly code.