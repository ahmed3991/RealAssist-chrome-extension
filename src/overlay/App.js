import { useState } from 'react';
import React from 'react';
import './App.css';
import Name from './components/Name'
import User from './components/User'
import Preview from './components/Preview'
import Types from './components/Types';
import Generate from './components/Generate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [close, setClose] = useState(true);
    const [preview, setPreview] = useState(false);
    const [previewText, setPreviewText] = useState("");
    const [typeActive, setTypeActive] = useState("email");
    const [toneActive, setToneActive] = useState("professional");
    const [lengthActive, setLengthActive] = useState("short");
    const [generate, setGenerate] = useState(false);


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
        close ? (
            // <div className="z-50 fixed right-5 top-5 h-10 w-10 bg-slate-700 rounded-md flex justify-center items-center text-white cursor-pointer" onClick={() => setClose(false)}>
            //     <FontAwesomeIcon icon={faGear} className='setting-gear' />
            // </div>

            <div className="z-50 fixed right-5 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-slate-700 rounded-md flex justify-center items-center text-white cursor-pointer" onClick={() => setClose(false)}>
                <FontAwesomeIcon icon={faGear} className='setting-gear' />

                {/* <img src="./logo.png" alt="RealAssist.AI" /> */}
            </div>
        ) : (
            <div className="z-50 h-screen w-full bg-slate-800 bg-opacity-25 fixed top-0">
                <div className="extenstion-container flex flex-col justify-between gap-3 absolute p-5 right-0 bg-slate-800 h-screen w-2/5 lg:w-2/5 xl:w-2/6 2xl:w-1/4">
                    <Name />
                    <User setClose={setClose} />
                    <Preview preview={preview} previewText={previewText} />
                    <Types typeActive={typeActive} setTypeActive={setTypeActive} toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} onTextareaChange={handleTextareaChange} />
                    <Generate generate={generate} setPreview={setPreview} typeActive={typeActive} toneActive={toneActive} lengthActive={lengthActive} handleGenerate={handleGenerate} />
                </div>
            </div>
        )
    );
}

export default App;
