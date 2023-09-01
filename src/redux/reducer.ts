

interface Action 
{
    type:string,
    payload:string
}

interface State{

    favoriate:string[]
}


export const reducer = (state : State = {favoriate:[]}, action:Action) => {
    switch (action.type) {

         
        case "ADD_FAVORIATE": return {...state,favoriate:[...state.favoriate,action.payload]}
        
        case "REMOVE_FAVORIATE": {
            let newData=state.favoriate.filter((dog)=>dog!==action.payload)
            return {...state,favoriate:newData}
        }

      default:
        return state
    }
  }