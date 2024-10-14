---
title: "Fashion Recommender System"
description: "Recommends fashion based on an input image."
dateString: Nov 2023
draft: false
tags: ["Python", "streamlit", "ResNet", "ML", "Clustering"]
showToc: false
weight: 202
cover:
    image: "projects/fashion-recommender/fashion-recommendation.png"
--- 
<!-- ### 🔗 [View App](https://arkalim-todo-list.netlify.app) -->
### 🔗 [GitHub](https://github.com/rajivchoudhury/fashion-recommender)

## Description

This application recommends nearest five fashion products based on the uploaded photo. The User Interface is implemented using streamlit library in Python. For recommendation, I have used a pre-trained model, namely, ResNet, which has been trained on over a million images and the dataset used for recommendation is available on kaggle. I have used K-nearest Neighbours algorithm from sci-kit learn library as a metric for finding out the five near similar image for recommendation. I have used Streamlit for front-end deployment.

