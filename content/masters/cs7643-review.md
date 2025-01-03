---
layout: post
title: "How Deep Is Your Model: Guide to CS7643 Deep Learning"
tags:
  - deep-learning
  - omscs
  - course-reviews
  - "#cs7643"
  - "#preparation-work"
date: 2024-12-26
updated: 2024-01-03
---
A ✨Deep Review✨ on Georgia Tech's [Deep Learning](https://omscs.gatech.edu/cs-7643-deep-learning) course.

<center><iframe width="500" height="300" src="https://www.youtube.com/embed/EgqUJOudrcM" title="Calvin Harris &amp; Disciples - How Deep Is Your Love" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

> [!WARNING] How deep is your love for deep learning?
> How deep is your model, can it go any deeper?

Now that you have completed the 7641 Machine Learning class (assuming you're not naughty and have not skipped it), you can focus solely on neural network architectures and leverage their representational power to tackle much more complex problems.
## **Important note**

- I took this class in Fall of 2024, the requirements of specific assignments could have changed for the upcoming semesters.
- If you have any doubts whether the suggestions below apply to your cohort, check with the TAs, I claim no responsibility over lost marks or points.
- Join the permanent Deep Learning Discord to ask any questions within the boundaries of the Student CoC / Honor Code.

Before we get into the nitty-gritties of discussing how to navigate the course, you need to get rid a couple of internal biases that can limit the derived learning.
## Let's clear the air
These are some of the most asked questions I can remember when being asked about this course - send more my way and I can edit it in.

- **Do I need CS7641 Machine Learning? The Reddit talk is scaring me aaaaahaha?! TAs are evil there!**: While I do not agree with the latter statements and Reddit is always an echo chamber of thoughts, the CS7641 pre-requisite is listed in the syllabus and is necessary in my opinion. It is skippable **iff** you have knowledge on the following topics: bias-variance tradeoff (over vs underfitting), neural networks, backpropagation, why do we need ML? (reach Mitchell chapters 1, 2). The first assignment itself assumes this knowledge and asks in their theory question about over/under-fitting. 
	- TL;DR: While the Machine Learning class covers lot of necessary breath imo, it can be skipped if you have done some prior ML class on Neural Networks, eg: Ng course.
	- You can see what syllabus recommends [here](https://sites.cc.gatech.edu/classes/AY2023/cs7643_spring/#prereqs).

- **Calculus is no joke**: Prior to taking this course and looking at the pre-reqs, I binge-watched the following playlists in a span of 10 days, oh the pain...
	- [3b1b: essence of linalg](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
	- [3b1b: essence of calc](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)
	- [Machine Learning for Engineering & Science](https://www.youtube.com/playlist?list=PLyqSpQzTE6M-SISTunGRBRiZk7opYBf_K): This playlist covers a lot of math initially.
	- Most important is just understanding linear algebra and how to derive and then carry forward this to matrices: [The Matrix Calculus You Need For Deep Learning](https://explained.ai/matrix-calculus/). This is the essence of Backpropagation.
	- [Math for ML textbook](https://mml-book.github.io/)
	- **You will miss this.. Maybe not:** Studying all this math helped when doing things initially from scratch (on small/medium) but not necessarily once the course switched to PyTorch as it abstracts away all this calculus goodness from you. I hold a lot of respect now for people who wrote autodiff libraries, I salute you.
	- Now that the class has ended, I'm revisiting probability (for GenAI ofc and to better understand VAEs/the likes). This course has really cleared a lot of foundation for me, [An Intuitive Introduction to Probability](https://www.coursera.org/learn/introductiontoprobability)
	- Other resources I did not get a chance to look into:
		- [Elegant Math Behind Deep Learning](https://www.youtube.com/watch?v=URtF_UHYBSo&t=674s&pp=ygUebWF0aCBmb3IgZGVlcCBsZWFybmluZyBoYXJ2YXJk)

<center><iframe width="500" height="300" src="https://www.youtube.com/embed/P9dpTTpjymE" title="I Will Derive!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

> [!danger] Can You Derive?
> This was me after I had binged these many videos and practiced a lot of problems that led to a 25/26 on Quiz 1. Yes, I'm shamelessly bragging.

- **GPU use**: Most of the assignments (and final project) utilize PyTorch which in turn, allows you to use GPUs to train your models ✨faster✨. I utilized [colab](https://colab.research.google.com/) throughout the semester and even paid for a couple of compute units, you could look into [Lightning AI](Lightning.AI). Lightning AI has a better interface and you can ssh into the VMs they provide using VSCode/PyCharm/Whatever. The use of GPUs is not necessary but it will definitely save you a lot of time.

- **Do not miss the OHs**: There are 4 different types of office hours (OH) that occur throughout the semester: 
	- **Assignment Overviews**: DO NOT MISS THESE. While I could not watch them live since all of the OHs were always odd-hours for me, I watched the recordings. They really help clear the assignment requirements and there are some helpful tips that would save a lot of time.
	- **TA led OHs**: No structure, random talk, ask a question. I attended a few, they were helpful but you could skip them.
	- **Instructor led OHs**: I never watched any.. for some reason the schedule was always tough for me to join these.
	- **META/Facebook OHs**: I joined a couple. This one has industry experts hold a Zoom conference where you can discuss and ask questions. There was a set presentation or topic at hand but it was mostly a random mix of topics being discussed.

- **Start early**: This advice is not new but it cannot be stressed enough. Each assignment comes with its unexpected challenges and it takes time for your mind to absorb and understand new information and at the same time tackle the assignment.

## The Lectures - Not the Best
### Georgia Tech Lectures
The Georgia Tech Lectures by Dr Kira cover the topics well, you can view them on the Mediaspace link if you haven't enrolled yet [here](https://nkapila.me/masters/cs7643-dl-prep). However, they are tough to understand and really make you feel sleepy as it feels like someone is reading from a script.

It would be best to use Dr Justin Johnson's [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) lectures which feel much more lively and are easy to digest due to their conversational style. I often had to view the videos in the playlist and then use that context to easily understand what the Georgia Tech DL lecture was attributing to.

### Meta Lectures
I really didn't find most of them helpful. They were very abstract and lacked depth in content. Resources on YouTube taught it much better.
  
## The Quizzes - A Grade Deflation Tool
Before I entered this course, I heard a lot on how the Quizzes are "mini"-exams as some people would call it.

<center><iframe width="500" height="300" src="https://www.youtube.com/embed/Fexz4MGLphw" title="EL CHOMBO X MAFFIO X SHELOW SHAQ feat. ANDYS VAL - CHACARRON 3.0 (Official Music Video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

> [!warning] Warning
>  Here's what the quizzes will feel like even if you study hard. Enjoy the new & updated Chacarron from the ML review.

My experience has been similar for the Quizzes. While the percentage is small, the syllabus covers many topics and it feels like an excuse as a way to force you to review the course-material aggressively and not just complete the assignments and call it a day.

I prepared a lot for some of the Quizzes and I think this is where the most learning happened for me personally. So, this cliffhanger technique works to say the least.

What I would change if I was taking DL again would be to do the assignments' theory questions and readings as a way to prepare for the Quizzes.

## Helpful Resources
Apart from the ones listed in my Deep Learning Prep [page](https://nkapila.me/masters/cs7643-dl-prep), these are 
some playlists & books that I found helpful and can be perused to develop a deeper understanding.

### Video Playlists
- [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r): A 1:1 (mostly) replacement for GT lectures. Should be of main focus to substitute GT lectures.
- [100 Days of Deep Learning - CampusX - in Hinglish](https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn): This playlist helped in understanding some complex topics but at times there is too much spoonfeeding which I found annoying, haha.
- [CS224N NLP Stanford](https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4): For NLP topics, don't go too into depth. Just touch the topics being taught since DL doesn't focus heavily into NLP stuff.
- [MIT OCT Matrix Calculus for ML and Beyond](https://www.youtube.com/playlist?list=PLUl4u3cNGP62EaLLH92E_VCN4izBKK6OE): I binged the first 4-5 videos as prepatory work. I found some of the discussion and tasks to be helpful. Will definitely come back to watch more in the future.
- [Yann LeCun's Deep Learning course](https://www.youtube.com/playlist?list=PLgF7i4LH-YxacgG0OPmTYe1UUQAvcw9Ke): Some of the videos were very good. Especially the attention one.

### Books
I referred these books ON and OFF throughout the semester for specific topics.
- [Deep Learning - Ian Goodfellow](https://www.deeplearningbook.org/): The book is technical and really well written. Nothing short of what you would expect from the father of GANs!
- [Deep Learning - Chris Bishop](https://www.bishopbook.com/): This book covers more latest topics. You may remember Dr Bishop from the famous book [PRML](https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf).
- [Understanding Deep Learning - Simon J.D. Prince](https://udlbook.github.io/udlbook/): This book has great visuals. Really helps in building that latent space (intuition) inside your head.

## Assignment Requirements
Unlike ML where there are really fun adventures, the DL assignments is very straightforward. 

Most of the assignments follow the same pattern:
- Finish some theory questions - mix of computational and theory
- Choose a research paper, write a review, give your thoughts
- Write code and pass tests on Gradescope
- Record code experiments and explain them in the repo

The grading is very straightforward. You only lose points if you fail to answer the question properly.
## Assignment 1 - Neural Nets
1. **Library to use**: NumPy, Matplotlib
2. **Resources | Do Not Miss**:
	- [YT: UMich Lecture 6: Backpropagation](https://www.youtube.com/watch?v=dB-u77Y5a6A)
	- [YT: Derivative of SoftMax](https://www.youtube.com/watch?v=M59JElEPgIg)
	- [YT: Matrix Calculus for ML: Differentiation on Computational Graphs](https://www.youtube.com/watch?v=r9_5dxtDTOk&list=PLUl4u3cNGP62EaLLH92E_VCN4izBKK6OE&index=11)
	- [YT: What is Automatic Differentiation?](https://www.youtube.com/watch?v=wG_nF1awSSY)
	- [Blog: Backpropagation for a Linear Layer](https://web.eecs.umich.edu/~justincj/teaching/eecs442/notes/linear-backprop.html)
	- [Wiki: Cross-entropy formula](https://en.wikipedia.org/wiki/Cross-entropy)
4. **Assumed Priors**: If you're coming from the ML class, you will be fine, the first assignment covers the basics: activation functions, loss functions, cross-entropy, accuracy, regularizaiton, etc. And it goes without saying that mathematics (esp linalg and differeniation should be clear to you, if not - refer Gilbert Strang for linalg and 3b1b for differentiation). If you are not coming from the ML class, you may be able to complete the assignment but I do not think you will be able to grasp the concepts well given the time constraint.
5. **Code Recommendations**:
	- [np.einsum](https://numpy.org/doc/stable/reference/generated/numpy.einsum.html): This NumPy function would really make your matmuls easier. You don't have to waste time debugging to match the matrix dimensions. It can handle almost any tensor operation (dot product, element-wise multiplication, matrix transpose, etc.).
		- [Einsum Is All You Need](https://www.youtube.com/watch?v=pkVwUVEHmfI&t=188s&pp=ygUJbnAuZWluc3Vt): Apart from the copied title from the Attention paper, this can explain how einsum works.
	- [np.tensordot](https://numpy.org/doc/stable/reference/generated/numpy.tensordot.html): Same as einsum but faster. It is limited to dot products and contraction along axes.

This assignment is a nice primer on how backpropagation occurs from a code perspective. You will be implementing a simple and a 2 layer fully-connected neural net from scratch using NumPy.

This assignment also explains how automatic differentation (autodiff) works. It was really fascinating and inspires me to someday build a small autodiff library of my own as a fun project, eg: [MyGrad - autodiff for NumPy](https://github.com/rsokl/MyGrad).
## Assignment 2 - Convolutional Neural Nets (CNNs)
1. **Library to use**: NumPy, Matplotlib, PyTorch (for part 2)
2. **Resources | Do Not Miss**:
	- UMich
		- [YT: UMich Lecture 7 Convolutional Networks](https://www.youtube.com/watch?v=ANyxBVxmdZ0)
		- [YT: UMich Lecture 8: CNN arch](https://youtu.be/XaZIlVrIO-Q?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
		- [YT UMich Lecture 10: Training Neural Nets 1](https://youtu.be/lGbQlr1Ts7w?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
		- [YT UMich Lecture 11: Training Neural Nets 2](https://youtu.be/WUazOtlti0g?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
	- [YT: What are 1x1 Conv?](https://www.youtube.com/watch?v=wf2HblQbP-U)
	- [YT: Backpropagation in Convolutional Neural Networks (CNNs)](https://youtu.be/z9hJzduHToc)
	- [YT: Convolutional Neural Network from Scratch, In Depth](https://youtu.be/jDe5BAsT2-Y)
	- [Blog: Convolutional Neural Nets for Visual Recognition](https://cs231n.github.io/convolutional-networks/)
4. **Code Recommendations**:
	- [np.einsum](https://numpy.org/doc/stable/reference/generated/numpy.einsum.html): This NumPy function would really make your matmuls easier. You don't have to waste time debugging to match the matrix dimensions. It can handle almost any tensor operation (dot product, element-wise multiplication, matrix transpose, etc.).
		- [Einsum Is All You Need](https://www.youtube.com/watch?v=pkVwUVEHmfI&t=188s&pp=ygUJbnAuZWluc3Vt): Apart from the copied title from the Attention paper, this can explain how einsum works.
	- [np.tensordot](https://numpy.org/doc/stable/reference/generated/numpy.tensordot.html): Same as einsum but faster. It is limited to dot products and contraction along axes.
	- [numpy.lib.stride_tricks.as_strided (OPTIONAL)](https://numpy.org/doc/stable/reference/generated/numpy.lib.stride_tricks.as_strided.html): This can help vectorize your operations as you can make a view of your image matrix instead of using for loops for everything. 
	- [numpy.unravel_index (OPTIONAL)](https://numpy.org/doc/stable/reference/generated/numpy.unravel_index.html#numpy-unravel-index): Again if you want to vectorize, it can help.
	- [Pytorch: how and when to use Module, Sequential, ModuleList and ModuleDict](https://github.com/FrancescoSaverioZuppichini/Pytorch-how-and-when-to-use-Module-Sequential-ModuleList-and-ModuleDict): Really helpful to look at and appreciate since it will save you time when you are building really deep networks.

This assignment covers convolutional neural networks (CNN).

This assignment covers the following tasks in brief:
- Implement CNNs from scratch using NumPy
- Implement the same CNN using PyTorch
- Use PyTorch to build out your own CNN implementation and compete with other students on a leaderboard.
- Experiment with a different loss function (CB & Focal Loss) and report your findings.

### Pytorch
For PyTorch, there is a tutorial in the lectures. I did not find it until the end of the course as it is under 'Facebook Resources'. It basically covers the content of this repo: [CS7643 Deep Learing | Fall 2020 at Georgia Tech (Prof. Zsolt Kira)](https://github.com/pytorch/workshops/blob/master/CS7643/readme.md).

Once you start using PyTorch you will appreciate how it really does everything for you --> building out the DAG for autodiff, all activation functions coded, etc. 

### My script for experiment logging
I built out a MLFlow wrapper that wraps onto the PyTorch Solver.py for this assignment. This will help you track and store either locally or on Databricks your experiments.

**Fun fact**: my Databricks account got suspended because I was logging the whole Solver object which was around 1.2 gigs, haha. Definitely recommend you use it locally (or colab/lightning) instead.

<center><img src='https://raw.githubusercontent.com/nkapila6/nk/refs/heads/v4/content/masters/resources/cs7643/mlflow-charts.png' /></center>

> [!INFO] Info
> This really helped me save time and I could reference it directly in my report. You can see how it looks in the SS with the hyperparams hidden. (not gonna help you ofc :))

You can view the code [here](https://gist.github.com/nkapila6/23eb57356e3557350b34490332cca256). Please ⭐ if it helps you.

### Interesting paper
In ML, we learnt all about the inherent biases in our algorithms. Especially in A2, where we saw how optimization algorithms tread the problem landscapes very differently. 

Similarly, in this assignment, one of the paper choices which I picked to review was quite interesting. The authors explored how like us humans have biases in looking at images, similarly CNNs exhibit a bias too. And it does not end here, they further talk about training the model to change its bias??! Qualitative analysis has always been very fascinating 😄

<center>
<iframe width="500" height="300" src="https://www.youtube.com/embed/1cq-jXyi6ek" title="Robert Geirhos: ImageNet-trained CNNs are biased towards texture (ICLR 2019 talk)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

> [!WARNING] Qualitative analysis breaking minds everytime.
> Get ready to have your mind blown --insert [gif](https://giphy.com/gifs/timanderic-tim-and-eric-wareheim-lXu72d4iKwqek) here--

## Assignment 3 - Interpreting CNNs
1. **Library to use**: PyTorch, Captum, Matplotlib
2. **Resources | Do Not Miss**:
	- [YT: UMich Lecture 14: Visualizing and Understanding](https://youtu.be/G1hGwHVykDU?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
	- [Blog: Visualizing what ConvNets learn](https://cs231n.github.io/understanding-cnn/)

In this assignment, your adventures on implementing things from scratch end. Good news: No more shape matching, building out computation graphs, computing gradients, YAY. :) 

This assignment tries to dive into what people call "xAI" explainable AI, i.e. why do CNNs (or model in question) give out an output X when presented with an image? 

It was the easiest and least time consuming but fun nonetheless. The style transfer and class-model visualization gave a nice taste of what GenAI looks like.

This assignment covers the following tasks in brief:
- Visualizing what CNNs learn: Saliency Maps, GradCAM, Guided Backpropagation
- Fooling images: how can CNNs be fooled with small perturbations in our input
- Generate images using class model viz (gradient ascent): generate images by maximizing activation of specific output classes
- Style transfer: preserve an input images structural content but mix-in style pattern of another image.

<center><img src='https://raw.githubusercontent.com/nkapila6/nk/refs/heads/v4/content/masters/resources/cs7643/style-transfer.png' /></center>

> [!INFO] Style transfer
> A stylized style-transfer image of Burj Khalifa.

<center><img width=300 height=300 src='https://raw.githubusercontent.com/nkapila6/nk/refs/heads/v4/content/masters/resources/cs7643/grad-ascent-gorilla.png' /></center>

> [!INFO] Class maximization using Gradient Ascent
> A synthetic Gorilla image generated via gradient ascent on a SqueezeNet model pre-trained on ImageNet which highlights features that the neural network associates with a gorilla (our chosen class).
## Assignment 4 - Sequences
1. **Library to use**: PyTorch, Matplotlib
2. **Resources | Do Not Miss**:
	- UMich
		- [YT: UMich Lecture 12: RNNs](https://youtu.be/dUzLD91Sj-o?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
		- [YT UMich Lecture 13: Attention](https://youtu.be/YAgjfMR9R_M?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)
	- StatQuest
		- [YT Seq2Seq Models](https://www.youtube.com/watch?v=L8HKweZIOmg&t=786s)
		- [YT Att for NNs](https://www.youtube.com/watch?v=PSs6nxngL6k&t=624s)
		- [YT LSTMs explained](https://www.youtube.com/watch?v=YCzL96nL7j0&t=462s)
	- On Latent Spaces/Latent Vector/Hidden Vector
		- [Variational Autoencoders](https://youtu.be/9zKuYvjFFS8)
		- [The Mystery of 'Latent Space' in Machine Learning Explained!](https://youtu.be/mX2y3NWmaCQ)
		- [Attention in transformers, visually explained](https://youtu.be/eMlx5fFNoYc)

This assignment covers seq2seq encoder decoder models. We implement a translation model to translate German to English.

We start by implementing RNNs, noting it's drawbacks and move to LSTMs, augment both RNNs and LSTMs with Attention and compare our results. Next, we look at how Transformer models don't need this autoregressive approach (of RNN & LSTMs) and can generate outputs in batched format which allows for better scaling/efficiency/parallelizability.

Initially, the compression of the input to a latent vector did not make much sense to me. It only started to make sense to me when I saw denoising autoencoders. It was very fascinating to see that you could denoise MNIST images by encoding the input vector/image into a compressed latent space and then reconstructing a clean version thanks to optimizing through backprop.

This idea of latent space is carried forward to Attention wherein the compressed latent vector of our token (here the input is not an image but text which is represented as tokens) is moved (in a linear algebra fashion - basically a linear transformation which is again just a matmul 😊) to the correct position so they can contextually relate to each other. Look at the last video link in the resources above.

## Group Project
Pick any project you like, there's no end to how deep you can go or how ambitious you'd like to be.

The main idea is that you should be able to represent through your project the built-up latent vector inside your head, i.e. Deep Learning knowledge.

I have a few recommendations that could be of help:
- Try to make groups with people you know and gel well with. Find people from your past class, e.g. ML
- Try to find people in similar timezones. If you're in Asia, don't pick people in the US. It becomes really tough to manage.
- Try not to be too ambitious. Factor in training times when picking a task to solve.

Take this seriously as it accounts for a good chunk of your grade.
### My project
For our project, we were a group of 3. Given the time constraints and how busy our schedules were, we tried not to pick a complex project and work with images since that felt the most comfortable.

We evaluated a not so deep ResNet-20 by augmenting three different Attention mechanisms and interpreting the results through GradCAM. We were happy to see some satisfying results.
The Paper: [CNNtention: Can CNNs do better with Attention?](https://arxiv.org/abs/2412.11657)

<center><img src="https://arxiv.org/html/2412.11657v3/extracted/6102386/attention/gradcam/7662_dog.png"></center>

## Congratulations!
You can now finally endorse this meme and have a Twitter war with people making GPT wrappers! 😠

<center><img src=https://media.makeameme.org/created/deep-learning-is-5c72ba.jpg></center>

## My scores

| Name              | Score           |
| ----------------- | --------------- |
| Assignments       | 444.58 / 451.00 |
| Quizzes           | 93.08 / 131.00  |
| Final Project     | 55.00 / 62.00   |
| Ed Endorsed Posts | 1.00 / 1.00     |
| Overall           | 92.10 %         |

Try to do well on all the assignments and the final project, that should account for any problems you may face in the quizzes.

The `Ed Endorsed Posts` was just given to 3 people 🤯 in the class for being "very helpful" I'm assuming. So, if you're active on Ed and sitting on the borderline of 88, that 1 point could raise your grade to an A.

I did help out on Ed but in my honest opinion, it was mostly me being on Ed when I had nothing better to do with my time. I was wasting my time with [bakchodi](https://en.wiktionary.org/wiki/bakchodi) on Ed/Discord. At least I got rewarded, hahahaha.

## Other interesting text to review
- [My dear friend ` Inspector Yxlow` always has good stuff to talk about.](https://lowyx.com/posts/gt-dl/)
	- [His Deep Learning Notes](https://lowyx.com/posts/gt-dl-notes/)
- [There exists a Google Doc written by the `OG Murilo` that has some great resources that even I did not know about.](https://docs.google.com/document/d/16Lu5oMfG6MInuw773ppvA27ZAoQYKtldp4rphK2l_J8/edit?tab=t.0#heading=h.bhv4zgifw7d)

## Comments
Have some feedback or found any mistakes? Most of you would already know where to find me. 

If not, you can e-mail me by clicking [here](mailto:info@nkapila.me).

## Changelog
- [26.12.2024] Init
- [03.01.2025] First draft completed