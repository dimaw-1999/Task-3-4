


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import React, { useEffect, useState } from 'react';


function Details() {
  const [name,setName]=useState("");
  const [addedDate,setDate]=useState("");
  const[id,setId]=useState(0);
  const[tasks,setTasks] = useState([]);
  let {idCard} = useParams();
  const[nameTask,setTaskes] = useState("");
  const[name1,setName1] = useState("");
  
  
  async function setData(data) {
    setName(data.name);
    setDate(data.addedDate);
    setId(data.id);
    setTasks(data.tasks);
    
  }

  useEffect(() => {
    GetCard(idCard);
  }, []);
  
  const changeName = event=> {
    setName(event.target.value);
}




  const change = event=> {
    document.getElementById("23").style.display="none";
    document.getElementById("24").style.display="block";
    document.getElementById("25").style.display="none";
    document.getElementById("26").style.display="block";
    document.getElementById("27").style.display="block";
    document.getElementById("28").style.display="none";
    document.getElementById("29").style.display="none";



}
const change1 = event=> {
  document.getElementById("23").style.display="block";
  document.getElementById("24").style.display="none";
  document.getElementById("25").style.display="block";
  document.getElementById("26").style.display="none";
  document.getElementById("27").style.display="none"
  document.getElementById("28").style.display="block";
  document.getElementById("29").style.display="block";


}







  async function GetCard(id) {
    
    let response = await fetch("http://localhost:8000/api/getOneCard/"+id);
      
    let respo =await response.json();

    setData(respo);
    
    
    
  }
  const edit = event=> {
    const inputData = {id,name,addedDate,tasks};
    editCard(inputData);
    alert("Edited!!!");
    
  
}

async function delet() {
  const inputData = id;
  del(inputData);
  window.location.href="http://localhost:3000/all"
}


async function del(data) {
  const response = await fetch("http://localhost:8000/api/delCard",{
    method : "DELETE",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type" : "application/json"
    },
    redirect:"follow",
    referrerPolicy:"no-referrer",
    body:JSON.stringify(data)
  })
  

}

const setTask = event => {
  setTaskes(event.target.value);
  
  
}

const handleSubmit = event => {

  const inputData = {id,name:nameTask,addedDate,tasks}
  addTask(inputData);
  setTaskes("");
  window.location.href="http://localhost:3000/editItem/"+id
  
  
}





async function addTask(data) {
  
  const response = await fetch("http://localhost:8000/api/addTask",{
    method : "PUT",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type" : "application/json"
    },
    redirect:"follow",
    referrerPolicy:"no-referrer",
    body:JSON.stringify(data)
  })
 
}

  async function editCard(data) {
    const response = await fetch("http://localhost:8000/api/editCard",{
      method : "PUT",
      mode:"cors",
      cache:"no-cache",
      credentials:"same-origin",
      headers:{
          "Content-Type" : "application/json"
      },
      redirect:"follow",
      referrerPolicy:"no-referrer",
      body:JSON.stringify(data)
    })
    
    
}

 
  return (
    <div className="container" style={{background:"DarkSlateGray",height:"200px"}}>
      <div className="w-100 mt-5" >
          <div className="ml-4 text-white" style={{marginTop:"50px",position:"absolute"}}>
            <h3 id="23" style={{display:"block"}}>{name}</h3>
            <input  id="24" value={name} onChange={changeName} style={{display:"none",width:"500px",height:"50px"}}/>
            <p id="29" style={{marginTop:"10px"}}>{addedDate}</p>
            <div className="row ml-1 text-white mt-5">
              <a type="button" id="28" onClick={change}>EDIT</a>
              <a type="button" onClick={edit} id="27" style={{color:"steelblue",display:"none"}}>SAVE</a>
              <a type="button" onClick={delet} id="25" style={{color:"red",marginLeft:"50px",display:"block"}}>DELETE</a>
              <a type="button" onClick={change1} id="26" style={{color:"silver",marginLeft:"50px",display:"none"}}>CANCEL</a>
            </div>
          </div>
      </div>
      <div className="text-center" style={{border:"solid silver 1px",width:"1150px",marginTop:"250px",position:'absolute',marginLeft:"-20px"}}>
        
        <input type="text"  value={nameTask} onChange={setTask}   placeholder="Add new task" className="mt-3" style={{marginLeft:"-700px",width:"350px",height:"50px",border:"solid white 1px"}}/><br/>
        <hr/>
        <button onClick={handleSubmit} className="btn btn-info mb-2" style={{marginLeft:"-950px"}}>Add task++</button>
        
      </div>
      <div style={{marginTop:"410px",position:"absolute",width:"1150px",marginLeft:"-20px"}}>
      {tasks?.map(task=>(
        <div className="w-100 mt-3 p-4" style={{border:"solid silver 1px",width:"1150px"}}>
          <h4>{task.cardText}</h4>
          <p>{task.addedDate}</p>
          <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label class="form-check-label" for="flexSwitchCheckDefault">Done</label>
</div>
        </div>
      ))}
      </div>
</div>
  )
}



