/*
state = {
   packages: [{}, {}],
   loadingPackages: false,
   reports: 
      { 
         totalPackages: () => state.packages.length
      },
   ]
}

*/

export const packagesReducer = (
   state = {
      packages: [
         // {
         //    id: 1,
         //    weight: 3,
         //    note: "Package of Cookies"
         // }
      ],
      loadingPackages: false,
      creatingPackage: false,
      reports: 
         {
            totalPackages: 0
         }  
   }, action) => {
   
   switch (action.type) {
      case 'FETCH_PACKAGES':
         return {
            packages: [...state.packages],
            loadingPackages: true,
            creatingPackage: false,
            reports: {...state.reports}
         }
      case 'ADD_PACKAGES':
         //possibly need to update the Reports based on this new package info right here
         return {
            packages: action.packages,
            loadingPackages: false,
            creatingPackage: false,
            reports: {
               totalPackages: action.packages.length
            }
            //for more reports, I can have different lines in this report object that can call functions that I import from somewhere else (I'll have to pass in action.packages as a arg but then they can spit out other info like "totalUPS(action.packages)")
         }
      case 'CREATE_PACKAGE':
         return {
            ...state,
            packages: [...state.packages],
            creatingPackage: true,
            reports: {...state.reports}
         }
      case 'ADD_PACKAGE':
            //possibly need to update the Reports based on this new package info right here
            const updatedPackagesArr = [...state.packages, action.package]
            return {
               packages: updatedPackagesArr,
               loadingPackages: false,
               creatingPackage: false,
               reports: {
                  totalPackages: updatedPackagesArr.length
               }
               //for more reports, I can have different lines in this report object that can call functions that I import from somewhere else (I'll have to pass in action.packages as a arg but then they can spit out other info like "totalUPS(action.packages)")
            }
      default:
         return state
   }

   

}

export default packagesReducer