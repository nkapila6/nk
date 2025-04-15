---
layout: post
title: DL A2 - CNNs using NumPy tips
tags:
  - deep-learning
  - omscs
  - "#cs7643"
  - "#preparation-work"
date: 2025-04-15
updated: 2025-04-15
---

Raw notes to tackle ✨Deep Learning ✨'s second assignment on CNNs from scratch. This was helpful for a few people in the recent cohort so why not share it. 

# Motivations
- Earlier, we did:
    - fully connected layer - every neuron to every other neuron - dense connections
    - in tensorflow, its called dense layer
    - in pytorch, its called linear layer
    - but this leads to a lot of parameters
    - input is 28x28, 784 x10 params
    - for eg in hidden: 784 x 256 and 256 x 10
    
- Motivations for cnn:
    - can we organize our weights in smaller set of weights and convolve of cross correlate it? reduces the number of params a lot!
    - and that motivates learning about CNNs.

TLDR: use numpy and do forward and backward pass

# Part 2 | Coding
uses torch's autograd and leverage the library to compute the gradients

- we compose the forward function
- then when backward method is called, the gradient is computed
- gradient can be used in optimization process
- do some experiments, play around with architecture
    - tldr: experiments with CNNs in pytorch and do some experiments

# Part 3 and 4 | Imbalance
we use an imbalanced dataset and discuss some ways to deal with class imbalance
- read papers
    - synthesize the implementation from those papers
    - and run the experiements

# Part 1 in NumPy
implement modules / layers:
- the forward and backward
- convolution
- max pooling
- relu (familiar from a1)
- linear (familiar from a2)

In a1, the architecture was hard coded but in a2 we're going to make generalized modules and chain them together

implement optimizer:
- sgd with momentum (slight extension to a1)

# Convolution | Forward Pass
<div>
<center>
  <img src="https://i.imgur.com/S0J3Ct4.png" alt="Descriptive Alt Text" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

First one (A) as an example:
-  Multiply and sum, for eg: the first one: 1\*1 + 1\*0 + 1\*1 (first row) + 0\*0 + 1\*1 + 1\*0 (second row) + 0\*1 + 0\*0 + 1\*1 (third row) = 4
-  9 multiplications and summations:
	-  9 different linear transforms - 1 feature map has 9 values
	-  We can use different filters/kernels to extract certain type of features
		-  vertical or horizontal edges
		-  dots
	-  The weights are repeatedly shared across the image
		-  and important to note we can have multiple kernels/filters
	-  The images in the dataset are 3 channel: 32 x 32 x 3
		- a linear layer (fully connected) on this will be huge
	- The kernel is the depth of the input
		- if input is 3 channel, our kernel 3x3x3 --> the depth of kernel == depth of input
- Motivated by parameter sharing and notions from signal processing, we create this convolution operation that is applied to images. This is the FORWARD PASS.

# Vectorizing
- It is okay to use loops.
- Vectorizing is not necessary but its important in practice
- We know apriori from kernel size, image size and stride:
	- how many operations we will do
	- and how these feature views look like
- using this apriori we can use fancy indexing to take each of these views and create them all at once
- we can take copies of the kernels and broadcast it over each of the views

## Vectorization | Stride tricks (1 of 2)
<div>
<center>
  <img src="https://i.imgur.com/jrHpAK8.png" alt="Descriptive Alt Text" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

- Goal: create views of image the same size as filters we're applying:
	- (c, h, w) -> (h_new, w_new, c, k, k) -> height_new * width_new * channel dims * 3 x 3
- Image A as array:
	- A.shape = (c,h,w) = (3, 45, 40) = channel * height * width
- `A.strides` = (s_c, s_h, s_w), eg: (14400, 320, 8)
	- strides represent how many bytes of offset to get to next value in the dimension
	- (14400, 320, 8)
		- 14400 - MOVE ACROSS CHANNELS - 45 x 40 x 8 bytes per stride
			- number of steps between CHANNELS
			- between R G B channel
		- 320 - MOVE ACROSS ROWS in SAME CHANNEL - 40 x 8 bytes per stride
			- if we are at the first row and want to jump to next row, we need to jump 320 bytes to go to next element
		- 8 - MOVE across COLUMN in SAME ROW in SAME CHANNEL - 8 bytes per stride
			- to move from one column to next in same row

## Vectorization | Stride tricks (2 of 2)
<div>
<center>
  <img src="https://i.imgur.com/6wBUQ2a.png" alt="Descriptive Alt Text" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

The input stride from #1 tricks goes to the above function.
- A is the input image tensor
- shape = the desired shape
- strides: how we want to index it
	- s_h*2: strides=2 in h, similar for s_w
	- s_c: we're not striding over channel dimension
