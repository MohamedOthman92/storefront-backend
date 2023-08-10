import { Order, ProductOrder, OrderStore} from '../order';

const order = new OrderStore();

describe("Order Model", () =>{
    it('Should have a method to show all orders', () => {
        expect(order.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(order.show).toBeDefined();
  });

  it('Should have a create method', () => {
        expect(order.create).toBeDefined();
  });

  it('Should have a delete method', () => {
        expect(order.delete).toBeDefined();
  });

  it('create method should add a order', async () => {
    const result = await order.create({
         id: 1,
    user_id: 1,
    total: '$7,000',
    complete: true,
    });
    expect(result).toEqual({
         id: 1,
    user_id: 1,
    total: '$7,000',
    complete: true,
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await order.index();
    expect(result).toEqual([{
        id: 1,
    user_id: 1,
    total: '$7,000',
    complete: true,
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await order.show(1);
    expect(result).toEqual({
        id: 1,
    user_id: 1,
    total: '$7,000',
    complete: true,
    });
  });

  it('delete method should remove the order', async () => {
    order.delete(1);
    const result = await order.index()

    expect(result).toEqual([]);
  });

});