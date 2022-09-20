import axios from "axios";


export const userExistGoogle = (user, usersDB) =>{
    if (user && !usersDB?.some((u) => u.email === user.email)) {
        axios
          .post("/users", {
            ...user,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          return
        }
        return
}
