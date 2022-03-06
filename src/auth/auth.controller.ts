import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { User } from 'src/users';

import { LocalAuthGuard } from './guards';
import { JwtPayload } from './interfaces';
import { AuthService } from './auth.service';

interface RequestWithUser extends ExpressRequest {
    user: User;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: RequestWithUser): JwtPayload {
        return this.authService.signUserToken(req.user);
    }

    @Post('register')
    register(@Request() req: ExpressRequest): Promise<JwtPayload> {
        return this.authService.registerUser(req.body);
    }
}
