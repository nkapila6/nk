---
layout: post
title: On Linear Classifiers
tags:
  - cs7643-deep-learning
  - omscs
categories:
  - course-notes
date: 1719480819419
updated: 1723444048189
draft: "true"
---
	
![Screenshot\_20240627-125542.png](/resources/fb9bc7cc1fc144c5b094d3ca9b94f53a.png)

A linear classifier has 3 viewpoints: algebraic, geometric and visual (template of an image, i.e. filter)

Other loss functions exist that have different inductive biases… log loss (or cross entropy loss) instead of multi-class SVM loss.

log loss gives a probabilities, i.e. interpretation to the scores predicted by the classifier as probability distributions.

![Screenshot\_20240627-132901.png](/resources/5d512e785d9044f6ad95fc254ddcd5d6.png)

![Screenshot\_20240627-132724.png](/resources/f9753a6b8b5345298303f42da59dbee0.png)

![Screenshot\_20240627-133228.png](/resources/edb7c832f2d34f9f9cb74f259a55c050.png)

Regularization helps set preferences on specific weights i.e. classifiers.

- What type of classifier do we need?
- Spreading out the weights in the weights matrix.
- ^ This helps adding curvature to the loss.
- Avoid overfitting is obvious.

Many types of regularizers exist: L1, L2, etc

- L1 regularisers give more importance to a single feature.
- L2 regularisers try to spread out the contribution and give equal contribution to each feature. For instance, when you feel that some features are noisy so you would want more contribution from many features.
- Regularization has a bias to prefer simpler models: OCCAMS RAZOR… again.
