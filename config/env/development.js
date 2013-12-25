module.exports = {
    db: "mongodb://heroku_app20471632:eoqstrliuslc7fg4qvuocusoti@ds061938.mongolab.com:61938/heroku_app20471632",
    app: {
        name: "Libertyads - Development"
    },
    facebook: {
        clientID: "334470976693893",
        clientSecret: "650cf2cde9b3618792167d19322a4096",
        callbackURL: "http://libertyads.me/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "91489145067-k6pb9prf7u7be7affu31ikuheaqcj77l.apps.googleusercontent.com",
        clientSecret: "V5mw9i6M1SYyefHV3zTQ11Hq",
        callbackURL: "http://libertyads.me/auth/google/callback"
    }
}
