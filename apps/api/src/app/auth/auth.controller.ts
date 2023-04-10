import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
    Req,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entity/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    private logger: Logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(
        @Body(new ValidationPipe({ groups: ['signup'] }))
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(
        @Body(new ValidationPipe({ groups: ['signin'] }))
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Get('facebook')
    async getTokenAfterFacebookSignIn(@GetUser() user: User) {
        this.logger.log('Itt járt 1');
        return this.authService.singInWithUser(user);
    }

    @Get('/facebook/redirect')
    @UseGuards(AuthGuard('facebook-token'))
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
        this.logger.log('Itt járt 2');
        return {
            statusCode: HttpStatus.OK,
            data: req.user,
        };
    }

    @Get('/refreshtoken')
    @UseGuards(AuthGuard())
    async refreshToken(@GetUser() user: User) {
        return this.authService.singInWithUser(user);
    }
}
