import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class EntityBase extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn() 
    deletedAt: Date;
}