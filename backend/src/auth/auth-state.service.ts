import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: number;
  username: string;
  password: string;
  points: number;
}

@Injectable()
export class AuthStateService {
  private usersSubject = new BehaviorSubject<User[]>([
    {
      id: 1,
      username: 'user1',
      password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
      points: 1000,
    },
    {
      id: 2,
      username: 'user2',
      password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
      points: 1000,
    },
    {
      id: 3,
      username: 'user3',
      password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
      points: 1000,
    },
  ]);

  users$ = this.usersSubject.asObservable();

  getUsers(): User[] {
    return this.usersSubject.getValue();
  }

  getUserById(userId: number): User | undefined {
    return this.getUsers().find((user) => user.id === userId);
  }

  getUserByUsername(username: string): User | undefined {
    return this.getUsers().find((user) => user.username === username);
  }

  updateUserPoints(userId: number, pointsUsed: number): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        points: users[userIndex].points - pointsUsed,
      };
      this.usersSubject.next([...users]);
    }
  }
}
