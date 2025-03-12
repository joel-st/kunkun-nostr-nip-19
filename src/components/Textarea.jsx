import { Textarea as KKTextarea } from "@kksh/react"
import { useEffect, useRef } from "preact/hooks"
import { connect } from 'unistore/preact';
import { generateSecretKey } from 'nostr-tools/pure'

// store
import { storeActions } from "@store"

// functional component
export const Textarea = connect([
    'input', 
    'placeholder', 
],
storeActions)(({ input, setInput, placeholder, }) => {
  const textareaRef = useRef(null);
  
  // Function to adjust the height
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height temporarily to get the correct scrollHeight
    textarea.style.height = 'auto';
    // Set the height to match content
    textarea.style.height = `${textarea.scrollHeight}px`;
    console.log(textarea.scrollHeight)
  };
  
  // Adjust height when input changes
  useEffect(() => {
    adjustHeight();
  }, [input]);
  
  return (<KKTextarea
    ref={textareaRef}
    className="w-full h-full max-w-full min-h-[40px] overflow-hidden resize-none"
    placeholder={placeholder}
    value={input}
    onChange={e => {
      setInput(e.target.value);
    }}
  />)
})
