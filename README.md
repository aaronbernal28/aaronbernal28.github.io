# Data science portfolio by Aaron Bernal Huanca

This portfolio is a compilation of notebooks which I created for data analysis and machine learning proyects, also competitive programming highlights where I had to implement advanced algorithms in C++ such as dynamic programming, greedy strategies, graph traversal (BFS, Dijkstra), and flow networks. A separate category is for separate projects.

## Proyects

### TP2: Mixed models, penalized splines, and causality
In this project we analyze 4,000 movies and series from a streaming platform to predict IMDb ratings using statistical modeling. We explore data patterns by genre, people, and text features, apply mixed-effects models and penalized splines, and use causal inference with DAGs. Finally, we compare several predictive models, with logistic regression achieving the best performance. The work combines exploratory analysis, causal reasoning, and prediction in a group effort. <br>
**Authors**: Aaron Bernal Huanca, Casiel Joshua Estrago, Ramiro Lipszyc <br>
[Statement (spanish)]() <br>
[Report (spanish)]()

### Classification of Gene Expression
This report uses 500 RNA samples from 200 genes, taken from patients with pre-tumoral lesions, which we analyzed with various machine learning techniques. The data were provided by research groups from CONICET (and faculty from the department) as part of an interdisciplinary project on hyperplasias and oncological prognosis. The goal is to train models that help predict new cases in a precise and automatic way. Each sample was labeled as good prognosis if there were no signs of new hyperplasias or similar conditions; conversely, they were labeled as poor prognosis if a relapse occurred.<br>
**Authors**: Manuel Fernandez Burda, Santiago Nahuel Eliges, Giancarlo Moroni, Nicolas Spisso, Aaron Bernal Huanca<br>
[Report (spanish)]()

### IECD 2C2024 - Practical Assignment
In this report we study the Wilcoxon signed-rank test, a nonparametric method to test hypotheses about the median of symmetric distributions. First, we review basic ideas of object-oriented programming in R (S3 system) in order to implement a version of the test compatible with the native wilcox.test. Then, we describe the construction of the statistic, its exact and asymptotic distributions, and how to compute it efficiently for larger samples. Finally, we use bootstrap methods to estimate the power of the test under alternatives. The work combines theory, programming practice, and applications, showing how R can be used to understand and implement statistical methods.<br>
**Authors**: Aaron Bernal Huanca, Nicolas Spisso, Marina Badaracco <br>
[Statement (spanish)]() <br>
[Report (spanish)]()

## Stand-alone projects.

