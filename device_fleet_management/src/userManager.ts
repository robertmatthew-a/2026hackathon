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
      this.users.push(user);
    }

    removeUser(id: string): void {

      let foundUserIndex = 0;
      for(let i = 0; i < this.users.length; i++)
      {
        if(this.users[i].id === id)
        {
          foundUserIndex = i;
          break
        }
      }

      if(this.users.length > 0)
        this.users.splice(foundUserIndex, 1);
    }

    getUser(id: string): User | null {
      for(let i = 0; i < this.users.length; i++)
      {
        if(this.users[i].id === id)
        {
          return this.users[i]
        }
      }
      return null;
    }

    getUsersByEmail(email: string): User[] | null {
      
      let foundUsers: User[] = []

      for(let i = 0; i < this.users.length; i++)
      {
        if(this.users[i].email === email)
        {
          foundUsers.push(this.users[i])
        }
      }

      if(foundUsers.length > 0)
      {
        return foundUsers
      }
      
      return null;
    }

    getUsersByPhone(phone: string): User[] | null {
      let foundUsers: User[] = []

      for(let i = 0; i < this.users.length; i++)
      {
        if(this.users[i].phone === phone)
        {
          foundUsers.push(this.users[i])
        }
      }
      
      if(foundUsers.length > 0)
      {
        return foundUsers
      }
      
      return null;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserCount(): number {
        return this.users.length;
    }
}
