import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrivilegeRepository } from './repository/privilege.repository';
import { MailService } from '../shared/mail.service';

@Module({
    controllers: [AuthController],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UserRepository, PrivilegeRepository]),
        JwtModule.register({
            secret: process.env.JWT_KEY_MAGIC || 'topSecret51',
            signOptions: {
                expiresIn: 604800,
            },
        }),
    ],
    providers: [UserRepository, MailService, AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
