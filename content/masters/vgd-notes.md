---
layout: post
title: "Video Game Design 6457 Notes"
tags:
  - video-game-design
  - omscs
  - cs6457
tocDepth: 3
date: 2025-05-31
updated: 2025-05-31
---
> [!info] Information
> These notes are incomplete and will not be updated. It was really tough to keep up to date with the lectures and the assignments in the summer semester!
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

## 1 Early Animation
### History from Earliest Days of Animation

#### Prehistoric Cave Art: 
![](https://i.imgur.com/MTKJ8CS.png)

Speculation suggests that flickering firelight might have illuminated multiple painted legs on animal figures in cave art creating primitive sense of animation.

#### Shadow Play
![](https://i.imgur.com/GGkuYCG.png)

Evolved from simple shadow project by human actors to more elaborate form combined with puppetry.

#### Puppetry (4000+ years old)
![](https://i.imgur.com/tL8TysM.png)

Involved manipulating artifacts/puppets with strings, sticks or direct human operation to create animated performances demonstrating early 3D animation.

#### Magic Lanterns (>1600)
![](https://i.imgur.com/z8JLmj2.png)

Optical projection system that showed sequences of painted glass slides onto a wall. Later versions incorporated mechanical components on the slides, allowing for layered movement and crude animations through levers or dials.

#### Automata
![](https://i.imgur.com/JshqMdg.png)

Mechanical devices that mimic human beings powered by gears, levers, springs, similar to clockwork. Examples incl music boxes or devices that can write signatures.

#### Phenakistoscope (1833)
![](https://i.imgur.com/4NqJg6j.png)

An early device resembling pinwheel with slits and images. When spun, looking thru split created illusion of motion by aligning eye with successive images. Demonstrating early concept of "frames" in 2D animation.

#### Zoetrope
![](https://i.imgur.com/ulefnzo.png)

A refined Phenakistoscope. Eliminated the need for a mirror by placing images inside a rotating cylinder with viewing slits, allowing for continuous animation.

#### Flipbook / Kineograph
![](https://i.imgur.com/4zjeW9a.png)

Straightforward animation method where sequential imgs on pages are rapidly flipped to create motion.

#### Early Films
![](https://i.imgur.com/UHGPZR8.png)

Demonstrated capturing and playing back real-world motion. Film cameras achieve this by rapidly advancing film, stopping it, opening a shutter to expose a frame, closing the shutter then quickly advancing to next frame.

The mechanical process creates distinct noises due to rapid acceleration and deceleration of film.

#### Rotoscope by Max Fleischer (1915)
![](https://i.imgur.com/6a1nojU.png)
![](https://i.imgur.com/BBewPSk.png)

A technology that projected live-action film footage one frame at a time onto frosted glass, allowing artists to trace over images to create animations. This technique helped achieve smooth, dimensional accurate animations seen in early cartoons like Koko the Clown.

![](https://i.imgur.com/kRqFxxN.png)

![](https://i.imgur.com/oP62LPi.png)
#### Live-Action reference
![](https://i.imgur.com/z2gBOmL.png)

Disney transitioned away from rotoscoping to this method where actors were filmed but animators used footage as inspiration for artistic interpretation and exaggeration of movements and facial expressions, providing more control than direct tracing.

#### Disney's 12 Principles of Animation Book (early 1980s)
![](https://i.imgur.com/4Xb5nBa.png)

A well-regarded set of concepts for animated feature films. Two key principles are "squash and stretch" (exaggerating deformation of objects to convey motion and impact) and "exaggeration" (amplifying movements and expressions for artistic effect)


### Early Interactive Animation (Pre-Computer)

#### Interactive Automata / Penny Arcades (Late 1800s, early 1900s) 

![](https://i.imgur.com/piIshIq.png)

Mechanical games, often found in arcades, that used puppet-like interfaces or simple analog circuits. Examples include fighting games, bowling, and baseball machines where user input controlled animated elements.

#### Simulators
![](https://i.imgur.com/QPyYGjE.png)

Link Trainer (WWII) is an early flight simulator focused on simulating instrument panel readings and user controls providing tactile feedback w/o ext. visual animation.

![](https://i.imgur.com/lqYbYWk.png)
![](https://i.imgur.com/5b87NYk.png)

Aetna Drivotrainer was a driving sim used in schools which featured projected first-person driving imagery and simulated controls. Notable feature was a config where user i/p could pause or advance film reel, making on-screen animation responsive to user actions, precursor to modern quick-time events.

The system scored student performance by punching holes in a card.

## 2 Interactive Animations in VGs

### Early Video Game Animation

#### Vector Graphics
![](https://i.imgur.com/UmaUsu9.png)

Used in early cathode ray tubes (CRT) display specifically oscilloscopes which allowed arbitrary aiming of electron beam to draw smooth and crisp lines.

Tennis with Two (1958) made with analog circuits led to debates about whether it qualifies as a computer game.

Spacewar (1962) ran on a PDP-1 computer with a CPU making it a definitive computer game. Featured simple vector-drawn spaceships and a physics simulation.

#### Raster Display Games
![](https://i.imgur.com/yyD1NPs.png)

Pong used discrete logic instead of a CPU due to high cost of processors at the time. Development was difficult and graphics were limited to drawing lines or axis-aligned polygons.

#### Sprites
![](https://i.imgur.com/Pw2XrvE.png)

Taito Basketball (1974) was 1st game to use sprites and depict human form on screen.
![[https://i.imgur.com/pTKywLI.png|{width=50%}]]
![](https://i.imgur.com/pTKywLI.png|100)

Sprites were a 2D arr of px values copied to diff screen locs for anim. This allowed artists to have more freedom in px art.

Animated sprites were achieved by swapping similar looking sprites rapidly. Early systems had limited mem so sprite poses were few.

Early color displays used ref to a color table instead of storing RGB values per px due to mem limits. Many sprite-based sys had specialized HW for eff. sprite rendering.

#### Text mode anim
Early PCs designed for txt-based work used extended char sets with line segs and fill patterns.

Creative devs used these chars to draw graphic repns and achieve anim by rapidly swapping char data.

#### Color cycling
A technique where subset of color palette is continuously shifted creating illusion of movement in static artwork.

e.g. anim of water in Pokemon GBA games

### Dragon's Lair (1983)
![](https://i.imgur.com/AuBsAeG.png|{width=50%})

Used LaserDisc, analog media format providing HQ vid and audio with digital index for scene jumping.

Allowed for "quick-time events" where where player input dictated progression to diff pre-recorded scenes. Sacrificed interactivity for media quality feat. elaborate cartoon-style anim.

### Rotoscoped games
Anims created by tracing over live-action footage, offering fluid and realistic char movements.

![](https://i.imgur.com/osOnSxx.png)
![](https://i.imgur.com/aVFXJBb.png)


**Prince of Persia (1989)**: Used Jordan Mechner's bro for char movements and Errol Flynn's "Adventures of Robin Hood" for fighting seqs. Anims were tightly coupled to character movement, improving aesthetics and preventing foot sliding.

![](https://i.imgur.com/vNxAs1k.png)

**Amiga Dragon's Lair (1989)**: A notable port that vectorized the original laser disc's foreground chars and combined them with scanned bgs to fit on floppy disks.

**Another World (1991)**: Eric Chahi created this game by filming himself and rotoscoping the footage to generate anims and art.

### Wireframe 3D in Battlezone (1980)
![](https://i.imgur.com/jqYwfg7.png)

Used vec-based disps to show wireframe 3D graphics simplifying rendering by avoiding occlusion and hidden surface concerns.

### 2D Sprites with Scaling and Rotation
![](https://i.imgur.com/xR3jyne.png)

Specialized hardware feats like Super Nintendo's Mode 7 allowed for real-time scaling and rot of 2d bgs and textures creating effects like perspective and foreshortening (Mario Kart) and dynamic boss fights (Bowser in Super Mario World).

Modern games like Terraria (with mods) feat. sprite rotations as feasible gameplay element.

### Ray Casting and Billboards
![](https://i.imgur.com/ckWAfFM.png)

Wolfenstein 3D/Doom used ray casting for limited 3D indoor envs. Enemies were repn by billboards - 2D textures scaled for dist. Rot of billboards achieved by swapping pre-rendered sprites from diff. perspectives.

![](https://i.imgur.com/yJPO7Gu.png)

Wing Commander applied scaled and rot'ed sprites for spaceships in space combat.

### Transition to True 3D anim
#### Vertex-based Keyframe anim
Quake was first game to achieve realtime 3D env with anim chars. Anims used keyframes where each frame stored an arr of ordered vertices applied to a triangle mesh. Anims ran at 10 FPS leading to clunky char movement even at high FPS. 

![](https://i.imgur.com/i1im3jH.png)

Method had significant mem consumptions due to storing every vertex's pos for each keyframe making it unscalable for complex models.

![](https://i.imgur.com/cLFib7F.png)

![](https://i.imgur.com/Z63sJni.png)

#### Interpolated Keyframe anim
![](https://i.imgur.com/4pLL0zW.png)

Alone in the Dark (1992) was one of the first games to use interpolated keyframe anim resulting in smoother movement.


![](https://i.imgur.com/GZpE6J6.png)

Quake 2 maintained vertex-based keyframe storage but introduced linear interpolation between 2 keyframes based on the `deltaTime` to achieve smoother animation even at lower FPS.

![](https://i.imgur.com/nXoaLRG.png)

Obtain current frame and next frame. Linear interpolate (lerp) the two.
### Computer-Assisted Anim
#### Procedural anim
![](https://i.imgur.com/VWAXod5.png)

Procedural anim generated anim using algos suitable for cyclic, repeating movements like clocks or machinery.

#### Phy-based anim
![](https://i.imgur.com/OYoMZ6g.png)
![](https://i.imgur.com/sw9i2Rh.png)

Phy-based anims integrated phys-sim for realistic char or obj movement.

#### Motion capture (Mocap)
![](https://i.imgur.com/CevXzpu.png)

Mocap captures real-world perf to drive 3D models. It's an evo of rotoscoping providing full 3D data. Used for facial expressions and full-body capture in games like Naughty Dog's "The Last of US" and "Uncharted".

![](https://i.imgur.com/XeDd6Y9.png)


4D Boxing (1991) was early example using rotoscoping from multiple perspectives known for fluid anims and good ctrl. One of the first mo-cap games.
### Skeletal anim
![](https://i.imgur.com/g26Y8wf.png)

Decouples char movement from individual mesh verticies. Abstract skeleton deforms arbitrary complexity mesh.

Much more mem-eff than vertex based aim because only skeleton's keyframe are stored not every vertex for each frame.

Keyframe interpolation is applied to skeleton's pose and mesh is deformed based on interpolated pose.

Skeleton is a tree structure starting from root bone (hip) with 3 or 6 DOF. Other bones have 1, 2, or 3 DOF.

Vertex weighting allows each vertex of mesh to be assigned a weighted list of bones to influence its position. This allows for smooth deformation esp at joints. Rigging is process of creating and aligning skeleton mesh and assigning bone weights.

![](https://i.imgur.com/W4MTb3Z.png)

**Advantages**: Huge mem savings, good for anim blending, improved anim portability and reuse.

**Disadvantages**: implementation difficulty, computational overhead, and challenges with realistic mesh deformations which might require phys or advanced algos.

Half-Life (1998) was one of the first games to use skeletal anim, enabling complex char and cutscenes.

Squash and stretching can be achieved in skeletons by manipulating skeleton dims to create cartoony, expressive movements, eg: Jak and Daxter games. One of my old PS2 games 😎

![](https://i.imgur.com/DBzQE2c.png)

### Advanced Anim Techniques
#### Root Motion
![](https://i.imgur.com/QBt6xBn.png)

embeds char translation within anim of root bone. Game engines interprets this motion to move associated GameObj ensuring precise foot placement and matching char movement to anim's inherent speed variations.

**Benefits**: Realistic footfall, natural accel/decel, better interaction w env phys and empowers artists more control over char movement

**Control**: Can be selectively applied to allow phys to handle vertical motion.

#### Animation Blending
![](https://i.imgur.com/kT36lvI.png)

Interpolating bw multiple distinct anim based on i/p params. This creates a continuous range of movements from a limited set of core anims.

**Benefits**: Reduces authoring effort, storage reqs and provides cont space of anim.

**Challenges**: "Bunny hop" effect occurs if blended anims are dissimilar or misaligned, e.g. feet hitting at diff points in resp cycles.

**Anim masks/layers**: Allow blending specific pts of a char while other pts use diff anims avoiding undesirable blending artifacts.

#### Match targets
![](https://i.imgur.com/ZA3WlOa.png)

A util method in Unity for lerp of anim transforms to align char's body pt with specific world coord. Used for precise interactions like ledge grabbing or opening doors, often involving a time-based correction.

#### Inverse Kinematics (IK)
![](https://i.imgur.com/zOvRBVf.png)

Forward Kinematics (FK) is a traditional scene graph approach where parent transforms dictate child transform down the hierarchy.

IK calculates reqd rots/translations of parent joints to achieve desired pos for child/leaf joint.

**Challenges**: Non-trivial to calc, can be impossible or ambiguous.

**Applications**: Correcting anims, picking up objs, char head looking at targs, assisting in anim authoring.

![](https://i.imgur.com/8cczptk.png)

Unity's IK allows setting pos and rot goals for extremities (feet, hands, head) with adj weights to blend with existing anims.

Early examples were Terra Nova and Trespasser.

**Tresspasser**
![](https://i.imgur.com/1k83XS8.png)

**Terra Nova**
![](https://i.imgur.com/9tgZk8w.png)

#### Anim retargeting / muscle spaces
Allows reusing anims from one humanoid skeleton on a diff rigged model even if dims mismatch.

Unity's "muscle space" defines norm joint movements and joint limits for each skeleton enabling mapping anims b/w diff humanoid chars.

May require manual corrections for interpenetration or awkward movements if skeletons are very dissimilar.

#### Quaterunions for rot interpolation
Used in game engines to repn rots because they avoid "gimbal lock" (problem with Euler angles where certain rots can lead to loss of DOF) allowing for reliable lerp and smoother blending of rots.

![](https://i.imgur.com/fxwH5g5.png)

# 3 Physics Engines
## What is a Physics Engine?
A physics engine is a service that provides physics sim calculations for a virtual env.

There are 2 types:
- **High Precision Offline Engines**: Used for scientific preds such as design structs and automobiles.
- **Real-Time Physics Engines**: Used for interactive simulation with emphasis on video games.

Many different available physics libraries and have similar rigid body physics capabilities.

![](https://i.imgur.com/yjO5D0Q.png)

- **Popular Engines:**
    - **Havoc:** A commercial engine used in _Half-Life 2_.
    - **Newton Open Dynamics Engine (ODE):** An open-source engine.
    - **Nvidia PhysX:** Integrated into Unity. It evolved from NovodeX, which was acquired by Aegia and later by Nvidia.
        
- **Influential Games:**
    - _**BeamNG.drive**_: A car game demonstrating cutting-edge, deformable phy objs.
    - _**Bridge Builder**_ **(early 2000s):** A 2D game where players build bridges to get a train across a river, managing resources. _Poly Bridge_ is a popular recent version.
    - _**Trials**_ **series:** A motorcycle game based on controlling a driver's weight, throttle, and brakes to navigate obstacles.
    - _**Trespasser**_: One of the earliest games with a powerful phys engine, first to use ragdoll phys.
    - _**Half-Life 2**_: Known for its gravity gun and influential physics simulation.
## Components of a Physics Engine
A physics engine is composed of several key elements:
- **Bodies:** The objs in the sim, usually rigid bodies.
- **Connectors (Joints):** Ways of attaching bodies together.
- **Forces:** Mechanisms for acting upon and moving bodies.
- **Constraints:** Rules that limit motion. sometimes conceptually merged with connectors.
- **Collision Detection:** A service that can be used to detect geometric intersections, sometimes independently of the full physics sim.

## Body States and Control
![](https://i.imgur.com/dqNkymw.png)

- **Dynamic:** Objects affected by forces like gravity and collisions; they can move around.
- **Static:** Objects that cannot move, like the ground or walls. They are treated as having infinite mass and improve simulation efficiency.
- **Kinematic:** Objects controlled programmatically by a programmer or animation system. They can interact with and push dynamic objects
- **Sleep/Awake**: To save resources, obj stopped moving can be put to sleep. Wakes up when it rejoins sim if another obj touches it.
- **Layers/Groups**: Objs can be assigned to diff layers that may or may not interact with each other. Crucial to opt perf for gameplay.

### Properties of bodies
- Core props are pos, orientation, velocity,  angular velocity.
- Mass determines how objs react in collisions.
- Friction affects how object slides against each other. High friction can cause an object to topple or roll down a slope instead of sliding.
- Restitution (bounciness): determines how bouncy an obj is on collision.

## Collision Geometry
Collision hulls reduce complexity of collision calc. The actual act of detecting collision is dependent on the complexity of the shapes involved.

- Determining a collision with spheres is simple and faster.
- Complex visual models often repn by simpler shapes for phys calcs. E.g. car as box and human char as a capsule.
- **Compound collider**: A complex shape can be approximated by joining several simple convex shapes together. In Unity, this is done by parenting multiple colliders to a single parent obj with a rigid body. Easy to make in Unity!
![](https://i.imgur.com/6luQZz3.png)

- **Convex Hulls**: A convex hull is a complex, concave shape wrapped in a simpler calculated convex shape.
- **Hierarchical Hulls**: A hierarchical hull is a complex obj broken into hierarchy of bounding boxes. 

![](https://i.imgur.com/1UcGAMG.png)

Worst case is you have to work all the way down to the leaf of the hierarchy. But we're more concerned about the average. Tests are performed with largest outermost box proceeding to smaller detailed boxes only if collision is detected at a higher level. This is efficient on average because most checks fail at outermost lvl.

### Skin width
Dilation or expansion of the geometry. Like a skin on top of the true geometry which allows you to expand their geometry. Collisions are detected when the skins touch before actual geometries do, this allows corrective forces to be applied gradually and proportionally to depth of skin interpenetration. Smooths out interactions and eliminates jitter.
![](https://i.imgur.com/ieSxh3w.png)

## Strategies of collision detection

### Discrete collision detection
![](https://i.imgur.com/1Vscu3U.png)

We have a projectile represented by a circle (no gravity effect). The ball has various pos at different time t's, the ball is moving at a certain velocity so the displacement is $d = dt*v$. This displacement $d$ is the same if our $dt$ is the same.

At each of the timestamps, we perform this collision detection (geometry intersection). At t5, we can see a collision is detected and we can invoke a collision resolution to respond to this collision detection.

#### What if we have a skinny wall?

![](https://i.imgur.com/meQI0Gp.png)

After t5, we're on the other side of the wall and it still doesn't intersect. This is called tunneling when our collision detection is only checking for a snapshot of the time, i.e. a fast moving obj can pass completely through a thin object between frames without intersection ever being detected. This is more likely with small objs and thin walls.

There are many resolutions to this.
 ![](https://i.imgur.com/raZyjiJ.png)
![](https://i.imgur.com/LTYShxy.png)

**Raycasting**: A ray is cast from obj's prev pos to it's current one to see if it intersects anything in between. This can fail at edges of objs or at seams between objs.

Let's add more raycast to fix it! 
![](https://i.imgur.com/Y0Q1v64.png)

While this will allow us to catch skinny walls/seams in the wall, this is computationally expensive.

![](https://i.imgur.com/S4DMoOm.png)
But what if your object is too small? It fails again!

![](https://i.imgur.com/w8MH9Pp.png)

**Speculative collision detection**: Objs are given a dynamic skin width that expands based on velocity. Large geometry is more likely to be detected but can fail under high accel.

![](https://i.imgur.com/UKXATve.png)

**Rotating and translating colliders**: Fast rotations make all prev techniques tricky. Unity (PhysX) fix this by setting a maxAngularVelocity, i.e. speed limit on rotation.

Raycasting is difficult. The way to solve this is, you don't rotate the axe but you make a disc with motion blur and detect collisions. But if accurate axe is required, then this maximum setting is at play to slow down the rotation.

![](https://i.imgur.com/ZfRNmMK.png)

**Dynamic sub-stepping**: engine increases sim freq for objs close to a potential collision, effective but adds overhead. Most effective method for high acc. 

## Collision Dynamics
How we will resolve our collision? When 2 objs collide with each other, I want something to happen. How will this resolution process occur?

### Penalty Force Method
One of the early approaches driven by resource reqs, was used in the game *Trespasser*. 

When objects interpenetrate, a force is applied at a single deepest point of penetration. Used by the *Trespasser* game.

Can be unstable and cause objs to oscillate, jitter and slide around as if on air, making stable stacking nearly impossible.


Some improvements on penalty force methods:
- Relax contact criteria via skin width
- Consider all collision contacts
- Find a soln that addresses all constraints introduced by collision contacts.

### Modern constraint-based methods

#### Skin width
![](https://i.imgur.com/ic7Enad.png)

**Skin width**: This method uses a skin or expanded geometry around colliders. Collisions are detected when the skins touch, allowing corrective forces to be applied before actual geometries interpenetrate.

![](https://i.imgur.com/m7hRpM3.png)

If the actual geometries intersect (e.g., due to a switch from animation to physics control), the engine applies a massive corrective force, which can cause objects to launch into the air unexpectedly.

Sometimes this doesn't work properly, for e.g. when objects are stacked, in game objs exploding causing frame rates to drop, etc. Leads to inner geometric intersection which leads to extreme corrective force applied.  

**Proportional force**: The corrective force scaled based on how deeply skins have penetrated, smooths out interactions and eliminates jitter.

**Sequential impulse**: Instead of solving all contact points simultaneously, engine iterates through each contact point and applies a sequential corrective impulse.

## Physics Constraint Solver
RT solutions are usually iterative and based on linear-complementary problem with Jacobian constraints.

![](https://i.imgur.com/34nYyv4.png)

## Adv Phys Concepts

### Forces & Connectors

**Forces**: Can be applied as a continuous `Constant Force` (like gravity) or an instantaneous `Impulse` (like a character jumping). Forces are typically applied to an object's center of mass.

**Connectors**: Attach bodies together and restrict their motion. Examples include hinge and ball-and-socket joints.

![](https://i.imgur.com/3LwI3Ls.png)

**Soft vs. Hard Constraints:** Hard constraints must be perfectly met, which can cause objects to get stuck. Soft constraints allow for some flexibility, leading to more stable and playable behavior.

![](https://i.imgur.com/6AqLUTb.png)

### Ragdoll Physics
![](https://i.imgur.com/IE6cbwJ.png)

A char's body is approximated by a collection of primitive rigid bodies linked by joints.

These physics objects are not rendered; instead, they drive the pose of the character's animation skeleton.

Typically, a char is controlled by animation (kinematic control) until an event like an explosion occurs. At that point, physics takes over, and the character collapses realistically.

Blending physics simulation with animation is complex and can be a source of bugs.

### Fully phys chars
Having characters that are 100% physically simulated is an immense AI and robotics challenge, as a bipedal form is inherently unstable.

Adv techniques blend animation with physics to create more realistic and responsive movement, such as reacting to being pushed or having a kick stopped by an obstacle.
