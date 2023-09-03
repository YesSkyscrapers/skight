import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class GameServerParams {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    allowedPortsFrom: number

    @Column()
    allowedPortsTo: number

    @Column({
        nullable: true
    })
    lastRunPort: number
}
