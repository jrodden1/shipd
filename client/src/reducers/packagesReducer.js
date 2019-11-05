/*
state = {
   packages: [{}, {}],
   loadingPackages: false,
   reports: [
      { 
         kind: "BasicReport",
         dataCaption: "Total Number of Packages",
         dataValue: 0
      },
   ]
}

*/

export const packagesReducer = (
   state = {
      packages: [
         {
            id: 1,
            weight: 3,
            note: "Package of Cookies"
         }
      ],
      loadingPackages: false,
      reports: [
         { 
            kind: "BasicReport",
            dataCaption: "Total Number of Packages",
            dataValue: 0
         }
      ]
   }, action) => {
   switch (action.type) {
      case 'GET_PACKAGES':
         return "FETCH Packages"
      case 'ADD_PACKAGE':
         return "Test"
      default:
         return state
   }
}

export default packagesReducer