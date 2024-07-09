import { useEffect, useState } from "react";
import QuesAns from "./QuesAns";
import {useLocation, useNavigate} from 'react-router-dom'
import { bgUpdate, quesCardUpdate , msToTime } from "../js/allFunctions.js"
import { decode } from "html-entities";
import Timer from 'tm-timer'

const MCQ = () =>{
    const location = useLocation();
    const [index,setIndex] = useState(0);
    const [mcq,setMcq] = useState(location.state.data);
    const t = new Timer();
    const [timer,setTimer] = useState('');
    const regex = new RegExp('00:*');


    const navigate = useNavigate();

    const results = mcq;
    const [shuffledOptions, setShuffledOptions] = useState([]);
    useEffect(() => {
        if (results && results.length > 0) {
        const currIndex = results[index]; // Handle potential undefined current question
        if (currIndex) { // Check if currIndex exists before accessing properties
            const options = currIndex.incorrect_answers.concat([currIndex.correct_answer]);
            options.sort(() => Math.random() - 0.5);
            setShuffledOptions(options);
        }
        }
    }, [results, index]); 
       

    const [selectedAns, setSelectedAns] = useState(new Array(results.length).fill(null)); // Initialize with null values
    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const newSelectedAns = [...selectedAns]; // Create a copy
        newSelectedAns[questionIndex - 1] = selectedAnswer;
        setSelectedAns(newSelectedAns);
    };

    useEffect(()=>{
        const startTimer = () =>{
            t.set(1000 * 60 * results.length);
            t.whenDone(() => {
                console.log("Time's Up!");
                t.destroy();
                setTimer("Time's Up!");
            });
            t.onTick((isBigTick, timeLeft) => {
                setTimer(msToTime(timeLeft));
            });
            t.start();
        }
        location.state.timer && startTimer();

        //Reload navigate logic using session
        const isReload = () =>{
            if(sessionStorage.getItem('loading')){
                sessionStorage.removeItem('loading');
            }else{
                navigate('/');
            }
        }
        isReload();
        window.onbeforeunload = () => {return true;}
        return () =>{ window.onbeforeunload = null; }
    },[])

    useEffect(()=>{
        if(timer === "Time's Up!"){
            navigate('/score',{state:{selectedAns,results}});        }
    },[selectedAns,index])
   
    return(
        <div className={bgUpdate(results[index].category)} style={{minHeight:"100vh"}}>
            <div className="text-light px-5 pt-4 d-flex flex-nowrap">
                <div className="col">
                    <p className="fs-5"><b>Category : {decode(results[index].category)}</b></p>
                    <p className="fs-5"><b>Difficulty : {results[index].difficulty}</b></p>
                </div>
                <div className="col d-flex align-self-center justify-content-end font-style-1">
                    <p className={regex.test(timer) ? "fs-3 fw-bold text-danger" : "fs-3 fw-bold"}>{timer}</p>
                </div>
            </div>
            {/* que-card styles from bootstrap appended in function itslef.  */}
            <div className={quesCardUpdate(results[index].category)}> 
                    <QuesAns
                        index={index+1}
                        question={results?.[index]?.question}
                        answers={shuffledOptions}
                        onAnswerSelected={handleAnswerSelection}
                    />
                    <div className="text-center">
                        {
                            index<results.length-1 ?
                            <button onClick={()=>{
                                setIndex(index+1);
                            }} className="btn btn-dark px-lg-5 fs-5" >Next</button>
                            : <button onClick={()=>{
                                navigate('/score',{state:{selectedAns,results}})
                            }} className="btn btn-dark px-lg-5 fs-5" >Submit</button>
                        }
                    </div>
            </div>
        </div>
    )
}
export default MCQ;