import React from 'react';

const FormWrapper = ({ twoColumn, singleColumn, threeColumn, children, className }) => {
  return (
    <div className={`grid ${twoColumn ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 ${!singleColumn && 'md:grid-cols-2'} ${threeColumn && 'md:grid-cols-3'} ${className}`}>
      {children}
    </div>
  );
};

export default FormWrapper;
