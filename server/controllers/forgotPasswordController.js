const ApiError = require("../errors/ApiErrors");
const smtpTransport = require("nodemailer-smtp-transport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, ResetPasswordTokens } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const sequelize = require("sequelize");
const { Sequelize } = require("../utils/dataBase");
const { group } = require("console");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");


const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

class ForgotPasswordController {
  async getResetPasswordLink(req, res, next) {
    const transporter = nodemailer.createTransport(smtpTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      //service : process.env.SMTP_SERVICE,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    }));

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.send(
        "utilisateur avec cette adresse non trouvé!"
      );
    } else {
      await ResetPasswordTokens.findOne({ where: { userId: user.id } }).then(
        (data) => {
          if (data) {
            ResetPasswordTokens.destroy({ where: { userId: user.id } });
          }
        }
      );

      const token = generateJwt(user.id, user.email);
      await ResetPasswordTokens.create({
        token: token,
        userId: user.id,
      });
      const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "renouvellement de mot de passe sur naturalia ",
        text: "",
        html: `
            <div>
                <h1>pour modifier votre passe passez par ce lien :<h1>
                <a href="${link}">lien</a>
            </div>
        `,
      });
      return res.send(
        "nous avons envoyer un email de réinitialisation de votre mot de passe  !"
      );
    }
  }

  async resetPassword(req, res) {
    const { token, password } = req.body;
    const hashPassword = await bcrypt?.hash(password, 5);

    ResetPasswordTokens.findOne({ where: { token: token } }).then((data) => {
      User.update(
        { password: hashPassword },
        { where: { id: data.dataValues.userId } }
      ).then((data_user) => {
        ResetPasswordTokens.destroy({ where: { token: token } }).then(() => {
          res.send("données concenant le mot de passe ont était mise a jour!");
        });
      });
    });
  }

  async checkToken(req, res) {
    const { token } = req.body;

    let tokenInDatabase = null;
    ResetPasswordTokens.findOne({ where: { token: token } }).then((data) => {
      if (data) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  }
}

module.exports = new ForgotPasswordController();
