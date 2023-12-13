import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Min, Max } from 'class-validator';

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
  @Min(10)
  @Max(1024)
  hash: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('text', { unique: true, nullable: true })
  refreshToken!: string;
}
