import { Textarea as KKTextarea } from "@kksh/react"
import { useEffect, useRef, useState } from "preact/hooks"
import { connect } from 'unistore/preact';

// store
import { storeActions } from "@store"

// functional component
export const Textarea = connect([
    'input', 
    'placeholder', 
],
storeActions)(({ input, setInput, placeholder, }) => {
  const textareaRef = useRef(null);
  const [inputHasChanged, setInputHasChanged] = useState(false);
  
  // Function to adjust the height
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height temporarily to get the correct scrollHeight
    textarea.style.height = 'auto';
    // Set the height to match content
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  
  // Adjust height when input changes
  useEffect(() => {
    if (!inputHasChanged &&input.length > 0) {
      setInputHasChanged(true);
      adjustHeight();
    }
    if (inputHasChanged && textareaRef.current) {
      adjustHeight();
    }
  }, [input]);
  
  return (<KKTextarea
    ref={textareaRef}
    className="w-full h-auto max-w-full min-h-[40px] overflow-hidden"
    placeholder={placeholder}
    value={input}
    onChange={e => {
      setInput(e.target.value);
    }}
  />)
})
