---
title: "BCI Application"
description: "Simulates a GUI which helps for navigation using EEG device as an input."
dateString: May 2023
draft: false
tags: ["Python", "tKinter", "ML", "BCI"]
showToc: false
weight: 201
cover:
    image: "projects/classification-sim/bci-banner-x.jpg"
--- 
<!-- ### 🔗 [View App](https://arkalim-todo-list.netlify.app) -->
### 🔗 [GitHub](https://github.com/rajivchoudhury/classification-bci)

## Description

The application simulates brain signals that are provided in the form of EEG and classifies them into 3 different class labels. The collection of signals happens in a controlled environment where the subject is asked to follow a specific task for the collection of data. The app takes input with the help of EMOTIV INSIGHT hardware and the data is accessed using Cortex API provided by EMOTIV. For training & classification, I have used Multi-Layered Perceptron Classifier (MLPClassifier) from sci-kit learn library. After training the model, I have used it to predict in real-time after after collecting sample for 1-sec -> process it -> classify -> predict output from 3 classes (idle, moving the cursor, selecting the current selection).

The device used is shown below:

![](/projects/classification-sim/device-image.jpg)