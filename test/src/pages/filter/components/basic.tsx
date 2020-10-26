import { Filter } from 'components';
import React from 'react';

const Basic = () => {
  return (
    <>
      <Filter
        items={[[{ type: 'input', placeholder: 'name', field: 'name' }]]}
        onSearch={values => {
          console.log('values', values);
        }}
      />
    </>
  );
};

export default Basic;
