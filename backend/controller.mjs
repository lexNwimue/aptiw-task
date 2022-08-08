import { User } from "./model/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import http from "https";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Creating cookie data using jwt
// This is made global so it can be accessible to both signup and login modules
const expirationDuration = 7 * 24 * 60 * 60;
const createJWTtoken = (id) => {
  return jwt.sign({ id }, "my secret code goes here", {
    expiresIn: expirationDuration,
  });
};

const signup_post = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res.json({ failed: "Email already exists" });
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
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        res.json({ failed: "Incorrect email or password" });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = createJWTtoken(user.email);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: expirationDuration * 1000,
        });
        res.json({ success: user });
        return;
      } else {
        res.json({ failed: "Incorrect email or password" });
      }
    })
    .catch((err) => res.json({ err: err }));
};

const verify_user = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    let decoded = {};
    jwt.verify(token, "my secret code goes here", (err, decodedToken) => {
      if (err) {
        res.json({ failed: "Some error occured..." });
        return { failed: "Some error occured..." };
      } else if (decodedToken) {
        res.json({ success: "Authorized" });
        decoded = decodedToken;
        return decoded;
      }
    });

    return decoded;
  } else {
    res.json({ failed: "Unauthorized access..." });
    return { failed: "Unauthorized access..." };
  }
};

const verifyUserIdentity = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    let decoded = {};
    jwt.verify(token, "my secret code goes here", (err, decodedToken) => {
      if (err) {
        return { failed: "Unauthorized Access" };
      } else if (decodedToken) {
        decoded = decodedToken;
        // return decoded;
      }
    });

    return decoded;
  } else {
    return { unauthorized: "You are not authorized to view this resource" };
  }
};

const oxfordAPI = async (req, res) => {
  const searchText = req.body.searchText;
  let result = [];
  let response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`
  );
  if (response.ok) {
    response = await response.json();
    response = response[0].meanings;
    // res.json(response);

    for (
      let j = 0;
      j < response.length && j < response[j].definitions.length;
      j++
    ) {
      result[j] = {};
      result[j].definitionNum = `Definition ${1 + j}: `;
      result[j].definition = response[j].definitions[j].definition;
      result[j].partOfSpeech = response[j].partOfSpeech;

      // Check if synonyms array is undefined (on initial interation)
      // if such, then define it as an array
      if (typeof result[j].synonyms === "undefined") result[j].synonyms = [];

      // If there exists a populated array of synonyms push it's value to the result array
      if (response[j].definitions[j].synonyms.length > 0) {
        result[j].synonyms.push(response[j].definitions[j].synonyms);
      }

      result[j].synonyms.push(response[j].definitions[j].synonyms);
      if (j === response.length - 1) {
        res.json(result); // Only return response after last iteration
        return;
      }
    }
  } else {
    res.json({ empty: "No results" });
  }
};

const add_to_favourites = async (req, res) => {
  const word = req.body.text;
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.err) {
    res.json(verified);
    return;
  }
  const userID = verified.id;

  // Ensure the to-be-added word isn't already in the favourites array
  // for that particular user before adding.
  const userFavourites = await User.find(
    { email: userID },
    { favourites: 1 } //Returns only the favourites field and not the entire user document
  );
  if (userFavourites[0].favourites.indexOf(word) === -1) {
    await User.updateOne({ email: userID }, { $push: { favourites: word } });
    res.json({ success: "Added to Favourites successfully" });
    return;
  } else {
    res.json({ failed: "Word already added to Favourites" });
    return;
  }
};

const viewFavourites = async (req, res) => {
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.unauthorized) {
    res.json(verified);
    return;
  }
  const userID = verified.id;

  // Ensure the to-be-added word isn't already in the favourites array
  // for that particular user before adding.
  let userFavourites = await User.find(
    { email: userID },
    { favourites: 1 } //Returns only the favourites field and not the entire user document
  );

  userFavourites = userFavourites[0].favourites;
  res.json(userFavourites);
  return;
};

const deleteFavourite = async (req, res) => {
  const word = req.body.word;
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.err) {
    return { failed: verified };
  }
  const userID = verified.id;
  await User.updateOne({ email: userID }, { $pull: { favourites: word } }); // Remove word from array
  let userFavourites = await User.find(
    { email: userID },
    { favourites: 1 } //Returns only the favourites field and not the entire user document
  );

  userFavourites = userFavourites[0].favourites;
  console.log(userFavourites);

  res.json(userFavourites);
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ success: "Logout successfull" });
};

export {
  signup_post,
  login_post,
  verify_user,
  oxfordAPI,
  add_to_favourites,
  viewFavourites,
  deleteFavourite,
  logout,
};
