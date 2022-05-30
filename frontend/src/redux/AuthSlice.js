import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name:'auth',
    initialState:{
        UserID : Number,
    
    FirstName:String ,
    LastName: String,
  
    UserType: String,
    Email: String,
   
    State:String,
    City:String,
    Country:String,
    Street:String,
    isAuthorized:false
    },
    reducers:{
        authDrawer(state,action){
            state.authorized = !state.isAuthorized
        },
        logoutDrawer(state,action){
            state.isAuthorized = false
        },
        loginDrawer(state,action){
            state.isAuthorized = true
            console.log(action.payload)
            state.UserID = action.payload.user.UserID
            state.FirstName = action.payload.user.FirstName
            state.LastName = action.payload.user.LastName
            state.UserType = action.payload.user.UserType
            state.Email = action.payload.user.Email
            state.State = action.payload.user.State
            state.Street = action.payload.user.Street
            state.City = action.payload.user.City
            state.Country = action.payload.user.Country
            
            console.log(state)
            
        }
    }
    }

)
export const { logoutDrawer, loginDrawer, authDrawer } = authSlice.actions

export const selectUser = (state) => state
export default authSlice.reducer