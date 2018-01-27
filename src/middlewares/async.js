//returns a function,
//when ran it returns
//another function

export default function({dispatch}){
  return next => action => {
    //If the action does not have payload
    //or, the payload does not have a .then
    //property, we don't care about it, send it on
    //using .then to see if action has a promise
    if(!action.payload || !action.payload.then){
      return next(action);
    }

    //if we have a promise, wait for it to
    //resolve

    //make sure the action's promise resolves
    //.then can only be called once promise
    //is resolved
    action.payload
      .then(function(response){
        const newAction = { ...action, payload: response };
        //take this action, and send it through
        //the middleware like a new action (runs
        //cycle over again)
        dispatch(newAction);
      });
  }
}
