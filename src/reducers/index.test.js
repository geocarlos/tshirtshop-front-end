import types from '../actions/types';
import { product, items } from './index';

describe('test reducers', ()=>{

  it('should return an object', ()=>{
    expect(product({}, {type: types.GET_PRODUCT, payload: {}})).toEqual({
        isPending: false,
        item: {}
    });
  })

  it('Object should contain an array', ()=>{
    expect(items({}, {type: types.GET_PRODUCTS, payload: []})).toEqual({
        isPending: false,
        products: []
    });
  })
})