### Final Project - DeepMusicGenreClassifier
This report addresses the classification of musical genres using the GTZAN dataset (10 genres, 100 songs of 30 seconds each). The objective is to analyze and classify music employing different neural network architectures. Methods implemented include sequential processing with RNNs, spectrogram analysis (Mel, MFCC, CQT) with 1D CNNs, and the use of pre-trained neural networks for extracting relevant features (transfer learning) such as Wav2vec2 and EnCodecMAE. Cross-entropy and accuracy are used as evaluation criteria to determine which of these architectures achieves the best performance in the classification task. <br>
[Report]()<br>
[Report (spanish)](https://github.com/aaronbernal28/DeepMusicGenreClassifier/blob/7a93485d191dd292acc010750424d847092432f1/Informe_PSAH_bernal.pdf)<br>
[Repository](https://github.com/aaronbernal28/DeepMusicGenreClassifier)

### Sign Language MNIST
This Kaggle project focuses on classifying sign language letters using the Sign Language MNIST dataset. It explores models such as Tree, Random Forest, K-Nearest Neighbors, and Support Vector Machines (SVM). Cross-validation is used to evaluate performance and address the bias-variance tradeoff. Metrics like accuracy and confusion matrices help compare model effectiveness. The notebook is fully written in Spanish. <br>
[Notebook](https://www.kaggle.com/code/aarnbernal/sign-language-mnist)

### Internet auction in US Schools
This project is an implementation in Python of the model from the paper [An asymmetric multi-item auction with quantity discounts applied to Internet service procurement in Buenos Aires public schools](https://doi.org/10.1007/s10479-016-2164-x), which focuses on linear programming. Since the actual 91,063 schools in the US are provided, I created six fictional firms for educational purposes, along with their respective discount and unit prices. <br>
[Notebook](https://www.kaggle.com/code/aarnbernal/internet-auction-in-us-schools)

## Competitive programming highlights

Competitive programming in my data science portfolio demonstrates my skills in problem-solving, logical thinking, and optimization. It shows my ability to write efficient code and tackle complex challenges effectively. The platform is Vjudge [profile](https://vjudge.net/user/aaron_bernal). 

### Problem 1: [Argentina](https://vjudge.net/problem/UVA-11804)
**Description:** The task is to select 5 attackers and 5 defenders from a list of 10 players based on their attacking and defensive abilities. The goal is to maximize the sum of the attackers' abilities.

**Solution approach:** [Backtracking](https://vjudge.net/solution/50555912/DUjEFQ2r9EikgZdmi5gl)

### Problem 2: [ACORN](https://vjudge.net/problem/UVA-1231)
**Description:** Jayjay, the flying squirrel, descends from an oak tree, collecting acorns along the way. He can either climb down or fly to another tree, losing height with each flight. The goal is to compute the maximum acorns he can collect, given the number of trees, their acorn counts, and the height lost per flight.

**Solution approach:** [Dynamic programming - bottom-up](https://vjudge.net/solution/50555998/JoXZzl5GpxC8CJVxv9FN)

### Problem 3: [Equivalent Strings](https://vjudge.net/problem/CodeForces-559B)
**Description:** Two strings are equivalent if they are identical or can be split into two halves where each half matches directly or after swapping. The task is to check if two given strings are equivalent.

**Solution approach:** [Divide & conquer](https://vjudge.net/solution/50690686/EkVrOSRbFNVtlQyggX96)

### Problem 4: [Wine trading in Gergovia](https://vjudge.net/problem/SPOJ-GERGOVIA)
**Description:** In Gergovia, each inhabitant buys or sells wine along a street, with supply and demand always balanced. The task is to calculate the minimum work required to transport wine between houses, where moving a bottle between adjacent houses costs one unit of work. Input consists of multiple test cases.

**Solution approach:** [Greedy algorithm](https://vjudge.net/solution/50882918/74NhAgRkjQJoHaAecm4s)

### Problem 5: [The New Villa](https://vjudge.net/problem/UVA-321)
**Description:** Mr. Black needs to navigate his villa, starting in the hallway with only its light on, and reach his bedroom while switching off all other lights. The challenge is to determine the shortest path, considering room connections and light switches.

**Solution approach:** [Breadth-first search](https://vjudge.net/solution/53216512/xBdtX0xkkEhlLW7dZqkI)

### Problem 6: [Anti Brute Force Lock](https://vjudge.net/problem/UVA-1235)
**Description:** In Panda Land, safes use a 4-digit rolling lock with multiple keys. The challenge is to unlock all keys with the minimum number of rolls, starting from 0000. The safe can use a "JUMP" button to quickly switch to any unlocked key. The goal is to calculate the least number of rolls required to unlock all keys.

**Solution approach:** [Minimum spanning tree](https://vjudge.net/solution/51559789/nPGSzMxUaLYUVgdRgKWh)

### Problem 7: [Lift Hopping](https://vjudge.net/problem/UVA-10801)
**Description:** In a skyscraper with up to 5 elevators, each traveling at different speeds, the goal is to find the minimum time required to get from floor 0 to floor k. Elevators may not stop at all floors, and switching between elevators takes 60 seconds.

**Solution approach:** [Shortest path - Dijkstra's algorithm](https://vjudge.net/solution/51666430/SGWzRqQbBXR3B6TuU5zb)

### Problem 8: [Geonosis](https://vjudge.net/problem/UVA-13211)
**Description:** The Galactic Empire's fortress on Geonosis consists of communication towers connected by power lines, each with a cost. The Rebels need to destroy the towers in a specific order. The power required to destroy each tower is the sum of minimum energy costs to communicate between all remaining towers. The goal is to calculate the total power needed for the mission as towers are sequentially destroyed.

**Solution approach:** [Shortest path - Dantzig's algorithm (1966)](https://vjudge.net/solution/51862270/8cfpfeEB6ndL87T03xIL)

### Problem 9: [My T-shirt suits me](https://vjudge.net/problem/UVA-11045)
**Description:** Victor needs to distribute N T-shirts (in 6 sizes) to M volunteers, where each volunteer can only wear two specific sizes. The goal is to determine if it's possible to distribute the T-shirts so that each volunteer receives a T-shirt in their preferred sizes, with any leftover T-shirts not affecting the distribution.

**Solution approach:** [Flow network - Edmonds-Karp algorithm](https://vjudge.net/solution/53307955/lrmVU68nqRBQqmiSFlLF)
