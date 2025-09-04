import { Role } from '@app/contracts/shared/role-decorator/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
