import axios from "axios";
import { BASE_URL } from "../config";

const BaseUrlGql = `${BASE_URL}/graphql`;


export const handleQuery = (qry, token = "", timer = true) => {
  // console.log("token>>", token);
  return new Promise((resolve, reject) => {
    axios.post(BaseUrlGql, { query: `${qry}` },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("res,<<", res);
        return resolve(res.data);
      }).catch((error) => {
      console.log("", error.response);
      let error_msg = {
        msg: "Network Error! Please try again",
        code: 500,
      };
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data[0] &&
        error.response.data.data[0].messages &&
        error.response.data.data[0].messages[0]
      ) {
        error_msg = {
          msg: error.response.data.data[0].messages[0].message,
          code: error.response.status,
        };
      }
      return reject(error_msg);
    });
    if (timer) {
      setTimeout(() => {
        return reject({
          msg: "Network Error! Please try again",
          code: 500,
        });
      }, 2000);
    }
  });
};





export const handleQueryNoToken = (fd, timer = false) => {
  return new Promise((resolve, reject) => {
    axios.post(
            BaseUrlGql,
            {
              query: `${fd}`,
            }
        )
        .then((res) => {
          // console.log("res,<<", res);
          return resolve(res.data);
        })
        .catch((error) => {
          // console.log("error>>", error.response);
          let error_msg = {
            msg: "Network Error! Please try again",
            code: 500,
            FromServer: error.Error
          };
          if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.data &&
              error.response.data.data[0] &&
              error.response.data.data[0].messages &&
              error.response.data.data[0].messages[0]
          ) {
            error_msg = {
              msg: error.response.data.data[0].messages[0].message,
              code: error.response.status,
            };
          }
          return reject(error_msg);
        });
    if (timer) {
      setTimeout(() => {
        return reject({
          msg: "Network Error! Please try again",
          code: 500,
        });
      }, 5000);
    }
  });
};





// export const postPublic = (url, qry) => {
//   return new Promise((resolve, reject) => {
//     axios.post(`${BASE_URL}${url}`, qry).then(res => {
//       return resolve(res.data);
//     }).catch(error => {
//       let error_msg = {
//         msg: "Network Error! Please try again!",
//         code: 500,
//       };
//       if (error && error.response && error.response.data &&
//         error.response.data.data && error.response.data.data[0]
//         && error.response.data.data[0].messages
//         && error.response.data.data[0].messages[0]
//       ) {
//         error_msg = {
//           msg: error.response.data.data[0].messages[0].message,
//           code: error.response.status,
//         };
//       }
//       return reject(error_msg);
//     });
//     setTimeout(() => {
//       return reject({
//           msg: "Network Error! Please try again!",
//           code: 500,
//         },
//       );
//     }, 50000);
//   });
// };


// export const GET_ALL_PROGRAMS = gql`
//     {
//         programs{
//     name
//     no_of_beneficiaries
//     age_range
//     status
//     sector_id
//     start_date
//     end_date
//   }
//     }
// `;
