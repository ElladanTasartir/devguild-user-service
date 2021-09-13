import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Comments {
  @Prop()
  user_id: string;

  @Prop()
  avatar_url: string;

  @Prop({ maxlength: 500 })
  comment: string;

  @Prop()
  date: Date;
}

@Schema({ collection: 'usersComments', timestamps: true })
class UsersComments extends Document {
  @Prop()
  project_id: string;

  @Prop([Comments])
  comments: Comments[];
}

export const UsersCommentsSchema = SchemaFactory.createForClass(UsersComments);
