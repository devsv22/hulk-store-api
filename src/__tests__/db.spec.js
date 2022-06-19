import { MemoryDb } from '@/config/db';

describe(MemoryDb, () => {
  it('should add a value and get it sucesfully', () => {
    MemoryDb.add('foo', 'bar');
    const result = MemoryDb.get('foo');

    expect(result).toEqual('bar');
  });

  it('should remove a value and get a null sucesfully', () => {
    MemoryDb.add('foo', 'bar');

    let result = MemoryDb.get('foo');

    expect(result).toEqual('bar');

    MemoryDb.remove('foo');

    result = MemoryDb.get('foo');

    expect(result).toBeNull();
  });

  it('should clean db', () => {
    MemoryDb.add('foo1', 'bar');
    MemoryDb.add('foo2', 'bar');
    MemoryDb.add('foo3', 'bar');

    let keys = MemoryDb.keys();

    expect(keys.length).toEqual(3);

    MemoryDb.clear();

    keys = MemoryDb.keys();

    expect(keys.length).toEqual(0);
  });

  it('should find value by coincidence', () => {
    MemoryDb.add('foo', [
      {
        id: 1,
        name: 'Foo',
      },
      {
        id: 2,
        name: 'Bar',
      },
    ]);

    const value = MemoryDb.findOne('foo', 1);

    expect(value).not.toBeNull();
    expect(value.name).toEqual('Foo');
  });
});
