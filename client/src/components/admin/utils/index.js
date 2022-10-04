import axios from "axios"

export const axiosRole = (userSelected, setUserSelected) => {
      const newUser = userSelected
      if(userSelected?.role === "Admin") {
          newUser.role = "User"
          setUserSelected({...userSelected, role: "User"})
      }
      else if(userSelected?.role === "User") {
          newUser.role = "Admin"
          setUserSelected({...userSelected, role: "Admin"})
      }
      axios.put(`/users/set/role`,{
          ...newUser
        })
}

export const axiosIsBanned = (userSelected, setUserSelected, reasonBan) =>{
    const newUser = userSelected
    if(userSelected?.isBanned) {
        newUser.isBanned = false
        setUserSelected({...userSelected, isBanned: false})
        axios.put(`/users/set/update-ban`,{
            ...newUser,
            reasonBan: ""
          })
    }
    else if(!userSelected?.isBanned) {
        newUser.isBanned = true
        setUserSelected({...userSelected, isBanned: true})
        axios.put(`/users/set/update-ban`,{
            ...newUser,
            reasonBan
          })
    }
}

export const axiosPremium = (userSelected, setUserSelected) =>{
    const newUser = userSelected
    if(userSelected?.plan === "Premium") {
        newUser.plan = "Regular"
        setUserSelected({...userSelected, plan: "Regular"})
    }
    else if(userSelected?.plan === "Regular") {
        newUser.plan = "Premium"
        setUserSelected({...userSelected, plan: "Premium"})
    }
    console.log(userSelected, newUser)
    axios.put(`/users/set/plan`,{
        ...newUser
      })
}