- writeable=False --> see docs below.
	- If set to False, the returned array will always be readonly. Otherwise it will be writable if the original array was. It is advisable to set this to False if possible.

# Vectorization | Multiplying tensors
<div>
<center>
  <img src="https://i.imgur.com/sSaJ8aY.png" alt="Descriptive Alt Text" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

Both tensordot and einsum is fine. Tensordot is a tiny bit faster.
- We have a tensor A and kernel B.
- With einsum, you can do many things.
	- We put in the string and that tells einsum what operation we intend to do.
		- Dot products
		- Transposes
		- Diagonal etc
	- strings:
		- ('i,i', a,b): dot product
		- ('ij,jk', a,b): matmul
		- ('nchw, chwk->nk'): do a reduction across chw and we're left with a n by k matrix.

# Vectorization | Broadcasting
<div>
<center>
  <img src="https://i.imgur.com/sqZ6K28.png" alt="Descriptive Alt Text" style="width: 80%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

The broadcasting is creating B of size (a, b, c) so we can perform the addition. Can use .reshape as well

# Vectorization: Unravel Index | Max Pooling
Useful for max pooling
<div>
<center>
  <img src="https://i.imgur.com/9taIomm.png" alt="Descriptive Alt Text" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>
A is a 3x2 matrix. The argmax will return 2 because it's stored on absolute indices value in a single dimension. Based on it being flattened: [3, 5, 17, 2, 16, 3].

It returns 2 because that's the index in the flattened array.

Unravel index tells us "okay, here's the index in the flattened array, where would it occur in the original matrix which is 1,0"

# Part 2 - Using PyTorch
We only do the forward and PyTorch's autograd does the backward which is then used to perform the training.

There's a difference between training and validation.

## Training loop of PyTorch
- Implement training and validation step
	- in validation, we don't need gradients

## PyTorch Cross Entropy
In PyTorch, cross-entropy loss does softmax (like in A1 we combined the functions as gradient calc becomes simplified). So, softmax and ce-loss occur in the same function.

There exists an argument where you can separate it out but the default output just throws out the loss.

## PyTorch CNN
In PyTorch, convolution is called conv2d which means we're doing convolution in 2d spatial dimensions. Similarly, conv3d is in 3 dimensions.

# Implementing our own model
implementing training loop and forward
<div>
<center>
  <img src="https://i.imgur.com/zoo4a9l.png" style="width: 70%; height: auto;">
  <!--<div>This is your image caption</div>-->
  </center>
</div>

We are allowed to take inspiration from the lectures which talk about different CNN architectures, i.e. we can use the lectures as apriori.

There may be certain architectures motivated by certain concepts. Feel free to leverage that intuition in your own experimentation.

Limits to own model:
- Size limitations for full submission < 100 mb
	- you can get 2mb model can pass (which is >.8)
- How long model can take which is < 10 mins, 10 mins for all test.
- so if you write a lot for part 1, you're limiting your part 2 submission

Once the code is written and ran, the code spits out the model and the result. In the instructions, we can package the entire submission. Gradescope will take our trained model and test it, Gradescope is not training. The .sh script packages the checkpoints.

A checkpoint is a checkpoint of the model training. The weights of the model. The checkpoint may not be just the weights, it could be:
- weights
- learning rate if you use a learning rate schedule
- many other things

ENSURE the model has been trained and the code will creates and saves the checkpoints. Gradescope just takes these checkpoints and runs it against the validation set.

Tips:
- If model is too deep (too many params), you will get a time out. Especially for fully connected network because they have a lot params.
	- You will need "some" level of fully connected network to project the data back to 10 classes.

## Inspiration
A good video to take inspiration from:
<center><iframe width="500" height="300" src="https://www.youtube.com/embed/XaZIlVrIO-Q?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r" title="Lecture 8: CNN Architectures" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

# Imbalanced dataset part
<!--![[A2 Overview Office Hours-34.png]]-->
We're given an imbalanced dataset and use the resnet implementation provided to us.

Implement/Experiment with the methods provided in the papers that deal with class imbalance.

What's the difference between multiclass and multilabel classification?
- Multiclass output vector has a 1 in the correct class and 0 everywhere else.
- In multilabels, we can have multiple 1s in our output vector.
	- We can't use softmax so we use multi binary classifiers - need to look into this.
		- The paper talks about both these approaches.
	- a car is a vehicle + an object
	- a particular breed of a dog

There does not seem to be a huge difference between the softmax and multi binary classifiers.

# Infrastructure
- GPU could be useful for Part 2 and 3.
	- It mostly amounts to installing PyTorch with the right GPU lib. Eg. Apple has mps/Metal.
- CPU is fine for most parts.