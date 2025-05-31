---
layout: post
title: "Video Game Design 6457 Notes"
tags:
  - video-game-design
  - omscs
  - cs6457
tocDepth: 2
date: 2025-05-31
updated: 2025-05-31
---
> [!info] Information
> I'm making these notes for the [Video Game Design](https://omscs.gatech.edu/cs-6457-video-game-design) class at Georgia Tech. These are being updated regularly on a daily basis so please bear with me.

Feel free to make a [PR](https://github.com/nkapila6/nk/pulls) to fix any issues. Do ⭐ the repo if this helped!

> [!warning] Warning 
> If the images do not render, please disable your VPN as the images are hosted on Imgur.

# 1 Game Engines

## 3 Simulation Concepts
We want to be able to create more and more realistic simulations that are more alike what we observe in reality. Could be some fantasy experience but should have sufficient familiarity with the real world.

Certain expectations about how things look, interact, should work, etc

To do this we have a strategy to build this around the frame based sim (frame based event loop).
eg: animations creating 10 frames per sec, etc

### Core Concepts of Frame-Based Simulation:
- Game engines build upon a frame-based event loop, adding components based on human perception to "trick" the user, such as ensuring animations are at least ten frames per second.
	- Some examples:
		- How does light reflect off surface?
		- How to create digital audio and play it off speakers?
		- Physics engine! Interaction of rigid bodies, etc
		- Different models for different things in the real world
- Various models are used to achieve this. These simulations model things at a higher level than underlying reality. Typical approach is "stitching" these isolated simulation components together. 
	- Alternative less common approach is unified simulation where high-level phenomenona emerge from lower-level simulations. 
		- Authors note: World models are changing this -> https://arxiv.org/abs/1803.10122

#### Example:
- Series Episode: A Matter of Minutes" from "The New Twilight Zone" is recommended as it relates to these simulation concepts. It explores being trapped in a simulation that functions much like video games with moment-to-moment updates (frame-based simulations).
- The episode accurately portrays simulation as a series of "time slices" (frames) that are constantly rebuilt. Humanoid automatons are depicted rebuilding each moment of time.
- Key concept is that we only need what is necessary for the observer to be built, to save resources which is vital for video game performance. This can lead to glitches if user sees outside rendered area in premise of episode.

### A frame is frozen in time
- In our computational kernel, a frame based event loop shares a common reference time (from start of frame processing).
	- All are targeting this common reference time. All = game objs, animations, sounds, etc
- Visuals are rebuilt from scratch
- Only simulate what is needed to create the illusion

Why is frame time fixed/frozen?
- Consistent output as all game objects animate by same amount of time.
- Avoid race conditions

### Only simulate what is needed
We only simulate what we need. If only what is observed is simulated, we don't care of computation of unobserved events. The game designer is to create a convincing illusion, not simulate everything.

E.g. peds in GTA disappear if you walk away from the map, even trees rendering as well. This is a tradeoff: frame rate vs computational load.

### Side effects of detail management
Side effects of this minimum effort (keep frame rates high) approach includes mistakes where illusion of reality breaks such as objects popping in and out of existence, crashing into magic trees when flying planes in GTA:SA.

Anything that breaks the illusion of reality: glitches, teleporting, etc. E.g. You're moving too speed in a car and another vehicle or train pops up, it should have popped up sooner but you're moving too quick for the simulation to keep up.
### Frame rates
- Bare min for animation is 10 FPS. Humans can notice imporovements in animation quality up to 60 FPS. Below 30 FPS is slow or choppy.
- There are diff between passively observing animation (movie) and interactive animation.
- In interactive cases, users perceive both animation quality and latency of input resp.
	- Achieving and perceiving these higer rates require capable computer displays and input devices that can match update rate.
	- Commercial games target 60 FPS, VR games may aim higher. Because they need to reduce motion sickness associated with head tracking.


## 4 Frame Rate Demo
Website: https://frames-per-second.appspot.com/

<img src="https://i.imgur.com/urHFSw7.png">

**Summary**:
- Motion blur can compensate for lower frame rates making animations appear smoother. Lower moon with more motion blur can look fairly close perceptually to higher frame rate.
- Increasing frame rate from 25 to 30 FPS shows huge improvement.
- Without motion blur, moon at 30 FPS updates slower and looks less smooth than one at 60 FPS.
- Motion blur creates more natural effect because human eye aggregates light over time perceiving fast moving objects as blur.
- Video games implement motion blur or achieve higher frame rates to look good.
- Difference between 30 FPS and 60 FPS is less noticeable when objects are moving at slower speeds.


## 5 Simulation Concepts (Continued)
### Why frames?
- Notion of frames is intuitive. Conceptually easy to understand - a tight loop that rapidly iterates one image after the another.
	- Can add more bits and pieces to our game quite easily.

- Builds off on what we know in terms of geometry describing visuals graphically.

- Entrenchment: classic animation like Disney movies. Frame based animation is effective because it tricks human perception into seeing continuous motion from rapidly displayed still images.

- To close, effective in tricking the user.

### Audio in simulations
Audio does not rely on frames as it is continuous but audo events triggered by frame-based simulations feed small buffers which are constantly topped off with audio data based on frame rate. This allows audio to play continuously while being in sync with discrete frame updates.

### Modern graphics rendering

![](https://i.imgur.com/d8xKQeV.png)

The hardware is highly parallelized. A virtual camera views the scene and GPU renders a snapshot of that moment in time. To manage synchronization and determine which objects are visible when rendering in parallel, a Z-buffer is used.

The buffer stores distance from camera for each pixel allowing render units to only write a pixel if calculated distance is closer than previously rendered ones. 


## 6 Side Quests - Breaking with Tradition
We have a good prior on frame based simulation, event loop, implications and requirements working with frame based concept.

The question arises is what we can do in order to break away from frame based simulation.

### Alternatives to Frame-Based Rendering

#### Ray tracing 
Has become commercially relevant for video games either by augmenting or potentially replacing conventional rasterization.

![](https://i.imgur.com/6PYvWmv.png)

Instead of rendering every px per frame, ray tracing gets a set amount of time and if not completed, a reduced number of updated px are sent to the screen.

![](https://i.imgur.com/XIaCi2I.png)

You can have a mixture of old and new px's but this leads to visual artifacts like speckling as some px are updated with rays and some are not. Can be minimized by updating each px at high rates.

A hybrid approach combines reduced px counts with adaptive frameless techniques to improve image quality.

### Moving Away from Surface-Based Rendering

#### Particle-Based simulation
- Approach models objects using individual particles rather than polygon meshes moving towards more fundamental representation of reality (which is our aim).

Example:
![](https://i.imgur.com/FqsTqv8.png)
Jelly in the sky game - particle based simulation technique with concepts of sparse matrices.

Particle forms solids and they form bonds with other solids. Heat from weapons melt these bonds causing materials to flow like liquids before cooling.

Challenges with particle-based rendering is maintaining strong structural bonds due to floating-point accuracy issues resulting in objects behaving like jelly than solids.

This methods allow modeling interior of objects and enables physical simulation of every tiny component which can lead to interesting gameplay.

### Challenges and Future Outlook
Transitioning away from conventional frame-based simulation is a challenge due to computational demands, would require simpler games or more powerful computers.


## 7 Synchronizing Real Time with Simulation
Video games being interactive simulations require careful synchronization of time in virtual world and real-world time. 

![](https://i.imgur.com/iRmYlBg.png)

Compared to non-interactive simulation like movies, video game operate on the computational kernel loop that processes input, updates simulation state, renders frames, etc. This strict time constraint requires highly optimized and efficient algorithms.

![](https://i.imgur.com/EJiKjx2.png)

### Diplay's impact on timing schedule

![](https://i.imgur.com/PJtx9ro.png)

#### The CRTs
Early display technologies like CRTs (yes, similar to the one in our old oscilloscopes) influenced how interactive simulations evolved. 

CRTs displayed images by scanning electron beam horizontally across lines and then moving to next line to fill screen. The phosphor glowed for a bit and required constant refreshing to avoid fading in. This display schedule led to problems like screen tearing if image data was out of sync with display's refresh rate.

#### LCDs
Even with LCDs, legacy CRT display schedules persisted which meant the shearing problem would still occur. To combat this, V-sync was introduced to ensure new frames are only displayed during vertical refresh period of screen to prevent tearing. 

However, even V-sync had limits such as input latency, if a frame misses the update window forcing display to show old frame for entire refresh period which drops the frame rate. 

This is why professional gamers disable V-sync for lower input lag. Latency (delay between input and response, basically ping in multiplayer games) is a critical concern for video games and can be enhanced by input hardware, network communication, processor design techniques like pipelining and caching which prioritize throughput over immediate response.

![](https://i.imgur.com/tTHqCQU.png)

#### Recent advancements
Recent advancements like adaptive V-sync (AMD FreeSync, NVIDIA G-Sync) aims to mitigate this by allowing display to choose it's own update cycle dynamically adjusting refresh rate to match frame rate of content and in turn avoiding tearing.

![](https://i.imgur.com/J0j35io.png)

### We're lucky
We're lucky to be working with an abstraction like Unity otherwise we'd have to manage many different aspects of our interactive simulation, i.e. video game. ☠️

DL plug: Similar to manually computing gradients in PyTorch ☠️ but using NumPy or multidim arrays instead.

![](https://i.imgur.com/dT1RHto.png)


## 8 Time Dependency Demo
The demo shows the RollABall tutorial but with a Ball having 3 rotating pills around it.

![](https://i.imgur.com/yyyIJJ1.png)

### Frame rate impact
- When the scene has low complexity (looking in direction with minimal detail), game maintains close to 60 FPS and pills rotate in sync.
  
- Once the scene complexity increases (goes brrr), FPS drops down to 20.
  
- During FPS drop, blue pills becomes out of sync (and red a bit).

![](https://i.imgur.com/1D00mVy.png)

### Sync implementation for pills
![](https://i.imgur.com/4TtLheD.png)

This script is attached to all 3 pills and has 3 modes.

#### Dumb Mode (for Blue Pill)
![](https://i.imgur.com/dADdVaS.png)
This mode applies constant rotation of 1 deg per frame update.

Intention is to rotate 60 deg per sec when game runs at 60 FPS but once the FPS drops to 20, the pill rotates 1 degree per second and results in slower rotation speed.

#### Variable Delta Time Mode (for Red Pill)
![](https://i.imgur.com/dADdVaS.png)
This mode uses `Time.deltaTime` which measures elapsed time from previous frame. The rotation is scaled by `degrees_per_second ** Time.deltaTime`.

When the FPS drops to 20, the `deltaTime` increases and compensates for slower updates. The pill is in sync, et voila!

#### Fixed Time Mode (for Purple Pill)
![](https://i.imgur.com/8uC0ahY.png)

This mode uses Unity's `FixedUpdate` callback which is a separate update cycle and can be called 0-many times in a single frame.

The rotation code is similar to dumb mode but because `FixedUpdate` adjusts how often it's called to align with real-world time. Even if the frame rate drops to 20 FPS, `FixedUpdate` might be called multiple times within a single frame to ensure total rotation is applied keeping the purple pill relatively in sync.


## 9 Synchronizing Real Time with Simulation - Time Dependency
We saw the 3 modes in our demonstration before. Below FYI.

![](https://i.imgur.com/ZVy5Y4q.png)

### Dumb mode
This method assumes that the game has a consistent 60 FPS and applies constant translation + rotation value in each update of computational kernel. The objects new position is simply old position + constant translation.

![](https://i.imgur.com/W1qYqGH.png)

**Advantages**:
- Low computational overhead.

**Disadvantages**:
- If FPS varies, object's speed will inconsistently speed up or down.
- Approach is suitable only if consistent FPS can be guaranteed.

### Time-Dependent Mode
New position is calculated as old position plus `velocity ** deltaTime`. `deltaTime` measures elapsed time from previous frame which allows simulation to compensate for frame rate changes by scaling rotation and movement.

![](https://i.imgur.com/Vsa5usC.png)

**Advantages**:
- Normalizes gameplay across different scene complexities and hardware differences.
- Game objs are aware of time variations and can compensate for them.

**Disadvantages**:
- Slight computational overhead due to multiplication. Becomes significant with many game objects.
- At extremely high FPS, `deltaTime` can be very tiny, leading to floating-point rounding errors, esp problematic with accelerations.

### Fixed Update Mode
Hybrid approach where game objects updates by a constant amount, assuming fixed frame rate. An external manager (computational kernel loop) determines how many times to call fixed update callback to catch up with real time.

![](https://i.imgur.com/AP2BYhD.png)

**Approach**:
- The Fixed Update manager tracks total `deltaTime` from previous frame and any remaining leftover time.
- Calculates number of fixed updates to run for current frame by dividing total `deltaTime` by fixed update period.
- It calls fixed update callback a variable number of times for all relevant objects to "catch up" with real-world time.
- If fixed update is higher than current frame rate, multiple fixed updates can occur per frame.
- Fixed updates DO NOT RUN in PARALLEL with normal frame updates; they are coordinated within main-frame based event loop (computational kernel loop).

![](https://i.imgur.com/8irHD88.png)

**Advantages**:
- Game objects can operate under assumption of constant time step which simplifies the time based computation and avoiding floating-point rounding errors associated with small `deltaTime` values.
- Beneficial for simulation aspects like physics but the trade off is that it can be unstable if not updated at small, controlled increments. Game engines abstractions like Unity run physics on a fixed update cycle for stability.
- Allows for lower update rates than actual frame rates, saves computation power (esp if on mobile devices).

![](https://i.imgur.com/ICX6UfA.png)

**Disadvantages**:
- If frame rate drops significantly, fixed update manager might call fixed update multiple times to catch up which again leads to increased computational load that can reduce FPS and cause a runaway condition.
- Fixed update can only be applied to subset of object and tasks. Rendering should always be tied to actual frame rate.
- Users can respond to state changes that occur in normal frame-based updates, not fixed updates because there can be multiple fixed updates per frame without corresponding visual feedback.
![](https://i.imgur.com/wa4XAWN.png)
- It will be challenging to coordinate logic between `Update` and `FixedUpdate` callbacks on same game objects as they have different schedules and presumptions.
- If fixed update rate is lower than frame rate, object may have jerky or staggered motion.
![](https://i.imgur.com/mSVtBhk.png)

## Time dependency in games
Most game aspects have time dependencies such as:
- moving game objects
- animation systems (picking appropriate frames or interpolating based on elapsed time)
- physics simulations rely on fixed update for stability
- artificial intelligence have a decision-making frequency
- probabilistic behaviors
- etc

Proper sync of these elements with real-world time is crucial for consistent and immersive player experience.


## 10 The Modern Game Engine
Modern game engines like Unity and Unreal are sophisticated software frameworks that include both runtime environment and comprehensive tools for creation, development and deployment.

### Early influences on Game Engines
![](https://i.imgur.com/MZGjdBf.png)

#### Sketchpad, 1960s
Sketchpad by Ivan Sutherland in 1960s was an exploratory software for design with focus on modeling geometric representations and spatial relationships with constraints. Highly influential on 3D modeling software, game level editors and tools working with 3D data.

![](https://i.imgur.com/7yC3kkQ.png)

Sketchpad with pen input on Oscilloscope.

#### Hypercard by Apple, 1987
Hypercard in Apple Macintosh in 1987 was one of software packages to have a WYSIWYG editing env with live preview. Allowed users to create multimedia experiences incl video games. You can draw 2D artwork, attach event callbacks to generate animation and audio - similar to Unity.

![](https://i.imgur.com/6vaSXcj.png)

## Early internal game engine tools
![](https://i.imgur.com/qQh14pH.png)

### Z-machine by Infocom
Early PCs had limited graphics and games relied on text input and output. Z-machine used a virtual machine concept allowing for high portability across different computers by writing an interpreter for each platform. These tools helped separate technical implementation from creative writing process.

### SCUMM
Repurposed from "Monkey Island", this engine offered tools for graphical work, image manipulation and animation sequences. 

## Early 3rd party game engines
![](https://i.imgur.com/mhvFPnF.png)
These engines appeared in late 80s/early 90s designed for average computer users but limited to specific game genres due to hardware constraints and tool design.

### First Person Shooter Engines
Rise of FPS engines such as id Software's Doom and Quake engines gained lot of popularity.

![](https://i.imgur.com/JFM4tzX.png)

Hobbyists reverse-engineered these and created their own editors (Doom Editor, Quake Editor) because id Software's internal tools were expensive to license (1mil for Quake) allowing users to build levels by laying out walls and rooms.

## Key Features of Modern Game Engines
![](https://i.imgur.com/u6Qwy4w.png)

- Declarative creation: Game creation done by configuring and defining constraints rather than writing extensive procedural code. 
- Platform abstraction: enables easy deployment to various platforms using same core assets and data models.
- Modern engines are standalone with IDE features such as WYSIWYG editors, robust asset management and content pipelines.

Evolution of FPS game engines can be seen [here](https://en.wikipedia.org/wiki/File:FPSChart.svg).

## Game Engine components
- Computational Kernel: Live simulation aspect incl input management, rendering, physics, audio, networking, scheduling (frame-based or fixed updates)
- Input management: focuses on efficient, low-latency code and platform abstraction to support various controllers.
- Graphics rendering engines: supports canonical rendering pipelines with gpu acceleration, geometry tools, space/vol partitioning for detail management, and linear math routines for direct graphic coding.
- Physics Engine: A constraint solver that simulates world coexisting with graphic and audio representations.
- Artificial intelli (AI): incls standard libs for path planning, behavior implementation and time scale support.
- Networking: addresses challenges like event sync, sync game objs for multiplayer, prioritization of info, prediction (guessing remote player actions for responsiveness)
- Event based archs: Most engines support this for software implementations, allowing for loosely code where game objs consume events without needing to know their emitters.

# 2 Animation

## Early Animation
in progress