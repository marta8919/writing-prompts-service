import { AfterInsert, AfterRemove, AfterUpdate ,Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    // @Exclude()
    password: string;

    @AfterInsert()
    logInsert(){
        console.log('Inserted User with id', this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated user with id ', this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('Removing user with id ', this.id)
    }
    
}