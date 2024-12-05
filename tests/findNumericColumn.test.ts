import {findNumericColumn} from '../src/findNumericColumn';

describe('findNumericColumn', () => {
  const tableData = [
    ['Header1', 'Header2', 'Header3'],
    ['A', '1', '10.5'],
    ['B', '2', '20.6'],
    ['C', '3', '30.7'],
  ];

  it('should extract the first numeric column', () => {
    const numericColumn = findNumericColumn(tableData);
    expect(numericColumn).toEqual([1, 2, 3]);
  });

  it('should throw an error if no numeric column is found', () => {
    const noNumericData = [
      ['Header1', 'Header2'],
      ['A', 'B'],
      ['C', 'D'],
    ];
    expect(() => findNumericColumn(noNumericData)).toThrow(
      'No numeric column found in the table.',
    );
  });
});
