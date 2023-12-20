---
title: Installation Visualizer
tagline: creative coding for robotics installations
link: ''
opens_new_page: false
link_text: learn more
img: thumb.png
dark: true
collaborators:
  - Behnaz Farahi
roles:
  - Systems Programming
  - Workshop Design
  - Teaching
categories:
  - software
---

In 2021, I designed and led [*Beyond the Grid: Interactive Installations with Wacky Topologies*](https://web.archive.org/web/20231220042432/https://www.digitalfutures.world/workshops/history/view?workshops=105&cid=32&year=2021) for the DigitalFUTURES festival together with my longtime collaborator Behnaz Farahi. During the week-long workshop, we remotely taught 14 students around the globe (including Greece, China, England, Iran, and the US) how to design, build, and program interactive art sculptures with unusual shapes, sharing techniques we'd developed together in the preceding 6 years. Behnaz focused on teaching 3D design, fabrication, and soldering, while I taught the students practical math and programming techniques for bringing their work to life.

This video shows the resulting student projects:

<div style="padding:62.5% 0 0 0;position:relative;margin:0.5em 0;">
<iframe src="https://www.youtube-nocookie.com/embed/EfWlIOijRms?rel=0" title="DigitalFutures 2021 Workshop Results" frameborder="0" allow="accelerometer; clipboard-write; gyroscope; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" allowfullscreen></iframe>
</div>

In the nights and weekends of the month leading up to the workshop, we created a bespoke creative coding environment, *Installation Visualizer*, designed to dramatically simplify and accelerate creative coding for installations.

To keep the environment approachable, I implemented most of it during remote pair-programming sessions with Behnaz. Since Behnaz isn't an experienced programmer, I sketched code for many different implementations and design directions and used Behnaz' feedback to guide the implementation in a student-friendly direction.

I'm especially proud of the tight feedback loops *Installation Visualizer* enables. Creative coders edit live simulations of their installations, get immediate feedback about errors, and can simply plug in a microcontroller to any port on their computer to see their work in the physical world. Unlike tools like Processing and the Arduino IDE, there is no need to manually fiddle with compilation, connection, or port selection.

You can get the code (MIT licensed) [here](https://github.com/Julian-Behnaz/DigitalFutures2021).