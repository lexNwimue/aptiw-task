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
  console.log("Request received");
  const { name, email, password } = req.body;
  console.log(name, email, password);
  User.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res.json({ failed: "Email already exists" });
        console.log(email + " already exists");
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
  console.log("email: ", email, " password: ", password);
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        console.log(email + " is not a registered email");
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
        // console.log(err.message);
        res.json({ failed: "Unauthorized access..." });
        return;
      } else if (decodedToken) {
        res.json({ success: "Authorized" });
        console.log("Got here??");
        decoded = decodedToken;
        return decoded;
      }
    });

    return decoded;
  } else {
    res.json({ failed: "Unauthorized access..." });
    console.log("Some error");
    return;
  }
};

const verifyBeforeAddingFavourites = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    let decoded = {};
    jwt.verify(token, "my secret code goes here", (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        return { failed: "Unauthorized Access" };
      } else if (decodedToken) {
        decoded = decodedToken;
        // return decoded;
      }
    });

    return decoded;
  } else {
    return { err: "Some error occured" };
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
      // console.log(`Definition ${j + 1}`);
      result[j].definitionNum = `Definition ${1 + j}: `;
      // console.log(response[j].definitions[j].definition);
      result[j].definition = response[j].definitions[j].definition;
      // console.log(response[j].partOfSpeech);
      result[j].partOfSpeech = response[j].partOfSpeech;
      // console.log("Synonyms: ", response[j].definitions[j].synonyms);

      // Check if synonyms array is undefined (on initial interation)
      // if such, then define it as an array
      if (typeof result[j].synonyms === "undefined") result[j].synonyms = [];

      // If there exists a populated array of synonyms push it's value to the result array
      if (response[j].definitions[j].synonyms.length > 0) {
        result[j].synonyms.push(response[j].definitions[j].synonyms);
      }

      result[j].synonyms.push(response[j].definitions[j].synonyms);
      console.log(result);
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
  const verified = verifyBeforeAddingFavourites(req, res);
  if (verified.failed || verified.err) {
    // res.json(verified);
    return;
  }
  const userID = verified.id;

  // Ensure the to-be-added word isn't already in the favourites array
  // for that particular user before adding.
  const userFavourites = await User.find(
    { email: userID },
    { favourites: 1 } //Returns only the favourites field and not the entire user document
  );
  console.log(userFavourites[0].favourites);
  if (userFavourites[0].favourites.indexOf(word) === -1) {
    await User.updateOne({ email: userID }, { $push: { favourites: word } });
    console.log(word, "added");
    res.json({ success: "Added to Favourites successfully" });
    return;
  } else {
    console.log("Word already added to Favourites");
    res.json({ failed: "Word already added to Favourites" });
    return;
  }
};

export { signup_post, login_post, verify_user, oxfordAPI, add_to_favourites };
