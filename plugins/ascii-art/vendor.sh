#!/bin/sh
# pulls the ascii.rest runtime plus the listed pieces into quartz/static/ascii
# usage: plugins/ascii-art/vendor.sh [extra-piece ...]
set -eu
cd "$(dirname "$0")/../.."
out=quartz/static/ascii
base=https://ascii.rest
pieces="not-found hourglass fireworks morse desert-night bonsai lighthouse typewriter
python go typescript c cpp zig fedora linux-mint debian $*"

mkdir -p "$out/pieces" "$out/fonts"
for f in ascii.js library.js mount.js; do curl -fsSL "$base/$f" -o "$out/$f"; done
curl -fsSL "$base/fonts/ascii-rest-mono.woff2" -o "$out/fonts/ascii-rest-mono.woff2"
# serve the fallback font from our own domain
sed -i.bak "s#https://ascii.rest/fonts/#/static/ascii/fonts/#" "$out/ascii.js" && rm "$out/ascii.js.bak"
for p in $pieces; do curl -fsSL "$base/pieces/$p.js" -o "$out/pieces/$p.js"; done
grep -l 'ascii\.rest/' "$out"/*.js "$out"/pieces/*.js || true
