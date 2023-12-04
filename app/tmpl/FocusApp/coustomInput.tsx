import React from 'react';

function CustomInput({ ...props }) {
  return (
    <>
      <input
        {...props}
        ref={props.inputRef}
        style={{
          border: 'none',
          background: 'lightpink',
          padding: '.25em',
          borderBottom: '.1em solid black',
        }}
      />
    </>
  );
}

// export default React.forwardRef(CustomInput)
export default CustomInput;
