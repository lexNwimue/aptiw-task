import { User } from "./model/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const validate = (name, email, password1, password2) => {
//     if(name.match(/[0-9]/)){ // Check if name contains a number
//         return false;
//     }
//     if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){ // Check for email validity
//         return false;
//     }
//     if(password1 !== password2){
//         return false;
//     }

// }

// Creating cookie data using jwt
// This is made global so it can be accessible to both signup and login modules
const expirationDuration = 7 * 24 * 60 * 60;
const createJWTtoken = (id) => {
  return jwt.sign({ id }, "my secret code goes here", {
    expiresIn: expirationDuration,
  });
};

const signup_post = (req, res) => {
  console.log("Request received");
  const { name, email, password, password2 } = req.body;
  console.log(name, email, password, password2);
  const errors = [];
  User.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        errors.push({ failed: "Email already exists" });
        console.log(email + " already exists");
        res.json(errors);
      } else {
        // Encrypt password before saving to DB

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            const newUser = new User({
              name: name,
              email: email,
              password: hash,
            });

            newUser
              .save()
              .then((user) => {
                console.log(user);
                const token = createJWTtoken(user.email);
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: expirationDuration * 1000,
                });
                res.json({ success: user });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  User.findOne({ email }).then(async (user) => {
    if (!user) {
      console.log(email + " is not a registered email");
      errors.push({ failed: "Incorrect email or password" });
      res.json(errors);
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = createJWTtoken(user.email);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: expirationDuration * 1000,
      });
      res.json({ loginSuccess: user });
    } else {
      errors.push({ failed: "Incorrect email or password" });
      res.json(errors);
    }
  });
};

export { signup_post, login_post };