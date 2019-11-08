export const fetchPackages = () => {
   return (dispatch) => {
      dispatch({type: "FETCH_PACKAGES"})
      fetch("http://localhost:3001/packages")
         .then(resp => resp.json())
         .then(packagesRaw => dispatch({type: "ADD_PACKAGES", packages: packagesRaw}))
   }
}
export const createPackage = (newPackageObj, history) => {

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
      fetch("http://localhost:3001/packages", postOptionsObj)
         .then(resp => resp.json())
         .then(packageRaw => {
            dispatch({type: "ADD_PACKAGE", package: packageRaw})
            history.push(`/packages/${packageRaw.id}`)
            //update this above if I'd like to go to /packages instead
         })
   }
}

export const deletePackage = pkgId => {

   const deleteOptionsObj = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
   }

   return (dispatch) => {
      dispatch({type: "DELETE_PACKAGE"})
      fetch(`http://localhost:3001/packages/${pkgId}`, deleteOptionsObj)
         .then(resp => resp.json())
         .then(() => dispatch({type: "DESTROY_PACKAGE", pkgId: pkgId}))
   }
}