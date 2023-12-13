import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  firstName: string;

  @Column({})
  secondName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @MinLength(10)
  @MaxLength(1024)
  hash: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: 'CLIENT' })
  role: string;

  @Column('text', { unique: true, nullable: true })
  refreshToken!: string;
}
