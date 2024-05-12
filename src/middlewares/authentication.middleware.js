import jwt from 'jsonwebtoken'

export function authenticationMiddleware(req, res, next) {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ message: 'Invalid token.' })
    }
    const [, token] = authorization.split(' ')
    if (!token) {
        return res.status(401).json({ message: 'Invalid token.' })
    }

    try {
        jwt.verify(token, 'kevin')

        const decoded = jwt.decode(token)

        /*
        {
            userId: 1,
            name: 'Felipe Lima',
            email: 'felipe.lima@alpar.com.br',
            admin: true,
            iat: 1715003384,
            exp: 1715010584
        }
        */
        req.user = decoded;

        next()
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token.' })
    }

}