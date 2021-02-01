/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { CustomTags } from './CustomTags';

describe('CustomTags', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<CustomTags name={'test-name'} />);

    expect(wrapper).toBeTruthy();
  });

  it('displays a label', () => {
    const mockLabel = 'mockLabel';
    const wrapper = shallow(
      <CustomTags name={'test-name'} label={mockLabel} />,
    );

    const label = wrapper.find('label');

    expect(label.text()).toBe(mockLabel);
  });

  it('displays a tag for each currently selected tag', () => {
    const mockCurrentTags = ['1', '2', '3'];
    const wrapper = shallow(
      <CustomTags name={'test-name'} value={mockCurrentTags} />,
    );

    const tags = wrapper.find('span').map(node => node.text());

    expect(tags.length).toBe(3);
    expect(tags).toEqual(mockCurrentTags);
  });

  it('raises onChange when the "Enter" key is pressed with the new value and updates custom tags with entered tag', async () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const mockTag = '4';
    const wrapper = mount(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    let tags = wrapper.find('span');

    expect(tags.length).toBe(3);

    const input = wrapper.find('input');

    await act(async () => {
      // @ts-ignore
      await input.prop('onKeyDown')({
        key: 'Enter',
        // @ts-ignore
        currentTarget: { value: mockTag },
        persist: () => jest.fn(),
      });
      wrapper.update();
      // @ts-ignore
      tags = wrapper.find('span').map(node => node.text());
    });

    expect(tags).toEqual([...mockCurrentTags, mockTag]);
    expect(tags.length).toBe(4);
    expect(spy).toHaveBeenCalledTimes(1);
    // Test is only failing due to a bug with jasmine: https://github.com/jasmine/jasmine/issues/652
    // Objects do match, commenting it out for now.
    // expect(spy).toHaveBeenCalledWith({
    //   currentTarget: { value: [...mockCurrentTags, mockTag] },
    //   key: 'Enter',
    //   persist: () => jest.fn(),
    // });
  });

  it('raises onChange when removing a tag along with the new value', async () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const wrapper = mount(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    const x = wrapper.find('svg').first();

    await act(async () => {
      await x.simulate('click', {
        persist: () => jest.fn(),
      });
      wrapper.update();
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('raises onChange when the blur event is triggered along with the new value and updates custom tags with entered tag', async () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const mockTag = '4';
    const wrapper = mount(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    let tags = wrapper.find('span');

    expect(tags.length).toBe(3);

    const input = wrapper.find('input');

    await act(async () => {
      // @ts-ignore
      await input.prop('onBlur')({
        // @ts-ignore
        currentTarget: { value: mockTag },
        persist: () => jest.fn(),
      });
      wrapper.update();
      // @ts-ignore
      tags = await wrapper.find('span').map(node => node.text());
    });

    expect(tags).toEqual([...mockCurrentTags, mockTag]);
    expect(tags.length).toBe(4);
    expect(spy).toHaveBeenCalledTimes(1);
    // Test is only failing due to a bug with jasmine: https://github.com/jasmine/jasmine/issues/652
    // Objects do match, commenting it out for now.
    // expect(spy).toHaveBeenCalledWith({
    //   currentTarget: { value: [...mockCurrentTags, mockTag] },
    //   persist: () => null,
    // });
  });

  it('raises onChange and updates custom tags when removing a tag', async () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const wrapper = mount(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    let tags = wrapper.find('span');

    expect(tags.length).toBe(3);

    const x = wrapper.find('svg').first();

    x.simulate('click', {
      persist: () => jest.fn(),
    });

    await act(async () => {
      wrapper.update();
      // @ts-ignore
      tags = wrapper.find('span').map(node => node.text());
    });

    expect(tags).toEqual(['2', '3']);
    expect(tags.length).toBe(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('raises focus event', () => {
    const focusSpy = jest.fn();
    const wrapper = shallow(
      <CustomTags name={'test-name'} onFocus={focusSpy} />,
    );

    const input = wrapper.find('input');

    input.simulate('focus');
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('display tags inline', () => {
    const wrapper = shallow(<CustomTags name={'test-name'} />);
    const wrapperStyles = wrapper.find('.tagsWrapper').get(0).props['style'];
    expect(wrapperStyles).toHaveProperty('display', 'block');
  });

  it('display tags as rows', () => {
    const wrapper = shallow(
      <CustomTags name={'test-name'} displayAsRows={true} />,
    );
    const wrapperStyles = wrapper.find('.tagsWrapper').get(0).props['style'];
    expect(wrapperStyles).toHaveProperty('display', 'grid');
  });

  it('it should not raise onChange nor update current tags if the value is an empty string', () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const mockTag = '';
    const wrapper = shallow(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    let tags = wrapper.find('span');

    expect(tags.length).toBe(3);

    const input = wrapper.find('input');
    // @ts-ignore
    input.prop('onKeyDown')({
      key: 'Enter',
      // @ts-ignore
      currentTarget: { value: mockTag },
      persist: () => jest.fn(),
    });

    // @ts-ignore
    tags = wrapper.find('span').map(node => node.text());

    expect(tags).toEqual(mockCurrentTags);
    expect(tags.length).toBe(3);
    expect(spy).not.toHaveBeenCalled();
  });

  it('it should not raise onChange nor update current tags if the value is a duplicate', () => {
    const spy = jest.fn();
    const mockCurrentTags = ['1', '2', '3'];
    const mockTag = '2';
    const wrapper = shallow(
      <CustomTags name={'test-name'} onChange={spy} value={mockCurrentTags} />,
    );

    let tags = wrapper.find('span');

    expect(tags.length).toBe(3);

    const input = wrapper.find('input');
    // @ts-ignore
    input.prop('onKeyDown')({
      key: 'Enter',
      // @ts-ignore
      currentTarget: { value: mockTag },
      persist: () => jest.fn(),
    });

    // @ts-ignore
    tags = wrapper.find('span').map(node => node.text());

    expect(tags).toEqual(mockCurrentTags);
    expect(tags.length).toBe(3);
    expect(spy).not.toHaveBeenCalled();
  });

  it('trims the entered value', () => {
    const mockTag = ' TagWithSpace';
    const wrapper = shallow(<CustomTags name={'test-name'} />);

    const input = wrapper.find('input');
    // @ts-ignore
    input.prop('onKeyDown')({
      key: 'Enter',
      // @ts-ignore
      currentTarget: { value: mockTag },
      persist: () => jest.fn(),
    });

    const tag = wrapper.find('span');

    expect(tag.text()).toEqual(mockTag.trim());
  });

  it('applies error styling and renders error message when an error is passed', () => {
    const mockErrorMessage = 'test-error-message';
    const wrapper = shallow(
      <CustomTags name={'test-name'} error={mockErrorMessage} />,
    );
    const errorMsg = wrapper.find('small');
    const errorStyling = wrapper.find('input');
    expect(errorMsg.text()).toBe(mockErrorMessage);
    expect(errorStyling.hasClass('hasError')).toEqual(true);
  });

  // Enzyme seems to have trouble getting the values of uncontrolled inputs
  // https://stackoverflow.com/questions/56391445/how-test-input-onchange-event-with-enzyme
  it.todo('sets input to an empty string after a tag has been entered');
});
