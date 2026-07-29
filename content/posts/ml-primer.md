---
layout: post
title: "A ML Primer: Presentation to UAE SWE Group"
tags:
  - machine-learning
date: 2025-11-11
updated: 2025-11-11
---

A couple of weeks ago I gave a short presentation called "ML Primer" to the UAE software engineering group in Dubai. The meetup was on November 9, and the room was full of engineers who build real systems and wanted to know how machine learning actually fits in. I enjoyed it more than I expected.

<center><img src="/posts/resources/uaenov9swe.jpg" /></center>

The photo above is from right before we started. I had spent the week before simplifying the deck because I did not want to walk in and dump equations on people. My goal was simpler: help the audience form a useful mental model for ML before they picked a framework.

That mental model is what this post is about.

## Machine learning is not magic

This is the first thing I said, and I still think it is the most important. Machine learning is a toolbox of algorithms. Each one has assumptions baked in about what kind of patterns it can find and what kind of patterns it prefers. Those assumptions are called inductive biases, and they come in two flavors.

Restriction bias is what the algorithm can represent at all. A linear model can only draw straight decision boundaries. A decision tree can represent more complex shapes, but only by stacking axis-aligned splits. A neural network can approximate almost any continuous function if you give it enough parameters, but that is capacity, not a guarantee that it will learn the right thing.

Preference bias is what the algorithm prefers within the space it can represent. Decision trees prefer short trees with high-information splits near the root. SVMs prefer decision boundaries with the largest margin. Neural networks prefer smaller weights and smoother functions when regularized properly. Two algorithms with the same restriction bias can produce completely different models because their preference biases differ.

I wrote more about this in my post on [Algorithmic biases in supervised learning](/posts/sl-biases). The ideas are the same whether you are fitting a decision tree in scikit-learn or fine-tuning a transformer. The vocabulary just gets fancier.

## Understand the problem before you reach for deep learning

This was the practical core of the talk. I see a lot of engineers default to deep learning because it feels modern, but that is usually the wrong first move. Deep learning has low restriction bias, which means it can represent almost anything. That flexibility is powerful, but it is also expensive, data-hungry, and easy to overfit.

Before you choose an algorithm, you should know what you are trying to represent and what you have to represent it with. How much labeled data do you actually have? What does the feature space look like? Is the relationship probably linear, or is it highly nonlinear? Do you need interpretability, or do you just need predictions? Those questions matter more than whether your model has attention.

I am not saying deep learning is bad. I use it. But it is a tool, not a default. Sometimes a logistic regression or a gradient-boosted tree is the right answer, and sometimes it is the right answer by a large margin.

## ML is still engineering

For people coming from traditional software, the shift can feel uncomfortable. In normal engineering, you write explicit rules: if this happens, do that. In machine learning, you collect data, define a target, pick a model, and let the algorithm learn the rules from the patterns.

That does not mean you stop being rigorous. It means your rigor moves upstream. Your job becomes defining the problem correctly, choosing a model whose biases match the problem, cleaning data carefully, validating honestly, and measuring the right thing. The bugs just move from code into data, assumptions, and evaluation.

A learned system is still a system. It has inputs, outputs, failure modes, and maintenance costs. Treat it that way.

If you want to see the deck itself, the [slides](/posts/resources/mlprimer.pptx) are here. The full source for the talk is in the [session repo](https://github.com/nkapila6/nov9-uaeswe). The slides file is large because it includes the images and assets from the talk, but it should give you the full flow.

Thanks to the UAE SWE group for having me. These conversations always force me to clarify what I actually believe, and that is the best kind of practice.

## Changelog

- [11.11.2025] Init.
