import React, {useReducer} from "react";

const initialState = {count: ["hello"]};

function reducer(state, action) {
  switch (action) {
    case 'add':
    //   state.count[state.count.length] = "123"
      console.log('add')
      return {count: state.count};
    // case 'sub':
    //   return {count: state.count};
    default:
      throw new Error();
  }
}

export default function Trolley() {
    const [state, dispatch] = useReducer(reducer, initialState)

    // var text = ""
    // for (let i=0; i<items.length; i++) {
    //     text += "<li>" + items[i] + "</li>"
    // }
    console.log('=====')

    return (
        <div>
            <h2>Trolley:</h2>
            {state.count.toString()}
            <button onClick={()=>{dispatch("add")}}>add</button>
        </div>
    )

}