import { Product, MusicStore} from '../music_storefront';

const store = new MusicStore();

describe("Music Storefront Model", () =>{
    it('Should have a method to show all products', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(store.show).toBeDefined();
  });

  it('Should have a create method', () => {
        expect(store.create).toBeDefined();
  });

  it('Should have a update method', () => {
        expect(store.patch).toBeDefined();
  });

  it('Should have a delete method', () => {
        expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
        id: 1,
        name: 'Purple Electric Guitar',
        description: 'Purple Haze Hendrix replica ',
        price: '$7000.00'
    });
    expect(result).toEqual({
        id: 1,
        name: 'Purple Electric Guitar',
        description: 'Purple Haze Hendrix replica ',
        price: '$7000.00'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        id: 1,
        name: 'Purple Electric Guitar',
        description: 'Purple Haze Hendrix replica ',
        price: '$7000.00'
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        name: 'Purple Electric Guitar',
        description: 'Purple Haze Hendrix replica ',
        price: '$7000.00'
    });
  });

  it('delete method should remove the product', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });

});