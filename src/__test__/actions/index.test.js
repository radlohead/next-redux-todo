import * as Types from '../../actions';

it('changeText test', () => {
    const mockText = 'change text';
    const mockData = {
        type: Types.CHANGE_TEXT,
        changeText: mockText
    };
    expect(Types.changeText(mockText)).toEqual(mockData);
});