import {Injectable} from "@nestjs/common";
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {IdeaEntity} from "../idea/idea.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(type => IdeaEntity, idea => idea.author)
    ideas: IdeaEntity[]

    public get token() {
        const {id, username} = this;
        return jwt.sign(
            {id, username},
            process.env.SECRET,
            { expiresIn: '7d'}
        )

    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public comparePassword(attempt: string) {
        return bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken: boolean = true) {
        const {id, created, username, token} = this;
        const responseObject  =  {id, created, username};
        if (showToken) {
            responseObject['token'] = token;
        }

        return responseObject;

    }
}
