import { User, UserStore} from '../user';

const user = new UserStore();

describe("Users Model", () =>{
    it('Should have a method to show all users', () => {
        expect(user.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(user.show).toBeDefined();
  });

  it('Should have a create method', () => {
        expect(user.create).toBeDefined();
  });

  it('Should have a delete method', () => {
        expect(user.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await user.create({
        id: 1,
        name: 'Test User',
        password: 'test123',
        address: 'Jump Street',
        phone: '010000000'
    });
    expect(result).toEqual({
        id: 1,
        name: 'Test User',
        password: 'test123',
        address: 'Jump Street',
        phone: '010000000'
    });
  });

  it('index method should return a list of Users', async () => {
    const result = await user.index();
    expect(result).toEqual([{
        id: 1,
        name: 'Test User',
        password: 'test123',
        address: 'Jump Street',
        phone: '010000000'
    }]);
  });

  it('show method should return the correct User', async () => {
    const result = await user.show("1");
    expect(result).toEqual({
        id: 1,
        name: 'Test User',
        password: 'test123',
        address: 'Jump Street',
        phone: '010000000'
    });
  });

  it('delete method should remove the user', async () => {
    user.delete("1");
    const result = await user.index()

    expect(result).toEqual([]);
  });

});