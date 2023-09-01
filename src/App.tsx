import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Header from './Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { icons } from './assets'
import Heart from './Components/Heart'
import { getFavoriate, removeFavoriate } from './redux/actions'
import { Dispatch } from 'redux'


const App: FC = () => {

  interface RootState {
    favoriate: string[]; 
  }


  const dispatch: Dispatch<any>=useDispatch()
  
  const [search,setSearch]=useState("")
  const [data,setData]=useState([])
  
  const {favoriate}=useSelector((store:RootState)=>store)
  
  const [error,setError]=useState("Loading")
 
  useEffect(()=>
  { 
    getData("https://dog.ceo/api/breeds/image/random/10")
  },[])

  const getData=(api:string)=>
  {
 
    axios.get(api).then((r)=>setData(r.data.message)).catch((r)=>{setData([]);setError("No Data Found")})
  }

  const handleClick=(dog:string)=>
  {
  
     if(favoriate.includes(dog))
     {

        dispatch(removeFavoriate(dog))
    
     }
     else
     {
        dispatch(getFavoriate(dog))
     }
  }

  const handleSearch=()=>
  {
    let ser=search.toLowerCase()
    getData(`https://dog.ceo/api/breed/${ser}/images/random/10`)
  }


  return (
    <Container>
      <Header />
      {/* Happy coding! */}
      <div style={{marginBottom:"30px",display:"flex"}}>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} style={{backgroundColor:"#F7F7F7",borderRadius:"4px",width:"100%",padding:"8px"}} />
        <button style={{color:"#fff",backgroundColor:"#0794E3",display:"flex",alignItems:"center",gap:"5px",borderRadius:"4px",border:"1px solid #0794E3"}} onClick={handleSearch}>
           <Heart icon={icons.searchIcon} alt='search'/> Search</button>
      </div>
       <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",gap:"20px" ,justifyContent:"space-between",marginBottom:"30px"} }>

         
         {data?.length==0?<h1>{error}</h1> :""}
         
          {data?.map((dog)=><div style={{backgroundImage:`url(${dog})`,width:"160px",height:"160px",borderRadius:"4px"}}> 
            
             <div style={{position:"relative",left:"85%",top:"85%"}} onClick={()=>handleClick(dog)}>
               <Heart icon={favoriate.includes(dog)?icons.redHeartIcon:icons.whiteHeartIcon} alt='whiteHeartIcon' />
             </div>
             
            
            </div>)}
       </div>
       
       <hr></hr>


       <div style={{display:"flex",gap:"20px"}}>
        <Heart icon={icons.redHeartIcon} alt='red'/> <h2>Favorites</h2>
       </div>
       <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",gap:"20px" ,justifyContent:"space-between",marginBottom:"50px"} }>
        
       {favoriate?.map((dog)=><div style={{backgroundImage:`url(${dog})`,width:"160px",height:"160px",borderRadius:"4px"}}> 
            
            <div style={{position:"relative",left:"85%",top:"85%"}} onClick={()=>handleClick(dog)}>
              <Heart icon={icons.redHeartIcon} alt='redHeartIcon' />
            </div>
      
           
           </div>)}
           </div>
    </Container>
  )
}

const Container = styled.div({
  margin: '0 auto',
  height: '100%',
  width: '560px',
  paddingTop: '60px',
})





export default App