// This file contains actions relating to Packages.  Note that `thunk` is being used
const baseUrl = "http://localhost:3001"  //this is the current URL of the Rails backend

// This action does fetching of all packages from the backend api
export const fetchPackages = () => {
   return (dispatch) => {
      dispatch({type: "FETCH_PACKAGES"})
      fetch(baseUrl + "/packages")
         .then(resp => resp.json())
         .then(packagesRaw => dispatch({type: "ADD_PACKAGES", packages: packagesRaw}))
   }
}

// Performs the creation of a new package, also forwards the user's browser url to the show page of the new package
export const createPackage = (newPackageObj, history) => {

   // Create a dataObject that will meet Rails strong params
   const dataObject = {
      package: {
         ...newPackageObj
      }
   }

   const postOptionsObj = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(dataObject)
}

   return (dispatch) => {
      dispatch({type: "CREATE_PACKAGE"})
      fetch(baseUrl + "/packages", postOptionsObj)
         .then(resp => resp.json())
         .then(packageRaw => {
            dispatch({type: "ADD_PACKAGE", package: packageRaw})
            history.push(`/packages/${packageRaw.id}`)
            //update this above if I'd like to go to /packages instead
         })
   }
}

export const deletePackage = (pkgId, history) => {
   
   const deleteOptionsObj = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
   }

   return (dispatch) => {
      dispatch({type: "DELETE_PACKAGE"})
      fetch(baseUrl + `/packages/${pkgId}`, deleteOptionsObj)
         .then(resp => resp.json())
         .then(() => {
            dispatch({type: "DESTROY_PACKAGE", pkgId: pkgId})
            history.push('/packages')
         })
   }
}
