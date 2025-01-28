import bcryptjs from "bcryptjs";
import {ethers, Wallet} from "ethers";
// import Web3 from "web3";
import UserModel from "../models/user.model.js";
import WalletModel from "../models/wallet.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util.js";
import { encrypt } from "../utils/encrypt.js";
import { registerUserWallet } from "../smart-contract/blockchain.js";

// register
export const registerUser = async ({ firstname, lastname, age, gender, words, digits, petname }) => { 
    try {
      const loginDetail = `${words.trim()}${String(digits).trim().slice(0, 2)}`;  
      // console.log({loginDetail})

    // check if loginDetail already exist
    const foundUser = await UserModel.findOne({loginDetail});
    if (foundUser) return "Please use a better word, digit, or petname";
  
    const salt = await bcryptjs.genSalt(12);
    const passHash = await bcryptjs.hash(`${words.trim()} ${String(digits).trim()} ${petname.trim()}`, salt);
  
        try {
            // create wallet 
            const addresses = Wallet.createRandom();

            const hashedPrivateKey = encrypt(addresses.privateKey);

            // create new Wallet
            const wallet = await WalletModel.create({
              publicKey: addresses.address,
              privateKey: hashedPrivateKey,
              balance: 0,
            })

            // register user onchain
            await registerUserWallet(wallet.publicKey);

            // save user object
            const user = new UserModel({
                firstname,
                lastname,
                age,
                gender,
                loginDetail,
                password: passHash,
                wallet
            });
        
            await user.save();
            return user;
        } catch (error) {
            console.log({error});
            return error.message;
        }
    } catch (error) {
        console.log({error});
        return error.message;
    }
};

// login
export const loginUser = async (password) => {  
  // console.log({password})
  try {
      // split the password into its components (three words, two digits, petname)
      const regex = /^([a-zA-Z\s]+)(\d+)\s(.+)$/;
      const match = password.match(regex);
      // console.log({match})

    if (!match) {
      return "Invalid login format. Ensure the format is [three words][three digits][petname].";
    }

    const [fullMatch, words, digits, petname] = match;
    
    // rebuild the login detail (three words and two digits)
    const loginString = `${words.trim()}${digits.trim()[0]}${digits.trim()[1]}`;
    
    // find the user by login detail and validate petname
    const user = await UserModel.findOne({ loginDetail: loginString });

    if (!user) {
      return "Invalid login details.";
    }

    // compare passwords
    const validatedUser = await bcryptjs.compare(password, user.password);

    if (validatedUser) {
      const accessToken = await generateAccessToken(user._id.toString());
      await generateRefreshToken(user._id.toString());
      // console.log("Auth Service:", {refreshToken})
  
      // needed to get the updated refreshToken from db
      const updatedUser = await UserModel.findOne({ loginDetail: loginString });

      const {
        password,
        refreshTokenExpiresAt,
        createdAt,
        updatedAt,            
        loginDetail,
        __v,
        ...others
      } = updatedUser._doc;

      return {
        others, 
        accessToken, 
      };
    } else return "Invalid user. Please check the details or Register."


  } catch (error) {
    console.error("Error during login:", error);
    return error.message;
  }
  };