import { Filter } from 'components';
import React, { useState } from 'react';

import { FilterComponentProps } from '../../../../../src/filter/types';

const FilterMode = (params: any) => {
  const [mode, onModeChange] = useState<FilterComponentProps['mode']>('advanced');

  return (
    <>
      <Filter
        mode={mode}
        onModeChange={onModeChange}
        items={[
          [
            { label: 'Name', field: 'name' },
            {
              label: 'Gender',
              field: 'gender',
              type: 'select',
              props: {
                options: [
                  { label: 'gentleman', value: 0 },
                  { label: 'lady', value: 1 },
                ],
              },
            },
          ],
          [
            { label: 'Born in', field: 'bornIn', type: 'datePicker' },
            {
              label: 'Home',
              field: 'home',
              type: 'searchableSelect',
              props: {
                options: [
                  { label: 'China', value: 'china' },
                  { label: 'USA', value: 'usa' },
                  { label: 'Japan', value: 'japan' },
                  { label: 'England', value: 'england' },
                ],
              },
            },
          ],
        ]}
        onSearch={values => {
          console.log('values', values);
        }}
      />
    </>
  );
};

export default FilterMode;
