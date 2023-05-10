import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/error-model"
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/crendentials-model";

async function register(user: UserModel): Promise<string> {
    const error = user.validate();
    if (error) throw new ValidationError(error);
    if (await isEmailTaken(user.email)) throw new ValidationError(`Username ${user.email} already taken`);

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password]);
    user.id = info.insertId
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validate();
    if (error) throw new ValidationError(error);
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.email, credentials.password]);
    if (users.length === 0) throw new UnauthorizedError("Incorrect username or password");

    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) FROM users WHERE email = ?`;
    const count = await dal.execute(sql, [email])[0];
    return count > 0;
}

async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const users = await dal.execute(sql, [id]);
    if (users.length === 0) throw new ResourceNotFoundError(id);
    const user = users[0];
    return user;
}

async function updateUser(user: UserModel): Promise<UserModel> {
    const sql = `
        UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?
        WHERE id = ?`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(user.id);
    return user;
}

export default {
    register,
    login,
    getOneUser,
    updateUser
}