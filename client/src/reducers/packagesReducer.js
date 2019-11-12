import reportServiceProviderStats from '../helpers/ReportsHelpers'

//packagesReducer does the "reducing" of the old state with the new update and spits out the new state 
//and updates the redux store
export const packagesReducer = (
   //set initial state for the reducer
   state = {
      packages: [],
      loadingPackages: false,
      creatingPackage: false,
      deletingPackage: false,
      reports: 
         {
            totalPackages: 0,
            ...reportServiceProviderStats([]) //creates a dummy reports object
         }  
   }, action) => {
   
   
   switch (action.type) {
      //Fetch Packages - essentially just a loading status change - updates loadingPackages to true 
      //and triggers the loading screen while the API is fetched for all packages '/packages'
      case 'FETCH_PACKAGES':
         return {
            ...state,
            packages: [...state.packages],
            loadingPackages: true,
            reports: {...state.reports}
         }
      //Add Packages - run as a callback once the app receives the information back from the api
      //actually updates the packages array to what the backend api has. 
      //also switches off loadingPackages & loading screen
      //additionally, the reports object is updated based on the new package info received.
      case 'ADD_PACKAGES':
         return {
            ...state,
            packages: action.packages,
            loadingPackages: false,
            reports: {
               totalPackages: action.packages.length,
               ...reportServiceProviderStats(action.packages)
            }
         }
      //Create Package - essentially just a loading status change - updates creatingPackages to true 
      //and triggers the loading screen while '/packages' on the API is POSTed to and a new package is created. 
      case 'CREATE_PACKAGE':
         return {
            ...state,
            packages: [...state.packages],
            creatingPackage: true,
            reports: {...state.reports}
         }
      //Add Package (singular) - is run as a callback once the app receives the information back from the api
      //actually updates the packages array to include the new package. 
      //also switches off creatingPackage & loading screen
      //additionally, the reports object is updated to include the new package info received.
      case 'ADD_PACKAGE':
            const updatedPackagesArr = [...state.packages, action.package]
            return {
               ...state,
               packages: updatedPackagesArr,
               creatingPackage: false,
               reports: {
                  totalPackages: updatedPackagesArr.length,
                  ...reportServiceProviderStats(updatedPackagesArr)
               }
               //for more reports, I can have different lines in this report object that can call functions that I import from somewhere else (I'll have to pass in action.packages as a arg but then they can spit out other info like "totalUPS(action.packages)")
            }
      //Delete Package - essentially just a loading status change - updates deletingPackages to true 
      //and triggers the loading screen while '/packages/:id' on the API is sent a DELETE request
      //and the package is deleted on the backend. 
      case 'DELETE_PACKAGE':
         return {
            ...state,
            packages: [...state.packages],
            deletingPackage: true,
            reports: {...state.reports}
         }
      //Destory Package - is run as a callback once the app receives confirmation of delete from the api
      //actually updates the packages array to exclude the deleted package. 
      //also switches off deletingPackage & loading screen
      //additionally, the reports object is updated to exclude the deleted package.
      case 'DESTROY_PACKAGE':
            //possibly need to update the Reports based on this new package info right here
            const newPackagesArr = state.packages.filter(pkg => pkg.id !== action.pkgId)
            return {
               ...state,
               packages: newPackagesArr,
               deletingPackage: false,
               reports: {
                  totalPackages: newPackagesArr.length,
                  ...reportServiceProviderStats(newPackagesArr)
               }
               //for more reports, I can have different lines in this report object that can call functions that I import from somewhere else (I'll have to pass in action.packages as a arg but then they can spit out other info like "totalUPS(action.packages)")
            }
      default:
         return state
   }
}

export default packagesReducer
