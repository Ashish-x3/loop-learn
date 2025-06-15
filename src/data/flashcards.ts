
export interface FlashcardData {
  id: number;
  topic: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  front: string;
  back: {
    definition: string;
    analogy: string;
    realWorldUse: string;
    codeExample: string;
  };
}

export const flashcardsByTopic: Record<string, FlashcardData[]> = {
  javascript: [
    {
      id: 1,
      topic: "JavaScript Promise",
      category: "JavaScript",
      difficulty: "Intermediate",
      front: "What is a JavaScript Promise?",
      back: {
        definition: "A way to handle something that will finish later (like loading data from a website)",
        analogy: "Like ordering pizza! 🍕 When you call the pizza place, they promise to deliver your pizza. You don't wait by the phone - you do other things. When the pizza arrives (or if they can't deliver), they let you know. Promises work the same way with code!",
        realWorldUse: "Fetching data from an API, loading images, reading files, or any task that takes time to complete",
        codeExample: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Pizza delivered! 🍕");
  }, 3000);
});

promise.then(result => {
  console.log(result); // "Pizza delivered! 🍕"
});`
      }
    },
    {
      id: 2,
      topic: "Array.map()",
      category: "JavaScript",
      difficulty: "Beginner",
      front: "What does Array.map() do?",
      back: {
        definition: "Creates a new array by transforming each item in the original array",
        analogy: "Like having a magical copying machine! 📋✨ You put in a list of numbers, tell the machine 'double each number', and it gives you back a brand new list with all numbers doubled. The original list stays exactly the same!",
        realWorldUse: "Converting data formats, calculating new values, or transforming user information for display",
        codeExample: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

console.log(numbers); // [1, 2, 3, 4, 5] (unchanged!)
console.log(doubled); // [2, 4, 6, 8, 10] (new array!)`
      }
    },
    {
      id: 3,
      topic: "Variable Hoisting",
      category: "JavaScript",
      difficulty: "Intermediate",
      front: "What is variable hoisting in JavaScript?",
      back: {
        definition: "JavaScript moves variable declarations to the top of their scope before code execution",
        analogy: "Like a teacher collecting all homework at the start of class! 📚 Even if students turn in homework throughout the class, the teacher acts like they got it all at the beginning. JavaScript does the same with variable declarations.",
        realWorldUse: "Understanding why variables can be used before they're declared and avoiding common bugs",
        codeExample: `console.log(myVar); // undefined (not error!)
var myVar = "Hello";

// JavaScript sees it as:
var myVar; // hoisted to top
console.log(myVar); // undefined
myVar = "Hello";`
      }
    }
  ],
  react: [
    {
      id: 4,
      topic: "React useState",
      category: "React",
      difficulty: "Beginner",
      front: "How does React useState work?",
      back: {
        definition: "A hook that lets you add state to functional components",
        analogy: "Like having a smart notebook! 📓 Every time you write something new, the notebook remembers it and updates what everyone sees. When you change the state, React updates your webpage automatically!",
        realWorldUse: "Managing user input, toggling UI elements, storing form data, or tracking component data",
        codeExample: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}`
      }
    },
    {
      id: 5,
      topic: "React Components",
      category: "React",
      difficulty: "Beginner",
      front: "What are React components?",
      back: {
        definition: "Reusable pieces of UI that can accept inputs (props) and return what should appear on screen",
        analogy: "Like LEGO blocks! 🧱 Each component is a special block that does one thing well. You can combine these blocks to build amazing things, and use the same blocks in different places!",
        realWorldUse: "Building reusable UI elements like buttons, forms, navigation bars, or entire page sections",
        codeExample: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Using the component
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}`
      }
    }
  ],
  css: [
    {
      id: 6,
      topic: "CSS Flexbox",
      category: "CSS",
      difficulty: "Intermediate",
      front: "What is CSS Flexbox?",
      back: {
        definition: "A layout method that makes it easy to arrange items in rows or columns",
        analogy: "Like organizing toys in a toy box! 🧸 You can tell the toys to line up in a row, stack in a column, spread out evenly, or bunch up together. Flexbox is like having magic organizing powers for your webpage elements!",
        realWorldUse: "Creating navigation bars, centering content, making responsive layouts, and aligning items",
        codeExample: `.container {
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
  gap: 20px;              /* space between items */
}

.item {
  flex: 1; /* each item takes equal space */
}`
      }
    }
  ],
  "data-structures": [
    {
      id: 7,
      topic: "Arrays",
      category: "Data Structures",
      difficulty: "Beginner",
      front: "What is an array data structure?",
      back: {
        definition: "A collection of elements stored in sequential order, where each element can be accessed by its index",
        analogy: "Like a row of mailboxes! 📬 Each mailbox has a number (index) and can hold something (data). You can quickly find what you want by going to the right mailbox number!",
        realWorldUse: "Storing lists of items, managing collections of data, implementing other data structures",
        codeExample: `// Creating an array
const fruits = ['apple', 'banana', 'orange'];

// Accessing elements
console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'

// Adding elements
fruits.push('grape'); // ['apple', 'banana', 'orange', 'grape']`
      }
    }
  ],
  algorithms: [
    {
      id: 8,
      topic: "Binary Search",
      category: "Algorithms",
      difficulty: "Intermediate",
      front: "How does binary search work?",
      back: {
        definition: "An efficient search algorithm that finds items in a sorted array by repeatedly dividing the search space in half",
        analogy: "Like finding a word in a dictionary! 📖 You open to the middle, see if your word comes before or after, then go to the middle of that half. Keep doing this until you find your word!",
        realWorldUse: "Searching large databases, finding elements in sorted lists, optimizing search operations",
        codeExample: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1; // not found
}`
      }
    }
  ]
};

export const getFlashcardsByTopic = (topic: string): FlashcardData[] => {
  return flashcardsByTopic[topic] || [];
};

export const getAllFlashcards = (): FlashcardData[] => {
  return Object.values(flashcardsByTopic).flat();
};
