// import React from 'react';
import React, { useState } from 'react';

function TextForm(props) {
    // usestate hooks
    const [text, setText] = useState("");

    // function to convert text in uppercase
    const handleUpperCase = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('Text converted in uppercase!', 'success');
    }

    // function to convert text in lowecase
    const handleLowerCase = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('Text converted in lowercase!', 'success');
    }

    // fuction to clear the text field
    const handleClear = () => {
        let newText = "";
        setText(newText);
        props.showAlert('Clear text!', 'success');
    }

    // fuction to copy the text 
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert('Text copied to clipboard!', 'success');
    }

    // fuction to clear extra spaces in the text field
    const handleClearSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert('Clear extra spaces!', 'success');
    }

    // function to change the text when we click
    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div className='d-flex flex-column' style={{color: props.mode==='light'?'black':'white'}}>
            <h1>{props.title}</h1>
            <div className="mb-3">
                <textarea id='myBox' className="form-control" value={text} onChange={handleOnChange} rows="10" style={{ backgroundColor: props.mode === 'light' ? 'white' : '#151616', color: props.mode === 'light' ? 'black' : 'white' }}></textarea>
            </div>
            <div className='align-self-end'>
                <button className='btn btn-primary ' onClick={handleUpperCase}>Convert Uppercase</button>
                <button className='btn btn-primary mx-5 my-1' onClick={handleLowerCase}>Convert Lowercase</button>
                <button className='btn btn-primary' onClick={handleCopy}>Copy Text</button>
                <button className='btn btn-primary mx-5 my-1' onClick={handleClearSpaces}>Clear Extra Spaces</button>
                <button className='btn btn-primary' onClick={handleClear}>Clear Text</button>
            </div>

            <div className='container my-3' style={{color: props.mode==='light'?'black':'white'}}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => {return element.length !== 0}).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} Minutes to read</p>

                <h2>Preview</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default TextForm;
