---
layout: post
title: "Avoid Hype: A Guide to Learn CS7650 NLP yourself"
tags:
  - natural-lang-processing
  - omscs
  - course-reviews
  - "#cs7650"
date: 2025-12-31
updated: 2025-12-31
---

A realistic review on why to avoid and learn CS7650 NLP yourself from external resources.

## **Important note**
Some important points to consider my current state in the degree and other imp aspects.

- If you have already taken DL, skip this course unless you need a vacation.
- This course is an easy A, has easy assignments and may not add much value.
- I had just finished Machine Learning, Deep Learning and Research Work so came in with a decent prior.
- I took this class alongside CSE6250 Big Data for Healthcare in Spring 2025. The main aim to pair was to expand my understanding on the text modality coming from CS7643 Deep Learning and apply it to the group project in CSE6250 Big Data for Healthcare. Yes, I had planned this, big-brain energy.
- If you have any doubts whether the opinions/suggestions below apply to your cohort, check with the TAs, I claim no responsibility over lost marks or points.

Note: My opinion is based on Spring 2025 and I have talked to many folks in Fall 2025. The course has not really changed much except the Midterm and I really doubt it will ever change.

## This class needs a rework. It's overhyped.
I am a positive person and I tend to always pick up on the positive things to learn from negative experience but this class is **really very very very** overhyped.

But there is a huge problem with this class and the worldwide LLM hype is not helping. Before I dive into assignment wise breakdowns, I will try to be overly verbose with the claims I make above.

### Problem 1: Trying to cater to all backgrounds
This course should have a soft/hard pre-req of CS7643 to enroll in. This way, you can filter out students who want dive deep into text modalities coming from DL where the focus is on image modality. This course tries to be a catch it all student survey course on NLP but it really fails to add value for both the beginners as well as the more experienced DL folks and made a really interesting topic, very boring.

- **For beginners**: The course really fails to teach anything from HW1 through HW4 because all of them are fill in the blanks notebooks. I remember seeing a lot of my peers and class mates struggling in HW4 & HW5 because they did not really put any effort to learn the material in the prior homeworks. I try to guide them on Ed/Discord in socratic manner and you can see from the counter questions that they really did not understand anything or even fail to build an intuition on the concepts.  CS7641 ML and CS7643 DL in contrast really push you to build a mental model on these concepts and you cannot avoid it like you can in this course.
- **For advanced**: I joined this course hoping to pick up where CS7643 Deep Learning left off and learn more advanced language modeling concepts. While the embeddings part was informative and useful, the starting homeworks on basic neural nets and ending project on Key Value "Meme" Networks really didn't teach me much.

All the hard and successful courses have hard priors (ML, DL, GA, GIOS, AOS, etc) and I feel this class should be revamped to have a recommended DL pre-requisite and pick up where DL left off to maximize learning in the text modality instead of repeating information.

How can this course be improved:
1. This course should be revamped such that it is an exponential progression with an assumed prior of completing CS7643 Deep Learning. This will help to up the difficulty of the course with more interesting and complex assignments.

2. Look at SOTA architectures: Similar to how DL follows Stanford's CS231n very closely. This NLP class should really take inspiration from [CS224n: The lectures are on YouTube.](https://web.standford.edu/class/cs224n) I really developed a good intuition from their lectures and the deep dive into more SOTA (state of the art) material is amazing. Plus, the opportunity to do a group project in the text modality space would really help reinforce concepts. 

3. Assignments should focus more on writing code from scratch and a mix of math and paper review like we have it in DL & also CS224n. Redo assignments to build intuition. 

Some examples of mental models that I found useful: 
- When to use Encoder Only/Decoder Only/Encoder-Decoder arch? How do Encoder only architectures build good reprsentations of language? Why Decoder Only are more successful? What is Mixture of Experts?

- What is pre-training? What is post-training? How is RL used in post-training? What is instruction fine-tuning? What is fine-tuning? What are parameter efficient fine tuning methods?

