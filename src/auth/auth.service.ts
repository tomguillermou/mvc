import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { User, UserCredentials } from 'src/users';

import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    public async loginUser({ email, password }: UserCredentials): Promise<User | null> {
        const user = await this.usersService.getByEmail(email);

        if (user && compareSync(user.password, password)) {
            return user;
        }
        return null;
    }

    public async registerUser(credentials: UserCredentials): Promise<JwtPayload> {
        const user = await this.usersService.createOne(credentials);
        return this.signUserToken(user);
    }

    public signUserToken(user: User): JwtPayload {
        return { jwt: this.jwtService.sign(user.email) };
    }
}
