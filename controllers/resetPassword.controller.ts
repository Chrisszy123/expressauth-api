import axios from "axios";
import { Response } from "express";

exports.dashboard = async (req: any, res: Response) => {
  const resetPassword = () => {
    var options = {
      method: "POST",
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/dbconnections/change_password`,
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        email: req.oidc.user.email,
        connection: "Username-Password-Authentication",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  res.render("dashboard", {
    title: "Secured Dashboard",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    resetPassword: resetPassword(),
  });
};
