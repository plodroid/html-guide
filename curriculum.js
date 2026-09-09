window.CODEBLOOM = {
  courses: [
    {
      id: 'html', name: 'HTML', category: 'web', icon: '<>', color: 'orange',
      tagline: 'Give webpages their structure.',
      description: 'Start with tags, text, links, images, forms, and accessible page structure.',
      filename: 'index.html',
      lab: '<h1>Hello, web!</h1>\n<p>I made my first page.</p>\n<button>Click me</button>',
      lessons: [
        lesson('html-1','What even is HTML?',4,'HTML is the structure of a webpage — like the frame of a house before paint and furniture.',[
          ['HTML','HTML means HyperText Markup Language. It tells the browser what each piece of content is.'],
          ['Tags','Tags use angle brackets. <h1> starts a main heading and </h1> ends it.'],
          ['Content','The words between opening and closing tags are the content people see.']
        ],'<h1>Hello!</h1>\n<p>This is my first webpage.</p>','A big heading, then a paragraph.','Make the heading say “My first site”.','<h1>Hello!</h1>\n<p>This is my first webpage.</p>',['<h1>My first site</h1>'],'Change only the words between <h1> and </h1>.'),
        lesson('html-2','Tags are labels',5,'A tag tells the browser what kind of thing your content is.',[
          ['<h1> to <h6>','Headings create titles. <h1> is the main title; smaller numbers are lower-level headings.'],
          ['<p>','A paragraph tag is for normal blocks of text.'],
          ['Nesting','Tags can go inside other tags. Close the inside tag before the outside tag.']
        ],'<h1>My game</h1>\n<h2>About it</h2>\n<p>I am building something cool.</p>','A title, a smaller section title, and normal text.','Add an <h2> with the words “My favorite part”.','<h1>My game</h1>\n<p>I am building something cool.</p>',['<h2>My favorite part</h2>'],'Put the new h2 between the h1 and p.'),
        lesson('html-3','Links and attributes',6,'Attributes add extra information to a tag. Links use an href attribute to say where they go.',[
          ['Attribute','An attribute lives inside the opening tag, usually as name="value".'],
          ['href','On an <a> tag, href stores the destination.'],
          ['Link text','The clickable words still go between <a> and </a>.']
        ],'<a href="https://github.com">Visit GitHub</a>','Clickable text that opens GitHub.','Make a link to https://example.com with the text “Visit my page”.','<a href="https://github.com">Visit GitHub</a>',['href="https://example.com"','>Visit my page</a>'],'Change both the href value and the visible words.'),
        lesson('html-4','Images that make sense',6,'Images use <img>. Good alt text explains the image when it cannot be seen.',[
          ['src','src tells the browser where the image file lives.'],
          ['alt','alt describes the useful meaning of the image for accessibility.'],
          ['No closing tag','<img> is a void element, so it does not wrap content.']
        ],'<img src="cat.jpg" alt="A sleepy orange cat on a chair">','An image with a useful text alternative.','Give the image alt text that says “A blue robot waving”.','<img src="robot.png" alt="">',['alt="A blue robot waving"'],'Write the description between the quotation marks.'),
        lesson('html-5','Lists and groups',6,'Lists are perfect when several items belong together.',[
          ['<ul>','An unordered list uses bullet points.'],
          ['<ol>','An ordered list uses numbers.'],
          ['<li>','Every item inside either list uses an <li> tag.']
        ],'<ul>\n  <li>Minecraft</li>\n  <li>Robots</li>\n</ul>','A two-item bulleted list.','Add a third list item called “Coding”.','<ul>\n  <li>Minecraft</li>\n  <li>Robots</li>\n</ul>',['<li>Coding</li>'],'Add another <li> before </ul>.'),
        lesson('html-6','Build a real page',8,'Semantic tags give your page clear regions instead of one giant pile of divs.',[
          ['<header>','Intro or navigation content at the top.'],
          ['<main>','The unique main content of the page.'],
          ['<section>','A meaningful group inside the page.'],
          ['<footer>','Extra information at the bottom.']
        ],'<header><h1>Pixel Club</h1></header>\n<main>\n  <section><h2>News</h2><p>We launched!</p></section>\n</main>\n<footer>Made by me</footer>','A page with clear meaningful regions.','Wrap the paragraph in a <section>.','<main>\n  <p>Welcome to my site.</p>\n</main>',['<section>','</section>'],'Put <section> before the p and </section> after it.'),
        lesson('html-7','Forms and input',8,'Forms collect information. Labels tell people what each input is for.',[
          ['<label>','Names the input so the field is understandable.'],
          ['<input>','Creates a field. The type changes what kind of data it accepts.'],
          ['for + id','A label’s for value should match the input’s id.']
        ],'<label for="name">Your name</label>\n<input id="name" type="text">','A labeled text field.','Create a number input with id="age".','<label for="age">Your age</label>\n<input id="age">',['id="age"','type="number"'],'Add type="number" inside the input tag.'),
        lesson('html-8','HTML final build',10,'Put the pieces together: headings, sections, links, an image, and a form control.',[
          ['Plan first','Decide what the page is about before adding tags.'],
          ['Meaning over looks','HTML describes content. CSS handles the appearance later.'],
          ['Check structure','Make sure tags close in the right order and important images have alt text.']
        ],'<main>\n  <h1>My project</h1>\n  <p>A page I built from scratch.</p>\n</main>','A tiny but valid page foundation.','Add a link with href="#about" and the text “About”.','<main>\n  <h1>My project</h1>\n</main>',['href="#about"','>About</a>'],'Use an <a> element. The destination can be #about.')
      ]
    },
    {
      id: 'css', name: 'CSS', category: 'web', icon: '#', color: 'blue',
      tagline: 'Make webpages look and feel right.',
      description: 'Learn selectors, color, spacing, layout, responsive design, and motion.',
      filename: 'style.css',
      lab: 'body {\n  font-family: system-ui;\n  background: #f5f5f7;\n}\n\nh1 {\n  color: royalblue;\n}',
      lessons: [
        lesson('css-1','What CSS does',4,'HTML says what something is. CSS says how it should look.',[
          ['Selector','The selector chooses which HTML elements to style.'],['Property','A property is what you want to change, like color.'],['Value','The value is the new setting, like royalblue.']
        ],'h1 {\n  color: royalblue;\n}','All h1 headings become royal blue.','Change the color to tomato.','h1 {\n  color: royalblue;\n}',['color: tomato'],'Replace royalblue with tomato.'),
        lesson('css-2','Classes and selectors',5,'Classes let you style some elements without changing every element of that type.',[
          ['class="..."','HTML gives an element a class name.'],['.class','CSS selects a class by putting a dot before its name.'],['Reuse','Many elements can share the same class.']
        ],'.card {\n  background: white;\n  border-radius: 18px;\n}','Every element with class="card" gets these styles.','Add padding: 24px to .card.','.card {\n  background: white;\n}',['padding: 24px'],'Add the property before the closing brace.'),
        lesson('css-3','The box model',6,'Every element is a box made of content, padding, border, and margin.',[
          ['padding','Space inside the element, around its content.'],['border','The visible edge around padding and content.'],['margin','Space outside the element, pushing other things away.']
        ],'.card {\n  padding: 24px;\n  border: 1px solid #ddd;\n  margin: 16px;\n}','A roomy card with an edge and outside spacing.','Give .box a margin of 20px.','.box {\n  padding: 12px;\n}',['margin: 20px'],'margin belongs inside the braces.'),
        lesson('css-4','Flexbox layout',7,'Flexbox is great for arranging items in a row or column and lining them up.',[
          ['display: flex','Turns an element into a flex container.'],['gap','Adds clean space between children.'],['justify-content','Controls where items sit along the main direction.']
        ],'.row {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}','Children line up with a 12px gap and center together.','Turn .nav into a flex container.','.nav {\n  gap: 16px;\n}',['display: flex'],'Add display: flex; inside .nav.'),
        lesson('css-5','Grid layout',7,'Grid is useful when your design has rows and columns at the same time.',[
          ['display: grid','Turns an element into a grid container.'],['grid-template-columns','Defines the columns.'],['1fr','One flexible share of the available space.']
        ],'.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}','A three-column gallery.','Make .cards use two equal columns.','.cards {\n  display: grid;\n}',['grid-template-columns: repeat(2, 1fr)'],'Use repeat(2, 1fr) for two equal columns.'),
        lesson('css-6','Responsive CSS',8,'A responsive page changes its layout when the screen gets smaller or larger.',[
          ['@media','A media query applies styles only when a condition is true.'],['max-width','Useful for rules that start when the screen becomes narrow.'],['Mobile first','Simple layouts often work best as the default, then expand on larger screens.']
        ],'@media (max-width: 700px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}','Below 700px, the grid becomes one column.','Inside the media query, make .nav use flex-direction: column.','@media (max-width: 600px) {\n  .nav {\n  }\n}',['flex-direction: column'],'Put the property inside .nav.'),
        lesson('css-7','Transitions and motion',7,'Transitions make a change happen smoothly instead of instantly.',[
          ['transition','Chooses which property changes smoothly and how long it takes.'],[':hover','Applies while a pointer is over the element.'],['Keep it calm','Motion should help explain change, not make the page harder to use.']
        ],'.button { transition: transform .2s ease; }\n.button:hover { transform: scale(1.04); }','The button gently grows on hover.','Add transition: opacity .2s ease to .card.','.card {\n  opacity: .8;\n}',['transition: opacity .2s ease'],'Add the transition inside .card.'),
        lesson('css-8','CSS final build',10,'Combine typography, spacing, cards, layout, and responsive rules into one coherent design.',[
          ['Consistency','Reuse spacing and radius values so the page feels connected.'],['Hierarchy','Make the most important content easiest to notice.'],['Readability','Do not sacrifice contrast or text size just to make something look fancy.']
        ],':root {\n  --space: 16px;\n  --radius: 20px;\n}\n.card { padding: var(--space); border-radius: var(--radius); }','Reusable variables keep the design consistent.','Create a variable named --gap with value 12px.',':root {\n}',['--gap: 12px'],'CSS custom properties start with two dashes.')
      ]
    },
    {
      id: 'js', name: 'JavaScript', category: 'web', icon: '{}', color: 'yellow',
      tagline: 'Make webpages react and think.',
      description: 'Learn values, decisions, loops, functions, arrays, the DOM, and events.',
      filename: 'script.js',
      lab: 'const button = document.querySelector("button");\nlet clicks = 0;\n\nbutton.addEventListener("click", () => {\n  clicks += 1;\n  button.textContent = `Clicks: ${clicks}`;\n});',
      lessons: [
        lesson('js-1','JavaScript wakes the page up',5,'JavaScript lets a page remember values, make decisions, and react to people.',[
          ['Statement','A statement is an instruction for the computer.'],['console.log','Prints a value to the developer console.'],['Strings','Text values go inside quotes.']
        ],'console.log("Hello!");','The console prints Hello!','Log the words “I can code”.','console.log("Hello!");',['console.log("I can code")'],'Keep the text inside quotation marks.'),
        lesson('js-2','Variables remember things',6,'A variable gives a value a name so your code can use it later.',[
          ['const','Use const when the variable should not be reassigned.'],['let','Use let when the value needs to change.'],['=','The equals sign here assigns a value; it does not ask a math question.']
        ],'const name = "Ari";\nlet score = 0;\nscore = score + 1;','name stays Ari; score can change.','Create a variable with let called lives and set it to 3.','let score = 0;',['let lives = 3'],'Write let, then the name, =, the value, and ;.'),
        lesson('js-3','Decisions with if',7,'An if statement runs code only when its condition is true.',[
          ['Condition','A true-or-false test inside parentheses.'],['===','Checks whether two values are exactly equal.'],['else','Runs a different block when the if condition is false.']
        ],'const score = 10;\nif (score === 10) {\n  console.log("You win!");\n} else {\n  console.log("Keep going");\n}','Because score is 10, the win message runs.','Write an if that checks age === 12.','const age = 12;\nif ( ) {\n  console.log("Twelve!");\n}',['age === 12'],'Put the comparison inside the parentheses.'),
        lesson('js-4','Loops repeat work',7,'Loops save you from writing the same instruction again and again.',[
          ['for','A for loop repeats while its condition remains true.'],['i++','Adds 1 to i after each round.'],['Block','The code inside { } runs each time.']
        ],'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}','Prints 0, then 1, then 2.','Make the loop repeat 5 times instead of 3.','for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',['i < 5'],'Change only the stopping condition.'),
        lesson('js-5','Functions package ideas',8,'A function is a reusable set of instructions with a name.',[
          ['function','Declares a function.'],['Parameters','Names inside ( ) receive values when the function runs.'],['return','Sends a result back to the code that called the function.']
        ],'function double(number) {\n  return number * 2;\n}\n\nconsole.log(double(4));','The function returns 8.','Create a function named greet with one parameter named name.','function  () {\n  console.log("Hi");\n}',['function greet(name)'],'Put the function name before the parentheses and name inside them.'),
        lesson('js-6','Arrays store lists',7,'An array keeps several values together in one ordered list.',[
          ['[ ]','Square brackets create an array.'],['Index','Positions start at 0, so items[0] means the first item.'],['push','Adds a new value to the end of an array.']
        ],'const games = ["Minecraft", "Chess"];\ngames.push("Tetris");\nconsole.log(games[0]);','The array gains Tetris; the console prints Minecraft.','Add “Roblox” using push.','const games = ["Minecraft"];\n',['games.push("Roblox")'],'Call .push on the games array.'),
        lesson('js-7','The DOM is the webpage',9,'The DOM is JavaScript’s object version of the current HTML page.',[
          ['document','The starting object for the webpage.'],['querySelector','Finds the first element matching a CSS selector.'],['textContent','Reads or changes the text inside an element.']
        ],'const title = document.querySelector("h1");\ntitle.textContent = "Changed by JavaScript";','The h1 text changes without editing the HTML file.','Select the element with class .score.','const score = document.querySelector( );',['document.querySelector(".score")'],'CSS class selectors start with a dot.'),
        lesson('js-8','Events react to people',9,'Events let your code respond to clicks, typing, scrolling, and more.',[
          ['addEventListener','Waits for a named event on an element.'],['click','The event name for a click or tap.'],['Callback','The function that runs when the event happens.']
        ],'button.addEventListener("click", () => {\n  console.log("Clicked!");\n});','The message prints each time the button is clicked.','Listen for a click on button.','button.addEventListener("", () => {\n  console.log("Go!");\n});',['addEventListener("click"'],'Put click between the quotes.'),
        lesson('js-9','Objects group details',8,'Objects keep related named values together.',[
          ['{ }','Curly braces create an object.'],['Property','A named value inside the object.'],['Dot notation','player.score reads the score property.']
        ],'const player = {\n  name: "Nova",\n  score: 12\n};\nconsole.log(player.score);','The console prints 12.','Add a lives property with value 3.','const player = {\n  name: "Nova"\n};',['lives: 3'],'Add a comma after name, then the new property.'),
        lesson('js-10','JavaScript final build',12,'Build a tiny interactive feature using state, a function, the DOM, and an event.',[
          ['State','A variable stores what your app knows right now.'],['Event','A click changes that state.'],['Render','Update the page so the screen matches the new state.']
        ],'let score = 0;\nfunction addPoint() {\n  score += 1;\n  document.querySelector("#score").textContent = score;\n}','A reusable function changes state and updates the page.','Increase score by 1 inside addPoint.','let score = 0;\nfunction addPoint() {\n  // your code\n}',['score += 1'],'Use += 1 to add one to the existing value.')
      ]
    },
    {
      id: 'python', name: 'Python', category: 'programming', icon: 'Py', color: 'green',
      tagline: 'Learn programming with readable code.',
      description: 'Variables, input, decisions, loops, functions, lists, dictionaries, and errors.',
      filename: 'main.py',
      lab: 'name = "Coder"\nscore = 3\n\nif score >= 3:\n    print(f"Nice, {name}!")',
      lessons: [
        lesson('py-1','Your first Python line',4,'Python is a general-purpose programming language known for readable syntax.',[
          ['print()','A function that displays a value.'],['Parentheses','The value you give a function goes inside ( ).'],['String','Text goes inside quotes.']
        ],'print("Hello, Python!")','Hello, Python!','Print the words “I made this”.','print("Hello")',['print("I made this")'],'Replace the text inside the quotes.'),
        lesson('py-2','Variables and types',6,'Variables remember values. Python works out many value types automatically.',[
          ['String','Text, such as "Alex".'],['Integer','A whole number, such as 14.'],['Boolean','True or False.'],['=','Assigns a value to a name.']
        ],'name = "Alex"\nage = 12\nlearning = True','Three variables with three different types.','Create points and set it to 100.','name = "Alex"',['points = 100'],'No keyword is needed before a basic Python variable.'),
        lesson('py-3','Input from a person',6,'input() pauses the program and lets the person type a response.',[
          ['input()','Returns what the person typed as a string.'],['Prompt','Text inside input() explains what to type.'],['int()','Converts numeric text into an integer when needed.']
        ],'name = input("What is your name? ")\nprint("Hi", name)','The program asks for a name and greets it.','Ask for age with input and store it in age.','name = input("Name: ")',['age = input(','age ='],'Create a variable called age and assign input(...) to it.'),
        lesson('py-4','if, elif, else',7,'Python uses indentation to show which lines belong inside a decision.',[
          ['if','Checks the first condition.'],['elif','Checks another condition if earlier ones were false.'],['else','Handles everything left over.'],['Indentation','The indented lines belong to the block above them.']
        ],'score = 8\nif score >= 10:\n    print("Gold")\nelif score >= 5:\n    print("Silver")\nelse:\n    print("Bronze")','The program prints Silver.','Check if lives == 0.','lives = 0\nif :\n    print("Game over")',['if lives == 0:'],'Python conditions end with a colon.'),
        lesson('py-5','Loops',7,'for loops are great when you know what to repeat over; while loops repeat while a condition stays true.',[
          ['for item in list','Runs once for each value.'],['range(3)','Produces 0, 1, 2.'],['while','Repeats until its condition becomes false.']
        ],'for number in range(3):\n    print(number)','Prints 0, 1, and 2.','Loop over range(5).','for number in range(3):\n    print(number)',['range(5)'],'Change the number inside range.'),
        lesson('py-6','Functions',8,'Functions let you name a reusable job and optionally return a result.',[
          ['def','Starts a function definition.'],['Parameter','A name that receives an argument.'],['return','Sends a value back from the function.']
        ],'def double(number):\n    return number * 2\n\nprint(double(5))','The program prints 10.','Create a function named greet with a name parameter.','def ():\n    print("Hi")',['def greet(name):'],'Python function definitions end with a colon.'),
        lesson('py-7','Lists and dictionaries',8,'Lists store ordered items. Dictionaries store named values.',[
          ['list','Uses [ ] and numeric indexes.'],['dictionary','Uses { } with key: value pairs.'],['append','Adds an item to the end of a list.']
        ],'games = ["Minecraft", "Tetris"]\nplayer = {"name": "Nova", "score": 4}\ngames.append("Chess")','Two common collection types.','Append “Roblox” to games.','games = ["Minecraft"]',['games.append("Roblox")'],'Use the append method on games.'),
        lesson('py-8','Errors are clues',8,'Errors are messages that tell you where Python got confused. Learning to read them is part of coding.',[
          ['SyntaxError','Python could not understand the code’s grammar.'],['NameError','You used a name Python does not know.'],['Traceback','Shows the path to the line that failed.'],['Debugging','Read the last line first, then check the reported line.']
        ],'score = 4\nprint(score)','This works because score exists before it is used.','Fix the misspelled variable name.','score = 4\nprint(socre)',['print(score)'],'The variable was created as score, not socre.')
      ]
    },
    {
      id: 'c', name: 'C', category: 'programming', icon: 'C', color: 'slate',
      tagline: 'Learn what programs are made of.',
      description: 'Types, memory-minded thinking, conditions, loops, functions, arrays, and pointers.',
      filename: 'main.c',
      lab: '#include <stdio.h>\n\nint main(void) {\n    int score = 5;\n    printf("Score: %d\\n", score);\n    return 0;\n}',
      lessons: [
        lesson('c-1','The shape of a C program',6,'C is compiled before it runs. A small program usually starts in a function called main.',[
          ['#include <stdio.h>','Gives access to standard input/output tools like printf.'],['int main(void)','The main function where execution begins.'],['return 0','Signals successful completion.'],[';','Most C statements end with a semicolon.']
        ],'#include <stdio.h>\nint main(void) {\n    printf("Hello!\\n");\n    return 0;\n}','Hello!','Change the printed text to “Hi C!”.','printf("Hello!\\n");',['printf("Hi C!\\n")'],'Only change the string inside printf.'),
        lesson('c-2','Variables have types',7,'In C, you say what type a variable stores when you create it.',[
          ['int','Whole numbers.'],['float','Decimal numbers.'],['char','One character.'],['Declaration','int score = 5; declares and initializes score.']
        ],'int score = 5;\nfloat speed = 2.5f;\nchar rank = \'A\';','Three variables with explicit types.','Create an int named lives with value 3.','int score = 0;',['int lives = 3;'],'Start with int, then the name and value.'),
        lesson('c-3','printf and scanf',8,'printf displays formatted output. scanf can read basic input into variables.',[
          ['%d','Placeholder for an int.'],['&age','scanf needs the address of age so it can store the new value there.'],['\\n','A newline character inside a string.']
        ],'int age;\nprintf("Age: ");\nscanf("%d", &age);\nprintf("You are %d\\n", age);','Reads an integer and prints it back.','Use %d to print score.','int score = 7;\nprintf("Score: ", score);',['%d'],'Put %d inside the format string.'),
        lesson('c-4','Decisions and loops',8,'C uses familiar if, else, for, and while structures with braces around blocks.',[
          ['==','Compares two values.'],['if (...)','Runs a block when its condition is true.'],['for (...)','Repeats with setup, condition, and update.']
        ],'for (int i = 0; i < 3; i++) {\n    printf("%d\\n", i);\n}','Prints 0, 1, 2.','Make the loop stop when i < 5.','for (int i = 0; i < 3; i++) { }',['i < 5'],'Change the middle part of the for loop.'),
        lesson('c-5','Functions',8,'Functions split a program into reusable jobs and make big programs easier to understand.',[
          ['Return type','int add(...) says the function returns an int.'],['Parameters','Typed values the function receives.'],['return','Sends the result back.']
        ],'int add(int a, int b) {\n    return a + b;\n}','add(2, 3) returns 5.','Create an int function named doubleValue.','int (int number) {\n    return number * 2;\n}',['int doubleValue(int number)'],'Put the function name after the return type.'),
        lesson('c-6','Arrays and pointers intro',10,'Arrays store nearby values of one type. Pointers store memory addresses — powerful, but worth learning slowly.',[
          ['int scores[3]','Creates space for three ints.'],['scores[0]','Reads the first item.'],['&score','The address of score.'],['int *ptr','A pointer that can store the address of an int.']
        ],'int score = 9;\nint *ptr = &score;\nprintf("%d\\n", *ptr);','*ptr reads the value stored at score’s address: 9.','Point ptr at lives.','int lives = 3;\nint *ptr = ;',['&lives'],'The & operator gets a variable’s address.')
      ]
    },
    {
      id: 'cpp', name: 'C++', category: 'programming', icon: 'C++', color: 'indigo',
      tagline: 'Build on C with modern tools.',
      description: 'Streams, types, functions, vectors, references, classes, and objects.',
      filename: 'main.cpp',
      lab: '#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = "Coder";\n    std::cout << "Hello, " << name << "!\\n";\n}',
      lessons: [
        lesson('cpp-1','Hello, C++',6,'C++ grows from C and adds higher-level tools such as classes, references, and the standard library.',[
          ['#include <iostream>','Adds input/output stream tools.'],['std::cout','Writes output.'],['<<','Sends a value into the output stream.']
        ],'#include <iostream>\nint main() {\n    std::cout << "Hello!\\n";\n}','Hello!','Print “Hi C++!”.','std::cout << "Hello!\\n";',['"Hi C++!\\n"'],'Replace the text inside the string.'),
        lesson('cpp-2','Types and strings',7,'C++ uses explicit types and has a useful std::string type for text.',[
          ['int','Whole numbers.'],['double','Decimal values.'],['bool','true or false.'],['std::string','Text from the standard library.']
        ],'int score = 10;\ndouble speed = 3.5;\nbool alive = true;\nstd::string name = "Nova";','Four typed variables.','Create an int lives with value 3.','int score = 10;',['int lives = 3;'],'Same pattern: type, name, =, value, semicolon.'),
        lesson('cpp-3','Conditions and loops',7,'C++ uses braces and familiar comparison operators for decisions and repetition.',[
          ['if / else','Choose between blocks.'],['for','Repeat with a counter.'],['while','Repeat while a condition remains true.']
        ],'for (int i = 0; i < 3; ++i) {\n    std::cout << i << "\\n";\n}','Prints 0, 1, 2.','Make the loop run 5 times.','for (int i = 0; i < 3; ++i) { }',['i < 5'],'Change the stopping condition.'),
        lesson('cpp-4','Functions and references',9,'References let a function work with an existing value instead of a copy.',[
          ['int add(...)','A normal value-returning function.'],['int&','A reference to an int.'],['void','The function does not return a value.']
        ],'void addPoint(int& score) {\n    score += 1;\n}','Calling addPoint(score) changes the original score.','Make the parameter an int reference.','void reset(int score) {\n    score = 0;\n}',['int& score'],'Add & after int.'),
        lesson('cpp-5','Vectors are flexible arrays',8,'std::vector stores a list that can grow and shrink.',[
          ['#include <vector>','Adds vector support.'],['std::vector<int>','A vector that stores ints.'],['push_back','Adds a value to the end.']
        ],'std::vector<int> scores = {2, 4};\nscores.push_back(6);','scores now contains 2, 4, 6.','Add 8 with push_back.','scores.push_back(6);',['scores.push_back(8)'],'Call the same method with 8.'),
        lesson('cpp-6','Classes and objects',10,'A class is a blueprint that groups data and behavior; an object is one thing made from that blueprint.',[
          ['class','Starts a class definition.'],['public:','Members below can be used from outside the class.'],['Object','Player p; creates one Player object.']
        ],'class Player {\npublic:\n    int score = 0;\n};\n\nPlayer p;','p is an object with its own score.','Add an int lives member set to 3.','class Player {\npublic:\n    int score = 0;\n};',['int lives = 3;'],'Add another member under public:.')
      ]
    },
    {
      id: 'csharp', name: 'C#', category: 'programming', icon: 'C#', color: 'purple',
      tagline: 'Create apps, games, and tools.',
      description: 'Console programs, types, decisions, loops, methods, collections, and classes.',
      filename: 'Program.cs',
      lab: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string name = "Coder";\n        Console.WriteLine($"Hello, {name}!");\n    }\n}',
      lessons: [
        lesson('cs-1','Hello, C#',6,'C# is widely used for apps, backend services, and games made with engines such as Unity.',[
          ['using System','Makes common System tools easy to access.'],['Main','The usual entry point of a console program.'],['Console.WriteLine','Prints a line of text.']
        ],'Console.WriteLine("Hello!");','Hello!','Print “Hi C#!”.','Console.WriteLine("Hello!");',['Console.WriteLine("Hi C#!")'],'Replace the string inside WriteLine.'),
        lesson('cs-2','Variables and types',7,'C# gives values clear types and can sometimes infer a type with var.',[
          ['int','Whole number.'],['double','Decimal value.'],['string','Text.'],['bool','true or false.'],['var','Lets the compiler infer the type from the value.']
        ],'int score = 10;\nstring name = "Nova";\nbool ready = true;','Three typed variables.','Create int lives = 3.','int score = 10;',['int lives = 3;'],'Use the same type-name-value pattern.'),
        lesson('cs-3','if and switch',8,'Conditions choose what happens next. switch is useful when comparing one value against several exact cases.',[
          ['if','Runs when a condition is true.'],['else','Fallback block.'],['switch','Matches one value against cases.']
        ],'if (score >= 10)\n{\n    Console.WriteLine("Win");\n}\nelse\n{\n    Console.WriteLine("Keep going");\n}','Only one block runs.','Check whether lives == 0.','if ( )\n{\n    Console.WriteLine("Game over");\n}',['lives == 0'],'Put the comparison inside parentheses.'),
        lesson('cs-4','Loops',7,'for and while repeat code; foreach is excellent for stepping through collections.',[
          ['for','Counter-based loop.'],['while','Condition-based loop.'],['foreach','Runs once for each item.']
        ],'string[] names = { "Ari", "Nova" };\nforeach (string name in names)\n{\n    Console.WriteLine(name);\n}','Prints every name in the array.','Change the item variable to game.','foreach (string name in games) { }',['string game in games'],'The variable after string can be renamed.'),
        lesson('cs-5','Methods',8,'Methods are named reusable blocks that live inside a class.',[
          ['static','The method belongs to the class itself in this beginner example.'],['Return type','int means the method returns an int.'],['Parameters','Typed inputs inside parentheses.']
        ],'static int Double(int number)\n{\n    return number * 2;\n}','Double(4) returns 8.','Name the method AddOne.','static int (int number)\n{\n    return number + 1;\n}',['static int AddOne(int number)'],'Put AddOne between the return type and parentheses.'),
        lesson('cs-6','Lists and classes',10,'List<T> stores a growable collection, while classes let you define your own kinds of objects.',[
          ['List<string>','A growable list of strings.'],['Add','Adds an item.'],['class Player','Defines a custom Player type.'],['new Player()','Creates a Player object.']
        ],'var games = new List<string>();\ngames.Add("Minecraft");','The list now contains one game.','Add “Tetris” to games.','games.Add("Minecraft");',['games.Add("Tetris")'],'Call Add again with a new string.')
      ]
    },
    {
      id: 'github', name: 'GitHub', category: 'tools', icon: 'GH', color: 'black',
      tagline: 'Save, share, and publish your code.',
      description: 'Repositories, files, commits, branches, README files, and GitHub Pages — from the website UI first.',
      filename: 'README.md',
      lab: '# My first project\n\nThis is a tiny website I made while learning to code.\n\n## What I learned\n- HTML\n- CSS\n- GitHub',
      lessons: [
        lesson('gh-1','What Git and GitHub are',5,'Git keeps a history of code changes. GitHub is a website that can store Git repositories and help people work together.',[
          ['Repository','A project folder with its files and version history.'],['Git','The version-control system tracking changes.'],['GitHub','A service that hosts repositories online.']
        ],'project/\n├─ index.html\n├─ style.css\n└─ README.md','A repository can be as simple as a folder with a few project files.','Add script.js to the file tree.','project/\n├─ index.html\n├─ style.css',['script.js'],'Add the JavaScript filename as another line.'),
        lesson('gh-2','Create a repository',6,'A repository is the home for one project. Good names are short and clear.',[
          ['Name','Something like my-first-site.'],['Public','Anyone can view it.'],['Private','Only you and people you allow can view it.'],['README','A useful front page explaining the project.']
        ],'Repository: my-first-site\nVisibility: Public\nREADME: yes','A sensible beginner repository setup.','Write the repository name my-game-site.','Repository: ',['my-game-site'],'Use lowercase words separated with hyphens.'),
        lesson('gh-3','Commits are checkpoints',6,'A commit is a saved checkpoint with a short message explaining what changed.',[
          ['Commit','A recorded snapshot of selected changes.'],['Message','A short explanation such as “Add navigation”.'],['History','You can inspect earlier commits later.']
        ],'Commit message: Add profile card','A clear message says what changed.','Write a commit message: Fix mobile layout.','Commit message: ',['Fix mobile layout'],'Describe the change with a short action phrase.'),
        lesson('gh-4','Branches are safe lanes',7,'A branch lets you work on changes without immediately changing the main version.',[
          ['main','Usually the primary branch.'],['Feature branch','A separate line of work such as new-navbar.'],['Merge','Combines approved branch changes back into another branch.']
        ],'main\n  └─ new-navbar\n       └─ changes','The new-navbar branch can change independently before merging.','Name a branch dark-mode.','branch: ',['dark-mode'],'Short hyphenated names are easy to understand.'),
        lesson('gh-5','README files explain projects',7,'README.md is usually the first document people see in a repository.',[
          ['Markdown','A lightweight text format used in README files.'],['# Heading','Creates the biggest Markdown heading.'],['- item','Creates a bullet list item.'],['Code fences','Triple backticks can show code blocks.']
        ],'# My Project\n\nA small website I built.\n\n## Features\n- Responsive layout\n- Dark mode','A readable project front page.','Add a Features heading using ##.','# My Project\n\n',['## Features'],'Two # symbols create a level-two heading.'),
        lesson('gh-6','Publish with GitHub Pages',8,'GitHub Pages can publish static HTML/CSS/JS directly from a branch. You do not need a custom GitHub Actions workflow for this simple setup.',[
          ['Settings → Pages','Open the repository’s Pages settings.'],['Deploy from a branch','Choose branch-based publishing.'],['main / root','A common choice when index.html is in the repository root.'],['index.html','The browser loads this as the site’s main page.']
        ],'Source: Deploy from a branch\nBranch: main\nFolder: / (root)','A plain static site can publish directly from the branch.','Set the branch to main.','Branch: ',['Branch: main'],'Type main after Branch:.')
      ]
    }
  ],

  reference: [
    ref('HTML','<h1> … <h6>','Heading tags','Page headings. Use one clear main h1, then smaller levels for sections.','<h1>My page</h1>'),
    ref('HTML','<p>','Paragraph','A block of normal text.','<p>Hello there.</p>'),
    ref('HTML','<a href="…">','Link','Creates clickable text that leads somewhere.','<a href="about.html">About</a>'),
    ref('HTML','<img>','Image','Displays an image. Use meaningful alt text.','<img src="cat.jpg" alt="Orange cat sleeping">'),
    ref('HTML','<div>','Generic container','Groups content when no more meaningful semantic element fits.','<div class="card">…</div>'),
    ref('HTML','<section>','Section','Groups related content into a meaningful section.','<section><h2>News</h2></section>'),
    ref('HTML','<button>','Button','An interactive control for an action.','<button type="button">Save</button>'),
    ref('HTML','<input>','Input','A field for entering data.','<input type="text" id="name">'),
    ref('CSS','selector { }','CSS rule','Selects elements and applies declarations.','h1 { color: blue; }'),
    ref('CSS','color','Text color','Changes foreground text color.','color: #1d1d1f;'),
    ref('CSS','background','Background','Sets a background color or image.','background: white;'),
    ref('CSS','padding','Inside spacing','Adds space between content and its edge.','padding: 16px;'),
    ref('CSS','margin','Outside spacing','Adds space outside an element.','margin: 24px 0;'),
    ref('CSS','display: flex','Flexbox','Arranges children along one main direction.','display: flex; gap: 12px;'),
    ref('CSS','display: grid','Grid','Creates row-and-column layouts.','display: grid; grid-template-columns: 1fr 1fr;'),
    ref('CSS','@media','Media query','Applies CSS when a condition such as screen width matches.','@media (max-width: 700px) { … }'),
    ref('JavaScript','const','Constant binding','Creates a variable that cannot be reassigned.','const name = "Nova";'),
    ref('JavaScript','let','Changeable binding','Creates a variable whose value can be reassigned.','let score = 0;'),
    ref('JavaScript','if / else','Decision','Runs different blocks based on a condition.','if (score > 5) { … } else { … }'),
    ref('JavaScript','for','Loop','Repeats code with a counter or condition.','for (let i = 0; i < 3; i++) { … }'),
    ref('JavaScript','function','Function','Names reusable instructions.','function greet(name) { return `Hi ${name}`; }'),
    ref('JavaScript','array','Ordered list','Stores several values in one ordered collection.','const items = ["a", "b"];'),
    ref('JavaScript','object','Named data','Stores related values as properties.','const player = { name: "Nova", score: 2 };'),
    ref('JavaScript','querySelector','Find an element','Finds the first DOM element matching a CSS selector.','document.querySelector(".card")'),
    ref('JavaScript','addEventListener','Listen for events','Runs a function when an event happens.','button.addEventListener("click", handler);'),
    ref('Python','print()','Print output','Displays values in the terminal.','print("Hello")'),
    ref('Python','input()','Read input','Pauses and returns typed text.','name = input("Name: ")'),
    ref('Python','if / elif / else','Decision','Chooses code based on conditions.','if score > 5:\n    print("Nice")'),
    ref('Python','for','Loop over values','Repeats for each value in a sequence.','for item in items:\n    print(item)'),
    ref('Python','while','Condition loop','Repeats while a condition is true.','while lives > 0:\n    play()'),
    ref('Python','def','Define function','Creates a reusable function.','def add(a, b):\n    return a + b'),
    ref('Python','list','Ordered collection','Stores several values in order.','games = ["Minecraft", "Tetris"]'),
    ref('Python','dict','Key-value collection','Stores values under named keys.','player = {"name": "Nova", "score": 3}'),
    ref('C','printf','Formatted output','Prints formatted text and values.','printf("Score: %d\\n", score);'),
    ref('C','scanf','Formatted input','Reads basic formatted input into variables.','scanf("%d", &age);'),
    ref('C','int / float / char','Basic types','Common C value types.','int lives = 3;'),
    ref('C','if / else','Decision','Chooses a block based on a condition.','if (lives == 0) { … }'),
    ref('C','for','Loop','Repeats using setup, condition, and update.','for (int i = 0; i < 3; i++) { … }'),
    ref('C','pointer *','Pointer','Stores or follows a memory address.','int *ptr = &score;'),
    ref('C++','std::cout','Output stream','Writes values to standard output.','std::cout << "Hello\\n";'),
    ref('C++','std::string','String','A standard-library text type.','std::string name = "Nova";'),
    ref('C++','std::vector','Growable list','A standard-library dynamic array.','std::vector<int> scores;'),
    ref('C++','reference &','Reference','Another name for an existing object/value.','void reset(int& score) { score = 0; }'),
    ref('C++','class','Class','Defines a custom type with data and behavior.','class Player { public: int score = 0; };'),
    ref('C#','Console.WriteLine','Print output','Writes a line to the console.','Console.WriteLine("Hello");'),
    ref('C#','string / int / bool','Basic types','Common C# value types.','string name = "Nova";'),
    ref('C#','foreach','Collection loop','Runs once for each item in a collection.','foreach (string game in games) { … }'),
    ref('C#','method','Reusable behavior','A named block inside a class.','static int Double(int n) { return n * 2; }'),
    ref('C#','List<T>','Growable collection','A generic list that can grow.','var games = new List<string>();'),
    ref('GitHub','repository','Project home','A project and its version history.','my-first-site/'),
    ref('GitHub','commit','Saved checkpoint','A recorded set of changes with a message.','Add responsive navigation'),
    ref('GitHub','branch','Separate line of work','Lets you change code without immediately touching main.','feature/dark-mode'),
    ref('GitHub','README.md','Project guide','Markdown file explaining what the project is and how to use it.','# My Project'),
    ref('GitHub','GitHub Pages','Static site hosting','Publishes HTML/CSS/JS from a repository branch.','Settings → Pages → Deploy from a branch')
  ]
};

function lesson(id, title, minutes, intro, explain, code, output, challenge, starter, includes, hint) {
  return { id, title, minutes, intro, explain, code, output, challenge, starter, includes, hint, xp: 50 + Math.max(0, minutes - 4) * 5 };
}

function ref(language, term, title, description, example) {
  return { language, term, title, description, example };
}
