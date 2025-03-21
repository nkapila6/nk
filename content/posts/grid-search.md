---
layout: post
title: "The Grid Search Trap: Why Your Computer Hates You"
tags:
  - omscs
  - machine-learning
  - deep-learning
date: 2025-03-14
updated: 2025-03-14
---

# Why did I write this?
Ever since I took the Machine Learning (ML) class in Spring 2024, I've been helping students in Discord servers for subsequent semesters while also maintaining documentation and libraries for the second assignment of the class. After supporting students for 3-4 semesters, I've identified common pitfalls or misunderstandings that could save them significant time and effort. This is the first article in a series about common misunderstanding that ML students make, which tend to propagate into further advance classes such as Deep Learning.

Here's a TYPICAL example I encounter VERY often.

![](https://i.imgur.com/QWfF2Mu.png)

Before we understand why Grid Search isn't the right way to go, you need to understand 2 things:
- ML/DL/AI/AGI (whatever you want to call it) is a search problem.
- How does search extend to supervised learning?

If you already have this prior, skip to the 3rd section.

# ML/DL/AI/AGI is a search problem 
Like all things in life, ML/DL/AI/AGI is a search problem. Some examples:
- The search for the right mixture of coffee, sugar, and milk.. Ugh.
- The search for your keys/wallet at home when they're lost.
- The search for the cheapest iPhone prices on the market. You know who you are.
- The search for the perfect sticker on WhatsApp to meme with. 

Coming back to the technical side of things:
- The search for the best model weights of a neural network that output the best approximation to the actual function.
- The search for the best hyperparameters for different algorithms.
- The search for the best model architecture that achieves the best balance in the everlasting trade-off: compute vs performance.

You can see that the searching we do in real life isn't any different to the searches you perform when doing deep learning modeling.

BUT the problem lies in the approach to searching. 
Taking the real-life example, you could find the right proportions of coffee, sugar, milk by either looking at what others have done (youtube/reddit/chef,barista recipes) or trying infinitely different choices to find what you can finally settle on. The latter is what grid search does, hope you're getting the gist now :-)

# The supervised learning setup
I'd like to start this section by quoting the author of the Machine Learning book whom I consider my best friend, Dr Tom Mitchell.

> Supervised learning is a search for the best hypothesis $h(x)$ within a hypothesis space $H$ that best approximate the target function $c(x)$, such that $h(x) == c(x)$
> 
> The process involves identifying a function h(x) that best approximates c(x) and can generalize well from the provided training data to unseen instances.

People get thrown off by the words like "hypothesis", "target function", etc. I was too, it took me a lot of time before I understood this definition in its entirety. But don't be confused, the definition above says the same thing what you read in the previous definition.

### Another example? It's the last one I promise.
To go further, I shall explain the above definition with another example.

Imagine you're trying to teach a baby to identify red balls. 

To put this into the problem statement of the definition:
- Your target concept $c(x)$ is "red and round objects". 
- To teach this target function $c(x)$ to the baby, you could have 3 different options (the hypothesis space) $H$, $H = [h_1, h_2, h_3]$. 
	- $h_1$ = "anything that is red"
	- $h_2$ = "anything that is round"
	- $h_3$ = "objects that are both red and round"

We try to teach the baby with 3 different candidate concepts from our set of concepts $H$. We can see that $h_1$ would correctly identify red balls but would identify things like red apples or red objects like books that are not balls. Similarly, $h_2$ would incorrectly include blue balls, green balls, any round object. Only $h_3$ correctly captures the target concept $c(x)$.

## Babies? Balls? How does this scale to ML?
Similar to the baby learning a concept of red balls, when you're trying to improve the baby's mental model on a classification task. In machine learning, our hypothesis space $H$ consists of all possible models we could select.

$H$ = [Neural Networks (NN), SVMs, Decision Trees (DT), Boosting, kNN]

When we consider hyperparameters, this space explodes dramatically. It changes from only algorithms to algorithms with different hyperparameter settings. (hyperparameter = if you don't know this word, it's just a setting which changes how each of the above algorithms behave).

And when this explodes, the $H$ becomes:

$H$ = [NN with 2 layers, CNN, Transformers, NN with Dropout, SVM with RBF kernels, DT+NN ensemble, kNN, etc...]

This exponential growth in the hypothesis space is precisely what makes exhaustive search inefficient. Similar to the coffee recipe proportion problem. Such a grid search experimentational approach leads to:
- Loooong experiment times
- Lots of computation required to perform these experiments. 
	- You can see the first picture where the person ran the search for 735 minutes (~12 hours).
	- I have seen worst, days even. Here's an example: [>9 hour grid search on Support Vector Machines](https://stackoverflow.com/questions/72101295/python-gridsearchcv-taking-too-long-to-finish-running)
	- Asking the right questions: [Is GridSearchCV useful?](https://www.reddit.com/r/MLQuestions/comments/l5asb2/is_gridsearch_cv_useful/)

# Beyond Compute and Time: Other Considerations
Beyond running times and compute costs, grid search has several other limitations that practitioners should consider when selecting hyperparameter optimization strategies. I will provide 2 such examples, one in a supervised setting and an unsupervised one.

## Validation Performance vs True Generalization
In the second line of Dr Mitchell's quote, there is a key thing that was mentioned. 

> The process involves identifying a function $h(x)$ that best approximates $c(x)$ and can generalize well from the provided training data to unseen instances.

The keyword here is "generalization". Grid Search evaluates different models and model configurations but this optimizes on the accuracy of your validation set and does not consider the train.

### GridSearch's Inductive Bias: Optimization on Validation Set
When performing hyperparameter optimization, one may argue/assume that selecting models with best validation performance will lead to good generalization. This reasoning stems from the fact that our data is i.i.d. (independent and identically distributed).

Even though this i.i.d. assumption holds in theory, the reality is more nuanced. GridSearch evaluates numerous hyperparameters on the same validation set which creates a risk of selecting configurations that happen to work well on our specific validation data. 

This inductive bias of GridSearch to select the configuration with the highest validation accuracy is not always the one with the best generalization property. Sometimes a configuration with slightly lower validation performance might actually perform better on completely unseen data.

Hence, it is important to monitor both training and validation set performance when selecting our hyperparameters. We see this in more detail in the next section with an example.

Examples of Grid Search Limitations:
- [GridSearchCV not giving the most optimal settings?](https://stackoverflow.com/questions/72507560/gridsearchcv-not-giving-the-most-optimal-settings)
- [Tuning the hyperparameter with gridsearch results in overfitting](https://stackoverflow.com/questions/57537596/tuning-the-hyperparameter-with-gridsearch-results-in-overfitting)
- [hyper parameter optimization grid search issues](https://stats.stackexchange.com/questions/208449/hyper-parameter-optimization-grid-search-issues)

## Loss of Nuance and Information
With every abstraction in this world, we lose granular information.

GridSearch is one such abstraction. Validation or model complexity curves provide many more advantage because they show the relationship between different hyperparameters values and model performance for both training and validation sets.

This aspect is very similar to probability metrics where the expectation values summarizes a probability distribution too well that we needed to start using variance values.

<center><img src='https://i.imgur.com/zOMZNTy.png' width=600 height=300></center>

The validation curves show you the different trends and helps build a mental model of how each parameter adjustment changes model performance.

Here's an example I encountered recently for an unsupervised learning problem.

<center><img src='https://i.imgur.com/gW9GB5o.png' width=300 height=300></center>

When we run GridSearch, we abstract away all the good sweet information and quantify it to a single number. This abstraction hides all the information we actually need.

In the example, the metrics used optimizes on different things. BIC penalizes model complexity whereas log-likelihood prefers more complex models. GridSearch cannot highlight this.

The different tradeoffs, the performance landscape, the visualization of tradeoff, GridSearch removes the context needed to make an informed decision especially in the case of Unsupervised Learning where there is nothing to benchmark against.

Instead of asking "which GridSearch score to trust?", the better approach would be going into the granular than being focused on the abstraction. This is very similar to saying "Hey, which house to buy? Let's buy this because it's cheaper (grid search scorer)", but not diving into the granulars. You get the gist.

# Real Use-Cases for Grid Search
No, not really. Everything in life has a purpose. GridSearch has one too.

GridSearch is best used when you know; "Hey, I have this small list of optimal parameters I want to check". To reframe, you're finding your target function "h(x)" from a small subset of parameters.

E.g. I have an image classification task and I have a very narrow search space saying these are 10 models that all work well. Finding the best among these good models. 

In this case where are candidate combinations are narrow, an exhaustive search justifies the need.

# Alternative Approaches to Hyperparameter Optimization
There are many ways:
- **Randomized Search**: Instead of exhaustively trying all combinations, randomly sample hyperparameter values. This often finds good solutions faster than grid search.
- **Bayesian Search**: Uses probabilistic models to intelligently select hyperparameter configurations. I have used this through the Optuna library and it does a much better job!
- **Having a Prior / Knowledge-Based Initialization**: Read below.

I will link a few blogposts below that touch on the first 2 parts.
- [Tutorial on Hyperparameter Tuning using Scikit Learn](https://sites.gatech.edu/omscs7641/2024/02/16/tutorial-on-hyperparameter-tuning-using-scikit-learn/).
- [Comparing randomized search and grid search for hyperparameter estimation](https://scikit-learn.org/stable/auto_examples/model_selection/plot_randomized_search.html).

I will talk about the last one. Having a Prior is very similar to Bayesian Search (in a way), it just means that you have prior knowledge of how the algorithm works to make informed decisions. 

Having a mental model of the algorithms is crucial for efficient hyperparameter tuning. Understanding how different algorithms respond to hyperparameters allows you to make educated guesses rather than blind searches. For neural networks, it almost always narrows down to 2-3 key factors like learning rates or regularization strength, and knowing how these interact with model complexity can significantly speed up your optimization process


If you're implementing a research paper, you can "hack" your way through and just pick the best hyperparam from the paper. These are all just ways to narrow down your search space so that you can justify the need for a GridSearch (as stated in the previous section).

The following paper from one of the original authors of cross-attention gives good intuition: [Practical recommendations for gradient-based training of deep architectures by Yoshua Bengio](https://arxiv.org/abs/1206.5533)

I found this paper much after I learnt about ML and found this GridSearch discrepancy. I shall further quote from the paper:

> One has to think of hyperparameter selection as a difficult form of learning: there is both an optimization problem (looking for hyperparameter configurations that yield low validation error) and a generalization problem: there is uncertainty about the expected generalization after optimizing validation performance, and it is possible to overfit the validation error and get optimistically biased estimators of performance when comparing many hyper-parameter configurations.

I feel validated. 😎

# Conclusion
The goal isn't just finding the best hyperparameters but understanding how different choices affect model behavior and that knowledge helps build intuition for future modeling tasks. Don't depend on any of the search algorithms, build that MENTAL MODEL!!

Don't forget 😉:
<center><img src='https://i.imgur.com/mwmHdIy.png'></center>

# Changelog
- [14.03.2024] Init
- [15.03.2025] Grammar fixes, some more context in the last section.
- [21.03.2025] Moved to new section, fixed markdown formatting.