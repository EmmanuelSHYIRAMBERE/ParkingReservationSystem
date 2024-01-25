import jwt from "jsonwebtoken";

export const getToken = (data) => {
    
    let token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXP_TIME,
    })

    return token
}