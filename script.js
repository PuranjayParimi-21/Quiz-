                                                                                              
const startBtn = document.getElementById("start-btn");
const rulesBox = document.querySelector(".rules-box");
const continueBtn = document.getElementById("continue-btn");
const exitBtn = document.getElementById("exit-btn");
const quizBox = document.querySelector(".quiz-box");
const questionContainer = document.getElementById("question-container");
const timeElement = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const questionCountText = document.getElementById("question-count");
const resultBox = document.querySelector(".result-box");
const scoreText = document.getElementById("score-text");
const replayBtn = document.getElementById("replay-btn");
const quitBtn = document.getElementById("quit-btn");

let questions = [
   
    {
        question:" What is the difference between final, finally, and finalize() in Java?",
        options:["final is a class, finally is a method, finalize() is a variable","final prevents inheritance , finally is in exception handling, finalize() is for garbage collection","final is used in exception handling, finally is for garbage collection, finalize() prevents","They all mean the same thing"],
        answer:1
    },
    {
        question:" What happens if the main() method is declared as private in Java?",
        options:["The code runs normally","The code compiles but does not execute"," The code does not compile"," Java automatically changes it to public"],
        answer:1
    },
    {
        question:"Which keyword prevents multiple threads from accessing a variable simultaneously?",
        options:["volatile","synchronized","transient","static"],
        answer:0
    },
    {
        question:"Which of the following is NOT true about StringBuffer and StringBuilder in Java?",
        options:["StringBuffer is synchronized, StringBuilder is not","StringBuffer is faster than StringBuilder","StringBuilder is preferred for single-threaded programs","Both are mutable"],
        answer:1
    },
    
{
    question:"What is the difference between copy() and deepcopy() in Python?",
    options:["copy() creates a new object, deepcopy() does not","deepcopy() is faster than copy()","copy() creates a shallow copy, deepcopy() creates an independent copy","Both create the same type of copy"],
    answer:2
},
{
    question:"Which memory management technique does Python use?",
    options:[" Manual memory allocation"," Reference counting and garbage collection","Pointers and addresses","Stack-based allocation"],
    answer:1
},

{
     question:"What is the difference between is and == in Python?",
     options:["is checks identity, == checks values","is checks values, == checks identity","They are the same","is is used for strings only"],
     answer:0
},
{
    question:"What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL?",
    options:["They all work the same way","ROW_NUMBER() skips numbers on ties","RANK() skips numbers on ties, DENSE_RANK() does not, ROW_NUMBER() is unique","DENSE_RANK() assigns the highest number for duplicate values"],
    answer:2
},
{
    question:"What is the purpose of the HAVING clause in SQL?",
    options:["Filters individual rows before GROUP BY","Replaces WHERE","Used in JOIN operations","Filters grouped results after GROUP BY"],
    answer:3
}
,
{
    question:"Which SQL join returns only matching rows between two tables?",
    options:["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL JOIN"],
    answer:0
},
{
    question:"What is an index in SQL?",
    options:[" A table for storing large data","A lookup table that speeds up searches"," A way to filter queries","A function in SQL"],
    answer:1
},
{
    question:"Which HTML tag is used for self-contained content like news articles?",
    options:["<section>", "<aside>","<article>", "<nav>"],
    answer:2
},
{
    question:"What is the difference between absolute and fixed positioning in CSS?",
    options:["absolute is relative to the nearest positioned ancestor, fixed is relative to the viewport","absolute is always relative to the viewport","fixed moves with the scroll","absolute cannot be used inside div"],
    answer:0
},
{
    question:"What is event delegation in JavaScript?",
    options:["Parent elements handle events for children","Only direct children receive events","No bubbling occurs","JavaScript events run in order"],
    answer:0
},
{
    question:"Which of the following statements about Python’s memory management is FALSE?",
    options:["Python uses reference counting for memory management"," The del statement immediately deallocates an object’s memory"," Python has a garbage collector to clean up cyclic references.","Objects with zero references are automatically deallocated."],
    answer:1
},
{
    question:"Which of the following statements about Java is TRUE?",
    options:["static methods in Java can be overridden.","Java uses pass-by-reference for objects.","The finalize() method is guaranteed to be called before an object is garbage collected.","volatile variables ensure visibility of changes across threads."],
    answer:3
},
{
   question:"Which of the following statements about pointers in C is INCORRECT?",
   options:["NULL and 0 are equivalent when assigned to a pointer.","Dereferencing an uninitialized pointer leads to undefined behavior.","A void* pointer can hold the address of any data type.","A pointer to an integer and a pointer to a character always occupy the same memory size."], 
   answer:3
},
{
    question:"What will be the output of typeof null in JavaScript?",
    options:["null","undefined","object","number"],
    answer:2
},
{
    question:"What will happen if you try to access an array element beyond its declared size in C?",
    options:[" The program will always crash.","The program will always throw a compilation error.","The behavior is undefined.","The extra element will automatically be initialized to 0"],
    answer:2
},
{
    question:"Which of the following sorting algorithms has the best average-case time complexity?",
    options:["Bubble Sort","Merge Sort","Insertion Sort","Selection Sort"],
    answer:1
},
{
    question:"Which data structure is best suited for implementing a priority queue?",
    options:["Heap","Stack","Queue","Linked List"],
    answer:0

},
{
    question:"What is the time complexity of accessing an element at a specific index in a singly linked list?",
    options:[" O(log n)","O(n²)","O(1)","O(n)"],
    answer:3
},
{
    question:"Which of the following graph traversal algorithms is best suited for finding the shortest path in an unweighted graph?",
    options:["Depth First Search (DFS)","Breadth First Search (BFS)"," Dijkstra’s Algorithm","Bellman-Ford Algorithm"],
    answer:1
},
{
    question:"In a binary search tree (BST), what is the time complexity of searching for an element in the average case?",
    options:["O(1)","O(n)","O(log n)","O(n log n)"],
    answer:2
},
{
    question:"Which of the following collision resolution techniques is used in hash tables?",
    options:["Chaining"," Merging","Heapifying","Partitioning"],
    answer:0
}


];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

startBtn.addEventListener("click", () => {
    document.querySelector(".start-screen").classList.add("hide");
    rulesBox.classList.remove("hide");
});

exitBtn.addEventListener("click", () => {
    rulesBox.classList.add("hide");
    document.querySelector(".start-screen").classList.remove("hide");
});

continueBtn.addEventListener("click", () => {
    rulesBox.classList.add("hide");
    quizBox.classList.remove("hide");
    startQuiz();
});

function startTimer() {
    timeLeft = 15;
    timeElement.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    nextBtn.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    startTimer();
    let questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<h3>${currentQuestionIndex + 1}. ${questionData.question}</h3>`;

    questionData.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerText = option;
        button.addEventListener("click", () => checkAnswer(index));
        questionContainer.appendChild(button);
    });

    questionCountText.innerText = `${currentQuestionIndex + 1} of ${questions.length} Questions`;
}

function checkAnswer(index) {
    let buttons = document.querySelectorAll(".option");
    buttons.forEach(button => button.disabled = true);
    if (index === questions[currentQuestionIndex].answer) {
        buttons[index].classList.add("correct");
        score++;
    } else {
        buttons[index].classList.add("wrong");
    }
    nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreText.innerText = `You got ${score} out of ${questions.length}`;
}

replayBtn.addEventListener("click", () => {
    startQuiz();
});

quitBtn.addEventListener("click", () => location.reload());
