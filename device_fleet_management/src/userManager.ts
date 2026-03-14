export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export class UserManager {

    private users: User[] = [];

    addUser(user: User): void {
        
        if (this.isDuplicateId(user.id)) {
            throw new Error('User with id ' + user.id + ' already exists');
        }

        if (user.id == null || user.id === '') {
          throw new Error('User must have an id');
        }
        else {     
            this.users.push(user);
        }
    }

    removeUser(id: string): void {

        let foundUserIndex = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                foundUserIndex = i;
                break
            }
            
        }

        if(foundUserIndex == -1){
            throw new Error('User with id ' + id + ' not found');
        }
        else {
             if (this.users.length > 0)
                this.users.splice(foundUserIndex, 1);
        }

       
    }

    getUser(id: string): User | null {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                return this.users[i]
            }
        }
        return null;
    }

    getUsersByEmail(email: string): User[] | null {

        let foundUsers: User[] = []

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                foundUsers.push(this.users[i])
            }
        }

        return foundUsers;
    }

    getUsersByPhone(phone: string): User[] | null {
        let foundUsers: User[] = []

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].phone === phone) {
                foundUsers.push(this.users[i])
            }
        }

        return foundUsers;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserCount(): number {
        return this.users.length;
    }

    isDuplicateId(id: string): boolean {

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                return true;
            }
        }
        return false;

    }
}
