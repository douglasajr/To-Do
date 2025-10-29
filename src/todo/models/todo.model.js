import {v4 as uuid} from 'uuid'
// import crypto from 'crypto'


export class Todo {
    constructor ( description ){
        this.id = uuid()
        this.description = description
        this.completed = false
        this.createdAt = new Date()
    }

}