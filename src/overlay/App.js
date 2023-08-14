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
    const [logoSrc, setLogoSrc] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [customerName, setCustomerName] = useState('Customer name');
    const [typeActive, setTypeActive] = useState("email");
    const [toneActive, setToneActive] = useState("professional");
    const [lengthActive, setLengthActive] = useState("short");
    const [stringResponse, setStringResponse] = useState("");
    const [regenerate, setRegenerate] = useState(false);
    const [generate, setGenerate] = useState(false);
    const [previewText, setPreviewText] = useState("");
    const [task, setTask] = useState('');

    function get_content(html) {
        return html.replace(/<[^>]*>/g, "");
    }

    window.onload = () => {

        const logo = chrome.runtime.getURL('logo.png')

        setLogoSrc(logo)

        const imgElement = document.querySelector('img[src^="https://s.followupboss.com"]');
        const customer_name = document.querySelector('[data-fub-id="PersonDetailsEditLink-names"]').innerHTML;

        if (imgElement) {

            const src = imgElement.getAttribute('src');
            setImgSrc(src)

            console.log(src);
        } else {
            console.log("No matching img element found.");
        }
        setCustomerName(get_content(customer_name))

    }



    const handleTextareaChange = (value) => {
        setTask(value);
    };

    const handleGetGenerated = (genFunc, prevFunc) => {

        return () => {

            genFunc(true);


            function returnHTMLs() {


                const customerName = get_content(document.querySelector('[data-fub-id="PersonDetailsEditLink-names"]').innerHTML);
                const agentName = get_content(document.querySelector('[data-fub-id="PersonDetailsEditLink-assignedUserId"]').innerHTML);


                return {
                    "customer_name": customerName, "agent_name": agentName,
                    "type_active": typeActive, "tone_active": toneActive,
                    "length_active": lengthActive, "task": task
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

                    if (prevFunc) {
                        prevFunc(true)

                    };
                    setStringResponse(data.data.body)
                    genFunc(false)
                    console.log('API Response:', data.data);
                })
                .catch((error) => {

                    console.error('API Error:', error);
                });
        };

    }

    const handleGenerate = handleGetGenerated(setGenerate, setPreview)
    const handleRegenerate = handleGetGenerated(setRegenerate, null)

    // const handleGenerate = () => {
    //     setRegenerate(true);


    //     function returnHTMLs() {


    //         const customerName = get_content(document.querySelector('[data-fub-id="PersonDetailsEditLink-names"]').innerHTML);
    //         const agentName = get_content(document.querySelector('[data-fub-id="PersonDetailsEditLink-assignedUserId"]').innerHTML);


    //         return {
    //             "customer_name": customerName, "agent_name": agentName,
    //             "type_active": typeActive, "tone_active": toneActive,
    //             "length_active": lengthActive, "task": task
    //         }
    //     }

    //     const dataToPost = returnHTMLs()


    //     //alert(document.querySelector('.BoxContent.BoxContainer.DetailLayout-content-leftColumn').outerHTML)

    //     // Make the API call to post the data

    //     fetch('http://localhost:3000/getdata', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // Add any other required headers here
    //         },
    //         body: JSON.stringify(dataToPost),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setPreview(true);
    //             setStringResponse(data.data.body)
    //             setRegenerate(false)
    //             console.log('API Response:', data.data);
    //         })
    //         .catch((error) => {
    //             console.error('API Error:', error);
    //         });
    // };

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
                    <Name logoSrc={logoSrc} />
                    <User setClose={setClose} imgSrc={imgSrc} customerName={customerName} />
                    <Types typeActive={typeActive} setTypeActive={setTypeActive} toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} onTextareaChange={handleTextareaChange} />
                    <Generate setStringResponse={setStringResponse} generate={generate} setPreview={setPreview} typeActive={typeActive} toneActive={toneActive} lengthActive={lengthActive} handleGenerate={handleGenerate} />
                    <Preview preview={preview} previewText={previewText} stringResponse={stringResponse} setStringResponse={setStringResponse} regenerate={regenerate} setRegenerate={setRegenerate} handleRegenerate={handleRegenerate} />
                </div>
            </div>
        </>
    );
}

export default App;