import { useState } from 'react';
import React from 'react';
import './App.css';
import Name from './components/Name'
import User from './components/User'
import Preview from './components/Preview'
import Types from './components/Types';
import Generate from './components/Generate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [close, setClose] = useState(true);
    const [preview, setPreview] = useState(false);
    const [typeActive, setTypeActive] = useState("email");
    const [toneActive, setToneActive] = useState("professional");
    const [lengthActive, setLengthActive] = useState("short");
    const [stringResponse, setStringResponse] = useState("");
    const [generate, setGenerate] = useState(false);
    const [previewText, setPreviewText] = useState("");

    const [task, setTask] = useState('');



    const handleTextareaChange = (value) => {
        setTask(value);
    };

    const handleGenerate = () => {
        setGenerate(true);


        function returnHTMLs() {
            const generalInfo = document.querySelector('.DetailLayout-content-leftColumn .BoxContainer .BoxContent').children[0].outerHTML;
            const contactInfo = document.querySelector('.DetailLayout-content-leftColumn .BoxContainer .BoxContent').children[1].outerHTML;
            const communicationInfo = document.querySelector('.DetailLayout-content-leftColumn .BoxContainer .BoxContent').children[2].outerHTML;

            const interactionInfo = document.querySelector('.DetailLayout-content-mainColumn').children[1].children[1].outerHTML;
            const additionalInfo = document.querySelector('.DetailLayout-content-rightColumn .BoxContainer .BoxContent').children[0].outerHTML;

            return {
                "generalInfo": generalInfo, "contactInfo": contactInfo,
                "communicationInfo": communicationInfo, "interactionInfo": interactionInfo,
                "additionalInfo": additionalInfo, "task": task
            }
        }

        const dataToPost = returnHTMLs()


        //alert(document.querySelector('.BoxContent.BoxContainer.DetailLayout-content-leftColumn').outerHTML)

        // Make the API call to post the data
        fetch('http://localhost:3000/getdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other required headers here
            },
            body: JSON.stringify(dataToPost),
        })
            .then((response) => response.json())
            .then((data) => {

                setPreview(true);
                setGenerate(false);
                setPreviewText(data.data.body);
                console.log('API Response:', data.data);
            })
            .catch((error) => {
                console.error('API Error:', error);
            });
    };

    // console.log(document.querySelector('.DetailLayout-content-leftColumn.BoxContainer.BoxContent').children[0].outerHTML)
    return (
        <>
            {
                close && (
                    <>
                        <div className="absolute inset-y-1/3 right-10 text-white arrow-animation text-4xl">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="absolute inset-y-2/3 right-10 text-white arrow-animation text-4xl">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                    </>
                )
            }
            <div className={`w-5 sticky top-0 right-0 bg-slate-800 h-screen cursor-pointer duration-700 ${close ? "side-close" : "side-open"}`} onClick={() => setClose(false)}></div>
            <div className="absolute top-0 right-0">
                <div className={`extenstion-container duration-700 flex flex-col justify-between gap-3 right-0 bg-slate-800 h-screen width-500 p-5 pl-0 ${close ? "closed" : "opened"}`}>
                    <Name />
                    <User setClose={setClose} />
                    <Types typeActive={typeActive} setTypeActive={setTypeActive} toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} onTextareaChange={handleTextareaChange} />
                    <Generate setStringResponse={setStringResponse} generate={generate} setPreview={setPreview} typeActive={typeActive} toneActive={toneActive} lengthActive={lengthActive} handleGenerate={handleGenerate} />
                    <Preview preview={preview} previewText={previewText} stringResponse={stringResponse} setStringResponse={setStringResponse} />
                </div>
            </div>
        </>
    );
}

export default App;