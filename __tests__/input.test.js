import React from 'react';
import renderer from 'react-test-renderer';
import SearchableInput from '../src/SearchableInput';

test('Click out side of a component', () => {
  const component = renderer.create(
    <SearchableInput
      collection={[{id: 1, label: 'test1'}, {id: 2, label: 'test2'}]}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});