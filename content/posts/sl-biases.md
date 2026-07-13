---
layout: post
title: "Algorithmic biases in supervised learning"
tags:
  - machine-learning
  - omscs
  - "#cs7641"
aliases:
date: 2026-01-03
updated: 2026-06-28
---

Scattered thoughts about a few supervised learning algorithms and their restriction and preference biases. Originally written as CS7641 midterm prep, forked from [downey.io](https://downey.io/notes/omscs/cs7641/restriction-and-preference-bias-supervised-learning/) with additional context from me.

If you're here from the [agents roadmap](https://nkapila.me/posts/backprop-agents), this is the kind of thing I mean when I say "every algorithm has inductive biases. Learn them. They show up everywhere downstream." The biases you learn here: what your model can represent and what it prefers: don't go away when you switch from decision trees to transformers. They just get more subtle.

## What is Restriction Bias

Restriction bias is the representational power of an algorithm, or the set of hypotheses our algorithm will consider. In other words, restriction bias tells us what our model is able to represent. A linear classifier can only represent linear decision boundaries. A decision tree can represent any boolean function, but the size of the tree grows with the complexity of the function. A neural network with enough hidden units can approximate any continuous function (Universal Approximation Theorem), but that doesn't mean it will learn it.

The key insight: restriction bias is about _capacity_, not _outcome_. A model with high restriction bias (low capacity) will underfit. A model with low restriction bias (high capacity) can overfit if you don't control for it.

## What is Preference Bias

Preference bias is simply what representation(s) a supervised learning algorithm prefers. For example, a decision tree algorithm might prefer shorter, less complex trees. In other words, it is our algorithm's belief about what makes a good hypothesis.

Preference bias is what makes two algorithms with the same restriction bias produce different results. An SVM and a neural network can both represent the same decision boundary, but they'll find different ones because their preference biases differ.

### Occam's Razor

All things being equal (or roughly equal), simpler representations are preferred over more-complex representations for all of these algorithms. This is baked into every algorithm, either explicitly (regularization terms) or implicitly (weight decay, early stopping, minimum description length).

## Decision Trees

### Restriction Bias

The set of hypotheses that can be modeled by decision trees. Decision trees can represent any discrete function given enough nodes, but the representation is inherently axis-aligned: splits are perpendicular to feature axes. This means diagonal decision boundaries require many splits to approximate.

### Preference Bias

- Prefers shorter trees (explicitly via pruning, implicitly via information gain favoring splits that create pure partitions early).
- Prefers trees with good splits near the top (splitting on features with the most information gain). This is greedy and locally optimal, not globally optimal.
- Prefers features with more values (information gain bias): use gain ratio or Gini impurity to compensate.

**Practical takeaway**: Decision trees are great for interpretability but fragile. Small changes in training data can produce completely different trees (high variance). Ensemble methods (random forests, gradient boosting) fix this by averaging over many trees.

## Artificial Neural Networks (ANN)

### Restriction Bias

Neural networks don't restrict much at all. At their most basic, you can represent boolean functions with a single layer network of threshold perceptrons. For continuous functions you can add a hidden layer to map the output from the first layer to match the continuous function. Even arbitrary functions can be modeled by adding a second hidden layer (Universal Approximation Theorem).

Since there is not much restriction going on here, neural networks are prone to overfitting. Use cross-validation to measure performance and pick the correct complexity (e.g. number and size of hidden layers, dropout, weight decay).

### Preference Bias

_Note:_ Considering Gradient Descent over the perceptron training rule for the notes below.

In general, we prefer low complexity in our neural networks. Smaller weights, fewer hidden layers, and smaller hidden layers.

This is accomplished by:

- Choosing small, random values for the initial input weights. Helps us avoid local minima and ensures that when the algorithm is run subsequent times that it doesn't fall into the same traps.
- Smaller values for weights help avoid the overfitting that large values are prone to (since larger values allow a wider range of weights that can be applied).
- Weight decay (L2 regularization) explicitly penalizes large weights, encoding a preference for smoother functions.
- Dropout forces the network to learn redundant representations, encoding a preference for distributed features.

**Practical takeaway**: Neural networks are universal approximators, but that's a double-edged sword. Their low restriction bias means you _must_ control complexity through architecture choice, regularization, and early stopping. This is why the [agents roadmap](https://nkapila.me/posts/backprop-agents) emphasizes building from scratch: you need to feel the overfitting before you learn to control it.

## Support Vector Machines (SVM)

### Restriction Bias

Depends on the kernel chosen. Linear kernels restrict to linear decision boundaries. RBF kernels can represent arbitrary boundaries by projecting into infinite-dimensional space. The kernel determines what similarity means, and the Mercer condition ensures the kernel corresponds to a valid dot product in some space.

### Preference Bias

Seeks to maximize margin to avoid fitting too closely to the training data. This is the defining preference of SVMs: they prefer the decision boundary that maximally separates classes, not just any boundary that separates them. The margin maximization gives SVMs better generalization than other max-separation algorithms.

**Practical takeaway**: SVMs are the opposite of neural networks: high restriction bias (kernel-dependent) with a strong preference bias (max margin). This makes them sample-efficient but capacity-limited. For small-to-medium datasets with clear separation, SVMs often beat neural networks.

## k-Nearest Neighbors (KNN)

### Restriction Bias

Nonparametric regression: should be able to model anything as long as you can find a way to compute distance (similarity) between neighbors. No functional form is assumed, so restriction bias is essentially zero given enough data.

### Preference Bias

- **Locality** - Near points are posited to be similar. This is the core assumption of all instance-based learning.
- **Equality** - All features matter equally. This is KNN's biggest weakness: it has no mechanism to learn feature importance.
- **Smoothness** - By averaging values of the k-Nearest Neighbors and choosing points that are near each other we are expecting the functions we're modeling to behave smoothly.

The fact that all features matter equally in KNN means that the algorithm is highly affected by the "Curse of Dimensionality." As the number of features (dimensions) grows, the algorithm requires a much larger quantity of training data to generalize accurately. In reality not all features provide the same amount of information so we need more instances to discover that.

**Practical takeaway**: KNN is the ultimate "no free lunch" algorithm. Zero training time, infinite capacity, but falls apart in high dimensions. Feature selection and dimensionality reduction (PCA, t-SNE) are not optional: they're required.

## Boosting

### Restriction Bias

Same as the underlying weak learners within the ensemble. If you boost decision stumps, the ensemble can represent any decision boundary, but the representation is additive: each new learner corrects the errors of the previous ones.

### Preference Bias

Same as the underlying weak learners within the ensemble, but with an additional preference: later learners focus on hard-to-classify examples. This makes boosting sensitive to outliers (since outliers are always hard to classify and get emphasized).

**Practical takeaway**: Boosting is the most aggressive ensemble method. It reduces both bias and variance but at the cost of robustness. Gradient boosting (XGBoost, LightGBM, CatBoost) is the modern standard for tabular data for good reason: it works when nothing else does.

## Why This Matters Beyond CS7641

These biases don't disappear when you move to deep learning. They evolve:

- **Transformers** have low restriction bias (huge capacity) but strong preference bias from the inductive biases of attention (permutation equivariance, sparsity bias).
- **Convolutional networks** have built-in restriction bias (translation equivariance) that makes them sample-efficient for images.
- **LLMs** inherit the preference biases of autoregressive training (recency bias, surface form bias) that show up as hallucinations and sycophancy.

Understanding restriction and preference bias is how you predict what your model will do before you train it. It's the difference between debugging by staring at loss curves and debugging by understanding your algorithm.

## Changelog

- [03.01.2026] Init.

### Preference Bias

Same as the underlying weak learners within the ensemble.
