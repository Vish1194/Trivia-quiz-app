import { useLocation, useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import { findCategoryByNum } from "../js/allFunctions.js";
import ConfettiExplod from "react-confetti-explosion";


const Score = () =>{

    const location = useLocation();
    const data = location.state;
    const selectedAns = data.selectedAns;
    const results = data.results;

    const publishScore = () =>{
        let score = 0;
        for(let i=0;i<results.length;i++){
            if(selectedAns[i] === results[i].correct_answer){
                score++;
            }
        }
        return score;
    }
    const score = publishScore();
    let scoreStyle;
    let scoreStat;
    // if(score>=5){
    //     if(score>=7){
    //         scoreStyle='text-success'
    //     }else{
    //         scoreStyle='text-warning'
    //     }
    // }else{
    //     scoreStyle='text-danger'
    // }
    const navigate = useNavigate();
    const category = findCategoryByNum(sessionStorage.getItem('category'));
    const difficulty = sessionStorage.getItem('difficulty') ? sessionStorage.getItem('difficulty') : results[0].difficulty;
    const celebrate = () =>{
        if(score>=(results.length/2)){
            if(score>=Math.floor(results.length-(results.length/5))){
                scoreStyle="text-green";
                scoreStat = "Knowledge champion! You aced the quiz!";
                return <ConfettiExplod force={0.9} duration={5000} particleCount={250} width={1700}/>
            }else if(score>=Math.floor(results.length-(results.length/4)-1)){
                scoreStyle="text-yellow";
                scoreStat = "Nearly there, quiz whiz! Show off your knowledge!";
                return <ConfettiExplod force={0.7} duration={5000} particleCount={100} width={1700}/>
            }else{
                scoreStyle="text-warning";
                scoreStat = "Impressive! You're mastering key concepts.";
                return <ConfettiExplod force={0.5} duration={5000} particleCount={30} width={1700}/>
            }
        }else if(score>=Math.ceil(results.length/3)){
            scoreStyle="text-orange";
            scoreStat = "Great start! Keep building your quiz skills.";
        }else{
            scoreStyle="text-danger";
            scoreStat = "Just starting out? No worries, everyone's a quiz beginner once!";
        }
    }

    window.onpopstate = function (e){
        navigate('/')
    }

    return(
        <>
            <div className="bg-grad1 text-light p-lg-5 p-3">
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}> {celebrate()}</div>
                <h1 className={scoreStyle} style={{textAlign:"center",fontStyle:"italic"}}>Your Score is {score}<span className="fs-6 opacity-25">{" / "+results.length}</span></h1>
                <p className={scoreStyle} style={{textAlign:"center",fontStyle:"italic",fontFamily:"cursive"}}>{score==results.length ? "Unbeatable! Perfect score - you're a true champion!" : scoreStat}</p>
                {/* <p className="opacity-25 text-light text-center mt-0" style={{fontSize:"10px"}}>{score>=results.length/2 && "(Press 'F5' to celebrate)"}</p> */}
                <p><b>Category</b> : {decode(category)} <br /> <b>Difficulty</b> : {difficulty}</p>
                {
                    results.map((r,index)=>(
                        <div key={index} className={r.correct_answer === selectedAns[index] ? 'bg-success p-4 mt-5 rounded-2' : 'bg-danger p-4 mt-5 rounded-2'}>
                            <h3>{index+1+'. '+decode(r.question)}</h3>
                            <div>
                                <p className="m-0">Correct Answer: <b>{decode(r.correct_answer)}</b></p>
                                <p className="m-0">Your Answer: <b>{selectedAns[index]!=null ? decode(selectedAns[index]) : '(Skipped)'}</b></p>
                            </div>
                        </div>
                    ))
                }
                <div className="text-center mt-5">
                    <button type="button" onClick={()=>{
                        navigate('/');
                    }} className="btn btn-primary fs-5" >Back to Menu</button>
                </div>
            </div>
        </>
    )
}
export default Score;