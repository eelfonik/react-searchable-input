import React from 'react';
import renderer from 'react-test-renderer';
import ClickOutside from '../ClickOutside';

test('Click out side of a component', () => {
  const component = renderer.create(
    <ClickOutside>
      <div>child</div>
    </ClickOutside>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});