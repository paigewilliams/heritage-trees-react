# Redux Work Flow

## Description
What follows is a step-by-step work flow that we found useful in learning how to use Redux in React while building this project. We decided to document this when we began adding the AddressForm component.

Hopefully, we will be able to identify a general workflow that would apply to most Redux components, or at least stateful ones.

## The Short List
1. Define actionType constant.
In src/constants/ActionTypes.js.

2. Create actionCreator with the previous actionType.
In src/actions/index.js.

3. Write a function that makes an API call.
In src/actions/index.js

4. Dispatch the actionCreator.
In src/reducers/index.js

5. Parse JSON response.

6. Create a new reducer.
In src/reducers/getCoords.js

7. Add the new reducer to the rootReducer.
In src/reducers/index.js

8. Write tests for the new reducer.
In __tests__/reducers/index.js

9. Run tests.

10. Write tests to add coordinates (coords) to store under specific state slice.
In __tests__/reducers/index.js

11. Cleanup test

12. Define initialState (initialState).
In src/constants/InitialState.js.

13. Write test to assign inputted data.

14. Write reducer logic to make tests pass.

15. Run tests.

16. Create AddressForm component with logic to gather input.

17. Import action to call API in AddressForm

## The Detailed list
1. Define actionType constant. The thought process here might be, "What am I trying to accomplish?"

In src/constants/ActionTypes.js write:
```
export const GET_COORDS = 'GET_COORDS';
```

2. Create actionCreator with the previous actionType.

This is a two step process:

  1. Define the 'shape' of your action.
  2. Write the actionCreator

### Define the 'shape' of your action.
An action is an object. The only thing that an action must have is a 'type'. In this instance the type is 'GET_COORDS'. The standard is to write them in ALL_CAPS with words separated by \_underscores\_.

The most basic action has this form:
```
{
  type: 'GET_COORDS'
}
```
An action can also have other data. The GET_COORDS action has treeData in addition to type:
```
{
  type: 'GET_COORDS',
  treeData:
}
```

### Write the actionCreator.
Now that you know what you want your action to be you can make an actionCreator.

In src/constants/actions/index.js write:
```
export const requestCoords = ({ lat, lng }) => ({
  type: types.GET_COORDS,
  lat: lat,
  lng: lng
})
```

3. Write a function that makes an API call.

In src/actions/index.js write:
```
export function fetchCoords(address){
  return function(dispatch){
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address' + address + '&key=process.env.GOOGLE_MAPS_API').then((response) => response.json(),
    error => console.log('An error occorred', error))
    .then((json) => {
      const newCoords = json.geometry.location;
      dispatch(requestCoords(newCoords));
    });
  };
}
```

4. Dispatch the actionCreator (see the last line in the previous code block).

5. Parse JSON response.

6. Create a reducer.
In src/reducers/getCoords.js write:
```
export default( state = {}, action) => {
  let newCoords;
  let newCoordsStateSlice;
  switch (action.type){
    case types.GET_COORDS:
      newCoords = {
        lat: action.lat,
        lng: action.lng
      }
      newCoordsStateSlice = Object.assign({}, state, newCoords);
      return newCoordsStateSlice;
    default:
      return state;
  }
};
```


