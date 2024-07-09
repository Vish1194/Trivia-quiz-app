import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import OpenLinkInBackground from "./OpenLinkInBackground";

const QuizForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    noQues:"10",
    difficulty: "medium",
    category: "",
    timer:true,
  });
  const [temp,setTemp] = useState('10');
  const [loading,setLoading] = useState(false);
  const checkNoQues = () =>{
    if(temp<=9){
        setFormData({...formData, noQues:'10'});
    }else if(temp >=51){
        setFormData({...formData, noQues:'50'});
    }else{
        setFormData({...formData, noQues:temp});   
    }
  }
  useEffect(()=>{
    checkNoQues();
  },[temp])
  const quizSetSess = () =>{
    if(formData.category === ""){
      sessionStorage.setItem('category','-1')
    }else{
      sessionStorage.setItem('category',formData.category);
    }
    if(formData.difficulty === ""){
      sessionStorage.setItem('difficulty','Miscellaneous')
    }else{
      sessionStorage.setItem('difficulty',formData.difficulty);
    }
  }
  const generateUrl = () =>{
    checkNoQues();
    // console.log(formData);
    let apiUrl = "https://opentdb.com/api.php?amount="+formData.noQues;
    if(formData.category!=""){
        apiUrl+="&category="+formData.category;
    }
    if(formData.difficulty!=""){
        apiUrl+="&difficulty="+formData.difficulty;
    }
    return apiUrl;
  }
  const startGame = async () =>{
    const apiUrl = generateUrl();
    // console.log(apiUrl);
    quizSetSess();
    try {
        // console.log('Requesting....')
        const response = await axios.get(apiUrl);
        if(response.status === 200){
            sessionStorage.setItem('loading',true);
            let data = response.data.results;
            navigate('/quiz',{state:{data:data, timer : formData.timer}});
        }
        // console.log('Got Response.')
    } catch (error) {
        alert('Server Busy, Try again.')
        setLoading(false);
        console.log(error);
    }
  }

  return (
    <div className="container p-3 bg-home2">
      <div className="row mt-2 mx-lg-5 py-4 quiz-form">
        <span className="col-lg-3"></span>
        <form className="col-lg-6 text-light">
          <h2 className="text-center text-light mb-5">Quiz Settings</h2>
          <div className="mt-1">
                <label htmlFor="nques" className="form-label fs-5">Number Of Question</label>
                <input type="number" name="nques" onChange={(e)=>{
                    // setFormData({...formData, noQues:e.target.value})
                    setTemp(e.target.value);
                }} value={temp} className="form-control" aria-describedby="passwordHelpBlock" placeholder="Max : 50"/>
                <p className="fs-6 fst-italic opacity-50">Min: 10 questions Max: 50 questions</p>
          </div>
          <div className="mt-4">
            <label htmlFor="difficulty" className="mb-1 fs-5">Difficulty</label>
            <select className="form-select" onChange={(e) => {
                setFormData({ ...formData, difficulty: e.target.value });
                console.log(formData);
              }} name="difficulty" defaultValue="medium" aria-label="Default select example">
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium" >Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mt-4">
          <label htmlFor="category" className="mb-1 fs-5">Category</label>
            <select className="form-select" onChange={(e)=>{
                setFormData({...formData, category: e.target.value});
                console.log(formData);
            }} name="category" aria-label="Default select example">
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>{" "}
            </select>
          </div>
          <div className="form-check mt-4 d-flex">
            <p>Timer</p>
            <input onChange={()=>{
              setFormData({...formData, timer:!formData.timer});
            }} checked={formData.timer} className="form-check-input mx-2" type="checkbox" id="flexCheckDefault"/>
            {!formData.timer && <p className="opacity-75 fst-italic ">You are making the quiz easier by removing the timer.</p>}
          </div>
          <div className="text-center">
            {/* <OpenLinkInBackground> */}
            <button type="button" className="btn btn-dark mt-4 px-5 fs-4" onClick={()=>{
              startGame();
              setLoading(true);
            }} disabled={loading ? true : false}>
              {
                loading ? 
                  <div className="spinner-border text-light d-flex" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                : 'Start'
              }
            </button>
            {/* </OpenLinkInBackground> */}
          </div>
        </form>
        <span className="col-lg-3"></span>
      </div>
    </div>
  );
};
export default QuizForm;
