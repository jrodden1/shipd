export const packageReducer = (
   state = {

   }, action) => {
   switch (action.type) {
      case 'ADD_PACKAGE':
         return "Test"
      default:
         return state
   }
}

export default packageReducer