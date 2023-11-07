import axios from "axios";
import { Response } from "express";
import { getAccessToken } from "../utils/getAccessToken";

exports.usersDashboard = async (req: any, res: Response) => {
  const getUsers = async () => {
    const access_token = await getAccessToken();
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`;
    const users = await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    return users;
  };
  const userDetails = await getUsers();
  //
  const currentTime: any = new Date();
  // Calculate a time 24 hours ago from the current time
  const twentyFourHoursAgo = new Date(currentTime - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);
  // filter for users who logged in within the last 24hours
  const activeUsersToday = userDetails.filter((item: any) => {
    const lastLoginTime = new Date(item.last_login);
    return lastLoginTime >= twentyFourHoursAgo && lastLoginTime <= currentTime;
  });
  // filter for active users seven days ago
  const activeUsersSevenDaysAgo = userDetails.filter((item: any) => {
    const lastLoginTime = new Date(item.last_login);
    return lastLoginTime >= sevenDaysAgo && lastLoginTime <= currentTime;
  });
  
  res.render("admin", {
    title: "Admin Dashboard",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    users: userDetails,
    activeUsersToday: activeUsersToday.length,
    activeUsersSevenDays: activeUsersSevenDaysAgo.length,
  });
};

exports.dashboard = async (req: any, res: Response) => {
  const editName = async () => {
    const access_token = await getAccessToken();
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.oidc.user.sub}`;
    const name = req.query.name;
    const body2 = {
      name,
    };
    await axios
      .patch(url, body2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        //
      })
      .catch((err) => {
        //console.error(err);
        return;
      });
  };
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
        //console.log(response.data);
      })
      .catch(function (error) {
        //console.error(error);
      });
  };

  res.render("dashboard", {
    title: "Secured Dashboard",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    resetPassword: resetPassword(),
    handleEditName: editName(),
  });
};
