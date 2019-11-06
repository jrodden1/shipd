export const fetchPackages = () => {
   return (dispatch) => {
      dispatch({type: "FETCH_PACKAGES"})
      fetch("http://localhost:3001/packages")
         .then(resp => resp.json())
         .then(packagesRaw => dispatch({type: "ADD_PACKAGES", packages: packagesRaw}))
   }
}

export default fetchPackages