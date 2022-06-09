import React from 'react';
import Status from './Status';
import { act } from 'react-test-renderer';

const ReactTestRenderer = require('react-test-renderer');

describe('Status component', () => {
  let testStatus = 'hello world';

  const getCurrentStatus = (renderer) => {
    const statusComponent = renderer.root.children[0].children[0];
    switch (statusComponent.type) {
      case 'span':
        return statusComponent.props.children;
      case 'input':
        return statusComponent.props.defaultValue;
      default:
        return null;
    }
  };

  const getDrawnComponent = (renderer) =>
    renderer.root.children[0].children[0];

  const clickSpan = (span) => span.props.onClick();

  const blurInput = (input) => input.props.onBlur();

  test('shows expected status', () => {
    const renderer = ReactTestRenderer.create(
      <Status status={testStatus} />,
    );

    expect(getCurrentStatus(renderer)).toBe(testStatus);
  });

  test('shows status as span', () => {
    const renderer = ReactTestRenderer.create(
      <Status status={testStatus} />,
    );

    expect(() => getDrawnComponent(renderer)).not.toThrow();
  });

  test('shows status as input', () => {
    const renderer = ReactTestRenderer.create(
      <Status status={testStatus} isOwner={true} />,
    );

    act(() => clickSpan(getDrawnComponent(renderer)));

    expect(() => getDrawnComponent(renderer)).not.toThrow();
  });

  test('input contains status', () => {
    const renderer = ReactTestRenderer.create(
      <Status status={testStatus} isOwner={true} />,
    );

    act(() => clickSpan(getDrawnComponent(renderer)));

    expect(getCurrentStatus(renderer)).toBe(testStatus);
  });

  test("doesn't convert status to input if isOwner is false", () => {
    const renderer = ReactTestRenderer.create(
      <Status status={testStatus} isOwner={false} />,
    );

    act(() => clickSpan(getDrawnComponent(renderer)));

    expect(getDrawnComponent(renderer).type).toBe('span');
  });

  test('calls updateStatus function when input is blurred', () => {
    const updateStatus = jest.fn();

    const renderer = ReactTestRenderer.create(
      <Status
        status={testStatus}
        isOwner={true}
        updateStatus={updateStatus}
      />,
    );

    act(() => clickSpan(getDrawnComponent(renderer)));
    act(() => blurInput(getDrawnComponent(renderer)));

    expect(updateStatus.mock.calls.length).toBe(1);
  });
});
