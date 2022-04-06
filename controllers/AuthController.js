const User = require("../models/User");

const bcrypt = require("bcrypt");

module.exports = class AuthController {
  static registerUser(req, res) {
    res.render("auth/register");
  }

  static async registerUserPost(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // check if req
    if (!name || !email || !password) {
      req.flash("message", "Por favor entre com todos os dados preenchidos");
      res.render("auth/register");
      return;
    }

    // regex for email validation
    let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (!regexEmail.test(email)) {
      req.flash("message", "O email está em formato invalido");
      res.render("auth/register");
      return;
    }

    // hashedPassword
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User(name, email, hashedPassword);

    // check if user exists
    const checkIfUserExists = await user.getUserId(user.email);

    if (checkIfUserExists) {
      req.flash("message", "O email já está em uso. Por favor, insira outro");
      res.render("auth/register");
      return;
    }

    try {
      user.save();

      // create session
      const sessionId = await user.getUserId(user.email);

      req.session.userid = sessionId;

      req.flash("message", "Usuario cadastrado com sucesso!");

      console.log(req.session.userid);

      try {
        req.session.save(() => {
          res.redirect("/auth/login");
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      req.flash("message", "Erro ao cadastrar usuario!");
      return;
    }
  }

  static loginUser(req, res) {
    res.render("auth/login");
  }

  static async loginUserPost(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      req.flash("message", "Por favor entre com todos os dados preenchidos");
      res.render("auth/login");
      return;
    }

    // regex for email validation
    let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (!regexEmail.test(email)) {
      req.flash("message", "O email está em formato invalido");
      res.render("auth/login");
      return;
    }

    // create a new user with the requisition
    const user = new User("", email, password);

    // check if user exists
    const checkIfUserExists = await user.getUserId(user.email);

    if (!checkIfUserExists) {
      req.flash("message", "Usuario não encontrado");
      res.render("auth/login");
      return;
    }

    // get crypted password from sql
    const passwordCrypted = await user.getUserPassword(user.email);

    // compare password
    const passwordMatch = bcrypt.compareSync(password, passwordCrypted);

    if (!passwordMatch) {
      req.flash("message", "Senha invalida");
      res.render("auth/login");
      return;
    }

    // auth user
    const sessionId = await user.getUserId(user.email);

    req.session.userid = sessionId;

    console.log(req.session.userid);
    
    req.flash("message", "Usuario logado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static async logout(req, res) {
    req.session.destroy()
    res.redirect('/auth/login')
  }
};
