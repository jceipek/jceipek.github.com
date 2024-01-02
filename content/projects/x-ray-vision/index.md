---
title: Empowering Manufacturers with X-ray Vision
link: ''
opens_new_page: false
link_text: explore my impact @ Lumafield
img: 'Open Neptune scanner with robotic arm.jpg'
img_alt: "A sleek robotic arm mounted in front of an open-doored matte-black machine displaying an X-ray of an automotive part on an inset touchscreen prepares to reach for a shelf of similar parts to scan. A nearby graphical analysis dashboard displays quality control results from the past six scanned parts."
description: "How I saved Lumafield's customers hundreds of thousands of dollars and helped the company enter an entirely new market segment."
dark: true
collaborators: []
tagline: ''
roles: []
categories:
  - tool
---

Most of the world's manufacturers rely on inadequate tools to identify and fix problems with their products: they commonly cut samples of their products in half hoping to find defects that might also exist in the units they don't destroy. At Lumafield, I collaboratively developed approachable X-ray tools that empower manufacturers of any size to affordably find problems inside their products without destroying them. I improved every part of Lumafield's software stack over the course of three years:
- Custom motion control firmware
- Embedded software to control and monitor a growing fleet of X-ray machines
- Touchscreen interfaces for making X-ray scans
- Server backends for ingesting, analyzing, and sharing 3D X-ray data
- Web frontends for looking inside 3D scans


While I spent most of my time on the embedded software team, I also worked closely with QA, scanner fleet services, and frontend/backend software teams to implement, troubleshoot, and fix features for customers and internal teams.

## 3D X-ray Vision
I joined Lumafield as the company was transitioning from early hardware and software prototypes to production-ready solutions. I developed the volumetric WebGL2 renderer at the heart of Voyager, Lumafield's browser-based inspection tool, and prototyped improvements based on cutting-edge research papers. The renderer allows customers to look inside 3D scans, which helps manufacturers save hundreds of thousands of dollars. For example, engineers at L’Oréal used it to understand why one of their bottles was leaking, saving them 4 months of development time (see [Lumafield's case study](https://web.archive.org/web/20231218221228/https://www.lumafield.com/story/loreal)).

This video[^renderer] shows the renderer in action, virtually stripping away the plastic exterior of an earbud to reveal the electronics inside:
<div style="padding:62.5% 0 0 0;position:relative;">
<iframe src="https://player.vimeo.com/video/896058345?badge=0&title=0&portrait=0&dnt=1&byline=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Adjusting material visibility on AirPod Pro"></iframe></div>

[^renderer]: Lightly edited version of "Animation - Adjusting material visibility on AirPod Pro" from [Lumafield's 2023 Voyager Software Press Packet](https://www.dropbox.com/sh/knqhmuz8qy0zdex/AAC5GHhN5xf5DrtcLmYbE69Ha/Voyager%20software?dl=0&subfolder_nav_tracking=1)

## Enabling New Market Segments
I helped Lumafield expand into new market segments with high volume inspection requirements. Lumafield's X-ray machines initially took multiple hours to scan a product. This made them unusable for high volume customers, which needed scans to complete in minutes or even seconds.
I was specially selected for a small interdisciplinary (R&D, electrical, mechanical, and software) task force that produced a working tradeshow demo of fast automated scanning and analysis in one month. As part of the task force, I...
- worked closely with R&D to create milestones, time budgets, and backup plans
- analyzed and visualized each phase of the scanning and analysis pipeline to find and eliminate bottlenecks
- modified the scanner's motion driver firmware to enable continuous scanning
- developed embedded scanner software to continuously load, scan, and unload parts while simultaneously processing scan data and streaming it to an analysis pipeline
- identified and filled knowledge and resource gaps

The following video[^tradeshow-demo] shows the demo in action:
<div style="padding:57.5% 0 0 0;position:relative;">
<iframe src="https://player.vimeo.com/video/896057184?badge=0&title=0&portrait=0&dnt=1&byline=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Fast Scanning Demo"></iframe></div>

[^tradeshow-demo]: "Lumafield automated scanning 1080" from [Lumafield's Series B Press Packet](https://www.dropbox.com/sh/knqhmuz8qy0zdex/AAB0xOqR0PGN3EHzb-QlJxdla/Series%20B%20press%20packet?dl=0&subfolder_nav_tracking=1)

After the success of the tradeshow demo, I helped turn fast scanning into a production-ready feature in close collaboration with the other two members of Lumafield's embedded software team. Doing so required a combination of systemic redesigns, low-level optimizations, and extensive repetition testing. We used profiling tools like NSight Systems, Viztracer, and Palanteer to uncover problems; made iterative improvements; and evaluated our progress with overnight tests exposing failure probabilities when varying parameters like scan duration, resolution, and exposure time. As part of this initiative, I...
- improved scanner UI responsiveness 90% while making UI code easier to change and increasing type safety, by writing a Typescript code generator and implementing O(log(n)) instead of O(n) state updates
- reduced per-image processing time 30-50x, replacing Scipy/Numpy/OpenCV algorithms with simpler, custom SIMD C code
- rewrote the scanner's X-ray detector hardware driver to reduce memory allocations and thread contention
- restructured scan data uploading to minimize disk usage and prioritize the most important scans
- root-caused intermittent 300ms system stalls using full-system profiling and reverse engineering tools including NSight Systems, `LD_PRELOAD`, Cutter, and jemalloc

This work enables [Triton](https://web.archive.org/web/20231219193002/https://www.lumafield.com/article/introducing-triton-production-ready-automated-ct-inspection), Lumafield's production-ready industrial CT machine for factories, to scan parts in under a minute.

## Reducing Internal Costs
Uncompressed per-scan data occupies 10s to 100s of gigabytes and needs extensive processing to extract actionable 3D data and insights. Transferring and processing all this data can get expensive when using third party datacenters like those provided by Amazon, particularly for high-volume customers. I led a 75% variable cost reduction project that allowed us to optionally move Lumafield's 3D reconstruction pipeline from AWS servers to on-scanner CPU+GPU compute in exchange for a relatively small increase in scanner cost. During the project, I...
- established project milestones and test plans
- designed the software architecture with input from the embedded and backend software teams
- identified and delegated required hardware, electrical, and software tasks across teams
- implemented embedded software to ingest, process, and upload scan data
- deployed, monitored, and troubleshooted the rollout to Lumafield's first high-volume customer
