import axios from "axios"
import { Dispatch } from "redux"


export const getFavoriate=(dog:string)=>(dispatch:Dispatch)=>
{
    dispatch({type:"ADD_FAVORIATE",payload:dog})
}

export const removeFavoriate=(dog:string)=>(dispatch:Dispatch)=>
{
    dispatch({type:"REMOVE_FAVORIATE",payload:dog})
}