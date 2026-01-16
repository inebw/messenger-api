const { prisma } = require("../lib/prisma");

const JwtStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(jwt_payload.id),
          },
        });
        if (!user) return done(null, false);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }),
  );
};
