export const addToWishlist = (movie) => {
  return {
    type: "ADD_TO_WISHLIST",
    payload: movie
  }
}

export const removeFromWishlist = (movieId) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: movieId
  }
}

// ... keep your existing actions ...

export const changeLanguage = (payload)=>{
    return {
        type:"CHANGE_LANGUAGE",
        payload
    }
}

export const changeTheme = (payload)=>{
    return {
        type:"CHANGE_THEME",
        payload
    }
}

export const add_to_wishlist = (payload)=>{
    return {
        type:"ADD_TO_WISHLIST",
        payload
    }
}