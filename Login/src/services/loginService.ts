import { Session } from "../model/Session";
import { LoginDto } from "../schema/login";

export const createLogin = async (loginDto: LoginDto) => {
    return await Session.create(loginDto);
};
