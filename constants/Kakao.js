//const passport = require('passport');
//const KakaoStrategy = require('passport-kakao').Strategy;

export default {
  restAppKey:'f0ed042be2ef7b6e9c4a85fbd9e08bdb',
  hello: function(){
    /*
    passport.use(new KakaoStrategy({
        clientID : this.restAppKey,
        clientSecret: '', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL : 'http://localhost:3000'
      },
      (accessToken, refreshToken, profile, done) => {
        console.info(profile);
      }
    ));

     */
    return this.restAppKey;
  }
};
