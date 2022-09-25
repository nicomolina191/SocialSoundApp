import axios from "axios";


export const userExistGoogle = (user, usersDB) =>{
    if (user && !usersDB?.some((u) => u.email === user.email)) {
          return  axios
          .post("/users", {
            ...user,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        return "Ya existe una cuenta con este email"
}

export const userExistSignUp = (user, usersDB) =>{
  if (user && !usersDB?.some((u) => u.email === user.email)) {
    return  axios
    .post("/users", {
      ...user,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      return "Ya existe una cuenta con este email"
    });
  }
  return "No se mando"
}
