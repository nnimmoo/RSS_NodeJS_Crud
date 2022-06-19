interface UsersStore<T> {
  getUsers(): Promise<T[]>;
  getUser(id: string): Promise<T>;
  createUser(newUser: string): Promise<T | null>;
  update(id: string, body: string): Promise<T | null>;
  delete(id: string): Promise<number>;
}

export { UsersStore };