function MainFunction() {
  let match = useRouteMatch();
  const [data, setData] = useState([]);
  const [name,setName] = useState("");
  const[nameSearch,setSearch] = useState("");
  const[result,setResult] = useState([]);


  const handleChange = event => {
    setName(event.target.value);
  }

  const handleSubmit = event => {
    const inputData = {name}
    addCard(inputData);
    setName("");
    window.location.href="http://localhost:3000/all";
    
  }

  



  async function addCard(data) {
      const response = await fetch("http://localhost:8000/api/addCard",{
        method : "POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type" : "application/json"
        },
        redirect:"follow",
        referrerPolicy:"no-referrer",
        body:JSON.stringify(data)
      })
  }
  


  async function loadData() {
    let response = await fetch("http://localhost:8000/api/getCard");
    let cards =await response.json();

    setData(cards);
    
    
  }
  const handleSearch = event => {
      setSearch(event.target.value);
  }

  const clickOn = event => {
    document.getElementById("66").style.display="none";
    document.getElementById("55").style.display="block";
    document.getElementById("67").style.display="block";
    document.getElementById("68").style.display="block";

  }
  const ClickOn = event => {
    document.getElementById("66").style.display="block";
    document.getElementById("55").style.display="none";
    document.getElementById("67").style.display="none";
    document.getElementById("68").style.display="none";
    document.getElementById("777").style.display="none";
    document.getElementById("888").style.display="block";
    document.getElementById("999").style.display="block";
    setSearch("");

  }
  async function handleS() {
    getSearch(nameSearch);
    document.getElementById("777").style.display="block";
    document.getElementById("888").style.display="none";
    document.getElementById("999").style.display="none";
  }

  async function getSearch(nam) {
    let response = await fetch("http://localhost:8000/api/getByName/"+nam);
    let cardes =await response.json();
    setResult(cardes);
  }

  
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    
    <div className="container">
      <Router>
      <div className="mt-4">
   <div  id="66" style={{background:"steelblue",height:"50px",width:"950px",display:"block"}}>
    <button style={{background:"steelblue",border:"solid steelblue 1px",marginTop:"7px",marginLeft:"7px"}} onClick={clickOn}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
    </div>
    <button  id="67" style={{background:"white",border:"solid white 1px",marginTop:"7px",marginLeft:"7px",display:"none",position:"absolute"}} onClick={handleS} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
    <input value={nameSearch} onChange={handleSearch} id="55" type="text" style={{background:"white",height:"50px",width:"930px",display:"none",marginLeft:"40px"}}/>
    <button  id="68"  style={{background:"white",border:"solid white 1px",marginTop:"-40px",marginLeft:"925px",display:"none",position:"absolute"}} onClick={ClickOn}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></button>
   </div>

   <div className="container" style={{display:"none"}} id="777">
        <h3 style={{marginTop:"30px",marginLeft:"32px"}}>Result of searching:{nameSearch}</h3>
        <div  className="row">
           {result?.map(card=> (
             <div className="col-4 mt-3" style={{border:"solid silver 1px",maxWidth:"300px",marginLeft:"50px"}}>
              <div>
                <p style={{fontSize:"30px"}}>{card.name}</p>
                <a href={`/editItem/${card.id}`}  style={{fontSize:"20px",color:"steelblue"}}>Details</a>
                <h6 style={{color:"silver"}}>{card.addedDate}</h6>
              </div>
            </div>
            

          ))}</div>

      </div>
      <div id="888" className="text-center mt-4" style={{border:"solid silver 1px",maxWidth:"400px",marginLeft:"320px",display:"block"}}>
        
        <input type="text" value={name} onChange={handleChange} placeholder="Create new card" className="mt-3" style={{marginLeft:"0px",width:"350px",height:"50px",border:"solid white 1px"}}/><br/>
        <hr/>
        <button  onClick={handleSubmit} className="btn btn-info mb-2" style={{marginLeft:"-150px"}}>Add card++</button>
        
      </div>
      <div id="999" style={{display:"block"}}>
        <div  className="row" >
           {data.map(card=> (
             
            <div className="col-4 mt-3" style={{border:"solid silver 1px",maxWidth:"300px",marginLeft:"50px"}}>
              <div>
                <p style={{fontSize:"30px"}}>{card.name}</p>
                <a href={`/editItem/${card.id}`}  style={{fontSize:"20px",color:"steelblue"}}>Details</a>
                <h6 style={{color:"silver"}}>{card.addedDate}</h6>
              </div>
            </div>
            

          ))}</div>
          </div>
          </Router>
</div>


  );


}



function App() {

  return (
<Router>
   <div className="p-4" style={{background:"SteelBlue"}}>
     <div className="container" >
        <div className="row">
          <h3 className="text-white col-3">ITrello</h3>
          <div className="col-4"></div>
          <div className="col-5 float-right mt-2">
          <Link className="ml-5 text-white" to="/all">All Cards</Link>
          <Link className="ml-4 text-white">Register</Link>
          <Link className="ml-4 text-white">Login</Link>
          </div>
        </div>
     </div>
   </div>
   
   <Switch>
        <Route path={`/editItem/:idCard`}>
          <Details />
        </Route>
      <Route path="/">
        <MainFunction />
      </Route>
   </Switch>
</Router>

  );
}

export default App;
