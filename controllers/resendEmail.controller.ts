import axios from "axios";
import { Request, Response } from "express";
import { getAccessToken } from "../utils/getAccessToken";

exports.resendEmail = async (req: any, res: Response) => {
  async function handleVerifyEmail() {
    const access_token = await getAccessToken();
    const auth0VerifyEmail = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/jobs/verification-email`;
    const body2 = {
      user_id: req.oidc.user.sub,
    };

    const res2 = await axios
      .post(auth0VerifyEmail, body2, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        //
      })
      .catch((err) => {
        console.error("second error" + err);
        return;
      });
  }

  res.render("verify", {
    title: "Verify Email",
    isAuthenticated: req.oidc.isAuthenticated(),
    verifyEmail: handleVerifyEmail(),
    user: req.oidc.user,
  });
};
