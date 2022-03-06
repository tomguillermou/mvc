import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
