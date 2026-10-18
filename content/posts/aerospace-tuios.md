---
title: "AeroSpace and tuios: Two Window Managers, One Option Key"
description: How to run AeroSpace and tuios together on macOS without fighting over the Option key, using an AeroSpace binding mode.
date: 2026-10-18
tags:
  - macos
  - aerospace
  - tuios
  - terminal
  - config
  - tools
---

So you installed [tuios](https://tuios.dev)! A whole window manager inside your terminal. Workspaces, a dock, a sidebar, tiling. You open Ghostty, press Option+1 to jump to tuios workspace 1, and... your entire Mac jumps to AeroSpace workspace 1 instead.

Welcome to the club.

I run [AeroSpace](https://github.com/nikitabobko/AeroSpace) to tile my actual macOS windows and tuios inside Ghostty to tile my terminals. Two window managers. Both of them think the Option key belongs to them. Only one of them can win, and it's always AeroSpace, because it registers its bindings as global hotkeys. The key never even reaches the terminal. tuios just sits there looking broken.

This post is how I got them to share. No rewriting either config, no retraining muscle memory, one extra chord.

> [!INFO] TL;DR
> Add a `tuios` binding mode to AeroSpace that binds exactly one key: the way out. Enter it with `alt-shift-;` then `t`, and every Option chord falls through to tuios. Press `alt-shift-;` again and AeroSpace is back. Also turn on Option-as-Alt in your terminal, or half the tuios keys won't parse anyway.

For reference: AeroSpace 0.21.3-Beta, tuios 0.10.1, Ghostty, macOS.

## Let's clear the air

- **Is this actually a problem or a skill issue?** It's a real problem. AeroSpace is i3-flavoured, so `alt-<anything>` is basically its whole personality. tuios also lives on Option for workspaces, splits and window cycling. Same keys, different jobs.
- **Can't I just use the tuios prefix?** You can. `Ctrl+B` is the tuios prefix (yes, same as tmux) and it works in both of its modes, so `Ctrl+B` plus a key always gets through. I tried living on it. It's fine for rare stuff. For jumping between workspaces twenty times an hour, it's a lot of extra keypresses.
- **Why not just rebind one of them?** Covered below. Short answer: I'm lazy and both sets of defaults are good.
- **Do I need Karabiner or skhd?** No. Everything here is plain AeroSpace config.

## Where they actually collide

Here's the overlap between AeroSpace's [default config](https://nikitabobko.github.io/AeroSpace/guide#default-config) and tuios's default keys. `tuios keybinds list` prints the full tuios table if you want to check yourself.

| Key                  | AeroSpace default                | tuios default                                 |
| -------------------- | -------------------------------- | --------------------------------------------- |
| `opt+1` .. `opt+9`   | `workspace 1..9`                 | switch tuios workspace 1..9                   |
| `opt+shift+1` .. `9` | `move-node-to-workspace 1..9`    | move window to workspace and follow           |
| `opt+h/j/k/l`        | `focus left/down/up/right`       | preselect split direction for the next window |
| `opt+tab`            | `workspace-back-and-forth`       | next window (terminal mode)                   |
| `opt+shift+tab`      | `move-workspace-to-monitor`      | previous window (terminal mode)               |
| `opt+n` / `opt+p`    | `workspace N` / `workspace P`    | next / previous window (terminal mode)        |
| `opt+shift+n` / `p`  | `move-node-to-workspace N` / `P` | next / previous tuios session                 |

That's pretty much every key you'd use to move around in tuios. The workspace row is the worst one. Both tools number workspaces 1 to 9 on Option, and your fingers will _not_ remember which layer they're in.

What doesn't collide: `opt+esc` (tuios: drop to window mode), `opt+arrows` (tuios: pane focus) and `opt+space` (tuios: launcher) aren't in AeroSpace's defaults. Small mercies.

## The options

**Move AeroSpace to another modifier.** Rebind everything to `ctrl-alt-` or a hyper key. Works, but it's a few dozen bindings to rewrite and years of `alt-1` muscle memory to undo. No thanks.

**Rebind tuios.** tuios lets you set any action to `[]` or a new key. But then tuios loses the keys that make it feel nice, and every tuios doc and video you read assumes the defaults. You'd be translating forever.

**Give AeroSpace a quiet mode.** AeroSpace has [binding modes](https://nikitabobko.github.io/AeroSpace/guide#binding-modes), stolen straight from i3. When you switch modes, every binding from the current mode turns off and only the new mode's bindings are live. So a mode with one binding in it is basically "AeroSpace, please sit down". Neither config gets worse, and tuios gets the whole Option key whenever I want it.

I went with the third one. Obviously.

## The tuios mode

Two pieces. First, a way in. AeroSpace's default config already ships a `service` mode on `alt-shift-;` (`alt-shift-semicolon` in AeroSpace's key names), so I hang the entry key off that:

```toml
[mode.service.binding]
# ...your usual service mode binds...
t = "mode tuios"
```

Then the mode itself, which binds exactly one thing, the way back out:

```toml
# only the exit key is bound so opt-* reaches tuios
[mode.tuios.binding]
alt-shift-semicolon = "mode main"
```

That's the whole trick. The flow:

1. `alt-shift-;` then `t`. AeroSpace goes quiet.
2. Use tuios like the docs intended. `opt+1` switches tuios workspaces, `opt+h` preselects a split, `opt+tab` cycles windows.
3. `alt-shift-;`. Back to `main`, AeroSpace owns Option again.

Why `alt-shift-;` to exit? It's the same chord that enters service mode, so there's one key to remember for "change AeroSpace's mode". And tuios doesn't use it:

```bash
tuios keybinds explain alt+shift+semicolon
```

reports it as free, nothing in tuios claims it. AeroSpace grabs it first anyway, but it's nice to know you're not shadowing something.

> [!WARNING] Invisible state is the enemy
> The one way this setup bites you: you forget you're in tuios mode, press `alt-2` to go to your browser workspace, and nothing happens. You will do this. Probably today.

Check which mode you're in with:

```bash
aerospace list-modes --current
```

If you run a bar like SketchyBar, put that on it. Seriously.

## Sticky or not

I keep the mode sticky. If I click over to the browser, I'm still in tuios mode until I exit. I bounce between Ghostty and docs constantly and don't want to re-enter every time.

One gotcha if you already have an `on-focus-changed` hook that forces modes. I have one that drops AeroSpace into a `passthrough` mode whenever a Parallels VM is focused. If that hook blindly runs `aerospace mode main` on every other focus change, it'll kick you out of tuios mode the moment you click anything. Make it check first, so it only leaves the mode it put you in:

```bash
[ "$(aerospace list-modes --current)" = passthrough ] && aerospace mode main
```

If you'd rather tuios mode end whenever you leave the terminal, flip that logic around:

```toml
on-focus-changed = [
  "exec-and-forget /bin/bash -c '[ \"$(aerospace list-modes --current)\" = tuios ] && aerospace mode main'",
]
```

All the tuios panes live inside one Ghostty window, so moving between panes isn't a focus change as far as AeroSpace is concerned. Only leaving the terminal is. And the AeroSpace guide says callbacks are "recursion resistant", so switching modes inside one won't loop.

## The part that bites everyone: Option on macOS

Even with AeroSpace out of the way, macOS treats Option as a compose key. Option+e is a dead key, Option+n waits for a second key, and lots of terminals rewrite Option+arrow into readline word jumps. tuios maps most of the composed characters back to chords (which is why `opt+1..9` work out of the box), but not all of them.

Fix it in the terminal. For Ghostty:

```ini
# left option sends alt so tuios opt-* binds work
macos-option-as-alt = left
```

I only flip the left Option so the right one still types `£` and friends.

The [macOS section of the tuios keybinding docs](https://tuios.dev/docs/keybindings#macos) has the equivalent setting for kitty, iTerm2, WezTerm, Alacritty and Terminal.app.

Two more tuios keys that are weird on macOS:

- **`opt+space` opens the launcher**, except macOS types a non-breaking space there. Use `Ctrl+B a` instead.
- **`ctrl+p` opens the command palette**, which steals history-back from fish. Set `command_palette = ["ctrl+shift+p"]` under `[keybindings.global]` if that annoys you.

And when something still feels off, run `tuios keybinds doctor` before guessing. It tells you which binding is live in each scope, what clashes with what, and which keys never reach the program in the pane.

## Closing thoughts

What I like about the mode approach is that nothing gets worse. AeroSpace keeps its defaults, tuios keeps its defaults, and the cost is one chord to hand the keyboard over. The only real downside is the invisible state, and a bar fixes that.

Side quest: if you also want Neovim to follow whatever tuios look you're running, I wrote [tuios-look-sync.nvim](https://github.com/nkapila6/tuios-look-sync.nvim) for exactly that.

## Changelog

- [18.10.2026] Init.

---

> "Two window managers walk into a keyboard. Only one of them gets the Option key."
>
> _(The other one gets a binding mode and learns to wait its turn.)_
