import { useState, useCallback, useEffect, useRef } from "react";

/*
useState: Manages state in functional components.
useCallback: Memoizes functions to prevent unnecessary re-renders.
useEffect: Executes side effects in functional components.
useRef: Creates a mutable object which persists for the lifetime of the component.
 */

function App() {
  // The App function is a functional component that returns the JSX to render the password generator interface.

  /* 
length: Represents the length of the password.
numberAllowed: Boolean indicating if numbers should be included in the password.
charAllowed: Boolean indicating if special characters should be included.
password: Stores the generated password.
*/

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  // passwordRef is used to reference the password input field to facilitate copying the password to the clipboard.

  // PASSWORD GENERATOR FUNCTION
  /**
   This function generates a random password based on the selected options (length, numbers, special characters).
useCallback memoizes the function to optimize performance by preventing unnecessary re-creation of the function unless its dependencies change.
   */

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

// Copy Password to Clipboard Function

/**
 * This function copies the generated password to the clipboard.
It selects the text in the password input field and uses the Clipboard API to copy it.
 */
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);


  // The useEffect hook triggers the password generation function whenever the dependencies (length, numberAllowed, charAllowed) change.

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

/**
 * This code snippet represents the JSX portion of the React component that renders the user interface (UI) for the password generator. Let's break down each element:

Main Container:

pen_spark


 * 
 * This code snippet represents the JSX portion of the React component that renders the user interface (UI) for the password generator. Let's break down each element:

Main Container:

<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
This div element serves as the main container for the password generator UI.
The various classes applied to the div provide styling:
w-full: Makes the element occupy the full width available.
max-w-md: Sets a maximum width to ensure responsiveness on different screen sizes.
mx-auto: Centers the element horizontally.
shadow-md: Adds a subtle shadow effect.
rounded-lg: Applies rounded corners to the element.
px-4 py-3: Adds padding to the top, bottom, left, and right sides (4 units for horizontal padding, 3 units for vertical padding).
my-8: Adds margin to the top and bottom (8 units each).
bg-gray-800: Sets the background color to a dark gray.
text-orange-500: Sets the text color to an orange shade.
Heading:

<h1 className='text-white text-center my-3'>Password generator</h1>
This h1 element displays the main title of the application: "Password Generator".
The classes applied adjust the styling:
text-white: Sets the text color to white for better visibility on the dark background.
text-center: Centers the text horizontally.
my-3: Adds margin to the top and bottom (3 units each).
Password Display and Copy Button:

<div className="flex shadow rounded-lg overflow-hidden mb-4">
This div element creates a container for the password display and copy button.
The classes provide styling:
flex: Arranges child elements in a row.
shadow: Adds a subtle shadow effect.
rounded-lg: Applies rounded corners to the element.
overflow-hidden: Ensures the content doesn't overflow the container.
mb-4: Adds margin to the bottom (4 units).
<input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={passwordRef} />
This input element displays the generated password.
The attributes are used for functionality and styling:
type="text": Specifies the input type as text.
value={password}: Sets the value of the input field to the current password state variable. This ensures the displayed password updates dynamically.
className="outline-none w-full py-1 px-3": Removes the default outline style, makes the input span the full width, and adds padding.
placeholder="Password": Displays a placeholder text "Password" when the field is empty.
readOnly: Disables user input, making the field read-only.
ref={passwordRef}: Assigns a reference to this input element using the useRef hook. This reference is used by the copyPasswordToClipboard function to select and copy the password.
<button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
This button element allows users to copy the generated password to their clipboard.
The attributes handle functionality and styling:
onClick={copyPasswordToClipboard}: Triggers the copyPasswordToClipboard function when the button is clicked.
className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0': Removes the default outline style, sets the background color to blue, sets text color to white, adds padding, and uses shrink-0 to prevent the button from expanding horizontally.
Content: "copy" represents the label for the button.
Password Length and Character Options:

<div className='flex text-sm gap-x-2'>
This div element creates a container for the password length range input and checkboxes for character options.
flex: Arranges child elements in a
 */


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>

      
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

/**
 * Password Length and Character Options:

<div className='flex text-sm gap-x-2'>
This div element creates a container for the password length range input and checkboxes for character options.
flex: Arranges child elements in a
 */