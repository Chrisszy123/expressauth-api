import axios from "axios";

export const getAccessToken = async () => {
  // // GET A TOKEN
  var options = {
    method: "POST",
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: `${process.env.AUTH0_CLIENT_ID}`,
      client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
      audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    }),
  };

  const access_token = await axios
    .request(options)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.error(error);
    });
    
  return access_token;
};
