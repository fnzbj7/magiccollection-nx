import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook-token') {
    constructor() {
        super({
            clientID: 2495571677216519, //process.env.APP_ID,
            clientSecret: '7b1a32bb6ee396961a2e20fb99b00e8d', //process.env.APP_SECRET,
            callbackURL: '/api/auth/facebook/redirect',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        console.log('SZIA');
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const payload = {
            user,
            accessToken,
        };
        done(null, payload);
    }
}

// import { Injectable } from '@nestjs/common';
// import { use } from 'passport';
// import FacebookTokenStrategy = require('passport-facebook-token');
// import { UserRepository } from './user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as config from 'config';

// // @Injectable()
// export class FacebookStrategy {
//     constructor(
//         @InjectRepository(UserRepository)
//         private userRepository: UserRepository,
//     ) {
//         this.init();
//     }

//     init() {
//         // Need to spearate options from the FacebookTokenStrategy construct,
//         // because it's not accepts fbGraphVersion property, but we need to set it to the newest
//         const fbConfig: any = config.get('facebook');
//         const options: FacebookTokenStrategy.StrategyOptions = {
//             clientID: fbConfig.appId,
//             clientSecret: process.env.FB_APP_SECRET,
//             fbGraphVersion: 'v5.0',
//         };
//         use(
//             new FacebookTokenStrategy(
//                 options,
//                 async (
//                     accessToken: string,
//                     refreshToken: string,
//                     profile: FacebookTokenStrategy.Profile,
//                     done: any,
//                 ) => {
//                     try {
//                         const user = await this.userRepository.findOrCreate(profile);
//                         return done(null, user);
//                     } catch (err) {
//                         return done(err, null);
//                     }
//                 },
//             ),
//         );
//     }
// }
