// import React from 'react';
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
// import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4',
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1,
//     },
// });

function TextForm(props) {

    const componentPdf = useRef();

    // usestate hooks
    const [text, setText] = useState("");

    const handlePdf = async () => {
        const result = await fetch('http://localhost:5000/msg');
        const finalResult = await result.text();

        // console.log(finalResult);
        setText(finalResult);
    }

    const generatePdf = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "User Data",
        onAfterPrint: () => alert("Data saved in pdf")
    });

    // const textareaRef = useRef(null);
    // const pdfViewerRef = useRef(null);

    // const handleConvertToPdf = () => {
    //     const textarea = textareaRef.current;
    //     const pdfViewer = pdfViewerRef.current;

    //     html2canvas(textarea).then((canvas) => {
    //         // const imgData = canvas.toDataURL('image/png');
    //         const doc = (
    //             <Document>
    //                 <Page size="A4" style={styles.page}>
    //                     <View style={styles.section}>
    //                         <Text>{textarea.value}</Text>
    //                     </View>
    //                 </Page>
    //             </Document>
    //         );

    //         pdfViewer.updateContainer(<PDFViewer>{doc}</PDFViewer>);

    //         // Save the PDF
    //         const pdfBlob = pdfViewer.container.children[0].pdf.output('blob');
    //         const pdfUrl = URL.createObjectURL(pdfBlob);
    //         const link = document.createElement('a');
    //         link.href = pdfUrl;
    //         link.download = 'textarea_content.pdf';
    //         link.click();
    //     });
    // };

    // const generatePdf2 = () => {
    //     const content = document.getElementById('myBox');
    //     const doc = new jsPDF();

    //     doc.text(content);
    //     doc.save("sample.pdf");
    // }

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
        <div className='d-flex flex-column' style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
            <h1>{props.title}</h1>
            <div ref={componentPdf}>
                <div className="mb-3">
                    <textarea id='myBox' className="form-control" value={text} onChange={handleOnChange} rows="10" style={{ backgroundColor: props.mode === 'light' ? 'white' : '#151616', color: props.mode === 'light' ? 'black' : 'white' }}></textarea>
                    {/* <textarea id='myBox' ref={textareaRef} className="form-control" value={text} onChange={handleOnChange} rows="10" style={{ backgroundColor: props.mode === 'light' ? 'white' : '#151616', color: props.mode === 'light' ? 'black' : 'white' }}></textarea> */}
                </div>
            </div>
            <div className='align-self-end'>
                <button className='btn btn-primary ' onClick={handleUpperCase}>Convert Uppercase</button>
                <button className='btn btn-primary mx-5 my-1' onClick={handleLowerCase}>Convert Lowercase</button>
                <button className='btn btn-primary' onClick={handleCopy}>Copy Text</button>
                <button className='btn btn-primary mx-5 my-1' onClick={handleClearSpaces}>Clear Extra Spaces</button>
                <button className='btn btn-primary' onClick={handleClear}>Clear Text</button>
                <button className='btn btn-primary mx-5 my-1' onClick={handlePdf}>Extract Data</button>
                <button className='btn btn-primary' onClick={generatePdf}>Generate Pdf</button>
                {/* <button className='btn btn-primary mx-5 my-1' onClick={generatePdf2}>Generate Pdf</button> */}
                {/* <button className='btn btn-primary mx-5 my-1' onClick={handleConvertToPdf}>Generate handle Pdf</button>
                <div ref={pdfViewerRef} style={{ display: 'none' }} /> */}
            </div>

            <div className='container my-3' style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} Minutes to read</p>

                {/* <h2>Preview</h2>
                <p>{text}</p> */}
            </div>
        </div>
    )
}

export default TextForm;
