---
layout: post
title: "How to interpret Blackjack policy maps?"
tags:
  - machine-learning
  - omscs
  - "#cs7641"
aliases:
date: 2024-11-16
updated: 2024-11-16
---

<center><img src="https://i.imgur.com/X7jLV47.png"></img></center>

The rows 0-28 are the 29 states which the player (your agent) can have. The columns 0-10 are the 10 states which your opponent (the dealer) has.

- H4-H21 (rows 0-17) are hard hands which means that your agent does not have an ace or it's considering the ace as 1.
- S12-S21 (rows 18-27) are soft hands are hands with an ace counted as 11.
- The BJ state is a special case where a player has an ace + a card with value 10 (joker, queen, king).

The same reasoning applies to the opponent (dealer) as well. These can be seen here: [https://github.com/jlm429/bettermdptools/blob/master/bettermdptools/utils/blackjack_wrapper.py](https://github.com/jlm429/bettermdptools/blob/master/bettermdptools/envs/blackjack_wrapper.py)

0,0 (first row, first column) means your agent has a hard 4 (4 without ace) and your opponent has a 2. Therefore, your agent decides to H (hit, draw more) which is the right thing to do.

