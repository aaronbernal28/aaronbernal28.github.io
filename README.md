# Data science portfolio by Aaron Bernal Huanca

This portfolio is a compilation of notebooks which I created for data analysis and machine learning proyects, also competitive programming highlights. A separate category is for separate projects.

[//]: <> (## Stand-alone projects.)
[//]: <> (### Proyect 1)
[//]: <> (text)

## Kaggle kernels

### Internet auction in US Schools
This project is an implementation in Python of the model from the paper [An asymmetric multi-item auction with quantity discounts applied to Internet service procurement in Buenos Aires public schools](https://doi.org/10.1007/s10479-016-2164-x), which focuses on linear programming. Since the actual 91,063 schools in the US are provided, I created six fictional firms for educational purposes, along with their respective discount and unit prices. [kernel](https://www.kaggle.com/code/aarnbernal/internet-auction-in-us-schools)

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
