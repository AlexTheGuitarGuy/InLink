export const Mock = () => <div>mock</div>

/*import Paginator from './Paginator';

const ReactTestRenderer = require('react-test-renderer');*/

/*describe('Paginator component', () => {
  test('selected page has separate style', () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={5} />,
    ).root;

    expect(() => component.findByProps({ className: 'chosenPage' })).not.toThrow();
  });

  test('portion size is consistent and described in parameters', () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={5} />,
    ).root;

    expect(() => component.findByProps({ portionSize: 10 })).not.toThrow();
  });

  test('selected page is at beginning of portion if it is first', () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={1} />,
    ).root;

    expect(component.children[0].children[0].props.className).toBe('chosenPage');
  });

  test(`selected page doesn't get in the middle until it passes halfway point in portion`, () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={5} />,
    ).root;

    expect(component.children[0].children[6].props.className).toBe('chosenPage');
  });

  test(`selected page is in the middle when it isn't close to the extremes`, () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={7} />,
    ).root;

    expect(component.children[0].children[7].props.className).toBe('chosenPage');
  });

  test('selected page is at the end of portion if it is last', () => {
    const component = ReactTestRenderer.create(
      <Paginator totalElems={100} portionSize={10} pageSize={5} page={20} />,
    ).root;

    expect(component.children[0].children[11].props.className).toBe('chosenPage');
  });
});
*/