I really learnt a lot more from YouTube this semester and I really regret taking this class. However, credit where it's due, the last project and the homework on embeddings (HW4) helped me come up with a [no-API web search MCP server for LLMs whose idea was partly inspired from the embeddings homework](https://www.github.com/nkapila6/mcp-local-rag/).

<div>
<center>
    <img src="https://api.memegen.link/images/whatyear/NLP_course_trying_to_cater_to_beginners_AND_advanced_students/Ends_up_teaching_neither_properly.jpg" alt="Meme on how the course fails to cater to all backgrounds" style="width:70%;height:auto;">
  <div>Made by another <a href="https://github.com/nkapila6/mcp-meme-sticky">MCP server</a> that uses the embedding concepts.</div>
  </center>
</div>

### TAs and administrative issues
Unlike all my other classes where TAs were really helpful, the TAs in this class were literally AWOL. This was really frustrating to deal with all semester. I will just list these in points and have no intent to sugarcoat these, feel free to take it as you will.

1. Where are all the TAs? Most of the Ed threads barely had any replies in our semester.
2. All threads and posts about the final exams are ignored. No one is asking you to release the final exam but it's basic to know what's the format of the exam (open or closed), how many days will one have to take the final (logistics). These were purposely kept a secret until the end and I don't understand why.
3. All threads and posts about when the final project will be released are ignored. When cornered, they claim to be reworking the home but then they release the exact same homework from the last semester.
4. No answer on when midterms grade will come out. No one is asking for an exact date, at least tell us before or after the drop date?
5. Some of the TAs (I won't take names) really have some ego issues. One of the students made a sarcastic comment out of frustration and the TA comes back with a condescending reply. The student even politely apologized and the TA just deleted the comment.. You're a TA, you're sitting in a position of responsibility, I really don't expect one to behave like that.
6. My midterm regrade request that would potentially take 10-15 mins to review took more than 4 weeks. OK, you can be busy but 4 weeks? I had to follow up on multiple threads just to have someone to take a look at it.

## What is good?
I cannot do this review any justice by being overly negative. Some things about this course are quite good, namely:

- **Lectures**: Prof Riedl has put in a lot of effort into the lectures and they are a good intro to supervised learning and language modelling in general.
- **Assignments**: Yes, this is the opposite of what I said above but this comes with a big IF. The assignments, lectures and readings IF DONE seriously with care can really convey a lot of intuition. But most students are juggling work, family, masters and I doubt are able to commit time to this. Most of my classmates just wanted to get over with the notebooks as soon as possible and move on. If you're an outlier, I assure you will learn a lot if you spend time with the material.
- **Papers**: Like GIOS, I like how this class tends to push you to read the newer SOTA papers out there. If (big if) one can read all the papers, it will be really helpful to build mental models and expand your understanding on what's possibru or what's happening in the language modelling space.
- **Easy class, low time effort**: I list this as a negative above but I understand different people are optimizing for different things in this degree, life is not easy and sometimes you just want a breather. This is the class for you! (if you get in *lol*)

Alright, on to the homework assignments and exams!

## Homework 1: Intro to NNs with PyTorch
This homework assignment is a hands-on primer for implementing neural networks. Uses a simulated self-driving car scenario to teach fundamentals.

Basic homework which encompasses:
1. Setting up your PyTorch environment
2. Converting data to tensors and batching.
3. Defining neural networks in PyTorch using `nn.Module` and `nn.Sequential`
4. Forward/backward passes and computation graphs
5. Using optimizers (Adam) and loss functions (MSE)
6. Creating the training loop: zero out grads, forward pass, compute loss, backward pass, step on the optimizers
7. Model eval on unseen test data

Again, I maintain that it would be great if you come with at least a ML prior in this class. Understanding all the above (if you're a newbie) will take time.

Resources:
1. YouTube:
  - [Official PyTorch Playlist](https://www.youtube.com/playlist?list=PL_lsbAsL_o2CTlGHgMxNrKhzP97BaG9ZN): The first 4 videos should be enough.
  - Supervised Learning Videos (will add videos here)

## Homework 2: Fundamental Approaches to Classification
This assignment is about NLP text clf covering 3 approaches: naive bayes (probabilistic), logistic regression (neural net with sigmoid), multinomial regression (multiclass with softmax/glove embeddings). We need to implement classifiers for sentiment analysis and topic classification.

Key concepts covered:
- text preprocessing: html tag removal, tokenization, lowercase, stemming, etc
- vocab and text representation: vocab construction, word freq couunting, vocab truncation, bag of words, word presence vs word counts
- naive bayes clf
- log regression
- multinomial clf
- word embeddings (glove)
- model architecture concepts
- eval metrics

## Homework 3a: Lang Modeling with RNNs
This assignment is about language modeling with RNNs. Focusing on building a word-level language model that can generate text.

Key concepts covered:
- vocab building and word-to-index mapping.
- one-hot encoding for discrete tokens.
- RNN arch: how hidden states carry info "temporally"
- training with neg log-likelihood losses
- gradient clipping
- perplexity metrics
- autoregressive output generation
- sampling strategies: argmax vs probabilistic vs temp-controlled

## Homework 3b: Advanced Lang Modeling
This assignment builds on the basic RNN from HW3a to implement sophisticated archs: LSTM (using PyTorch's built-in LSTM), LSTM from scratch (using PyTorch but implementing gates manually) and attention mechanisms.

Key concepts covered:
- LSTM arch vs Basic RNN
- diff LSTM gates
- gate operations
- stacked LSTMs
- att mechanisms: encoder-decoder
- att computation
- pytorch implementation
- training considerations for LSTMs
- architecture patterns

## Homework 4: Distributional Semantics
This assignment covers how to use pre-trained Glove vectors for word analogies and document retrieval + training Word2Vec models from scratch. We implement both CBOW and Skip gram architectures to learn that words appearing in similar contexts have similar vector representations.

This one took more time than the first 4.

Key concepts covered:
- the core idea of distributional hypothesis: "you shall know a word by company it keeps"
- pre-trained embeddings (GloVe)
- vector ops
- doc retrieval
- word2vec: cbow and skip-gram archs and their biases

## Homework 5: Key Value Memory Network
The final goal of the homework is to build a QA system that can answer questions in natural text. A basic retriever.

Paper: [Key-Value Memory Networks for Directly Reading Documents (2016)](https://arxiv.org/pdf/1606.03126)
Below is an example of how this would look like:

<div>
<center>
    <img src="https://i.imgur.com/Ba00Gzq.png" alt="Key Value Memory Network Implementation" style="width:70%;height:auto;">
    <div>Key Value Memory Network Implementation</div>
  </center>
</div>

The problem most folks face with this assignment is that they're unable to grasp how multi dimensional tensors work (if you finished A2 in DL, should be piece of cake for you) and this tends to set them back. As there is no hand holding in this project and you have to implement everything from data pre-processing all the way to look at how you batch the data.

If you're a beginner, I would recommend looking at the TA "recitation" video that basically tends to hand hold you to the solution with some level of autonomy.

## Exams

### Quizzes
There are quizzes after every lecture that count for your grade. IIRC you're given 2 chances to attempt them and are stuck with whatever you get after 2 attempts. It's a way to get you to watch the lectures.

### Midterms
Apparently these have changed but for Spring 2025, we had to a paper review from choices of 2 papers.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models](https://arxiv.org/abs/2303.08896)

The questions were based solely on the paper.

### Finals
This was a open-notes, open-books and open-lecture-videos (open-everything?) exam. You are given a document and you need to answer it and submit the document to Canvas. Some of the questions were direct from the lectures, others were again open-ended questions that touched a variety of topics similar to the midterm.

I liked this exam as it tries to develop a systems thinking approach to deep learning.

## Grades
My overall grade was 97.78% (A). The weight is given in brackets.

- Module Quizzes (10%): 100%
- Programming Assignments HW1-4 (50%): 100%
- Programming Assignment HW5 Project (20%): 100%
- Exams (20%): 88.92%
  - Midterm: 10/12
  - Final: 11.34/12
