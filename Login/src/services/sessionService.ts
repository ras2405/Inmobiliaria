import { Session } from "../model/Session";
import { SessionDto } from "../schema/session";

export const createLogin = async (sessionDto: SessionDto) => {
    return await Session.create(sessionDto);
};

export const getSession = async (token: string) => {
    return await Session.findOne({
        where: {
            token: token
        }
    });
};
