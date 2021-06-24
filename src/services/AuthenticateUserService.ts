import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UserRepositories)

    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect")
    }
    const passwordMacth = await compare(password, user.password);

    if(!passwordMacth) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign(
      {
        email: user.email
      }, "9f536da0c1db545f5d25ee1c543bc752", {
        subject : user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export {AuthenticateUserService}