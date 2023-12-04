import { useState, useRef } from 'react';
import CustomInput from './coustomInput';

/**
 * Testing `useRef as a prop` to replace `useForwardRef`
 * @returns Button focus App
 */
export function Tmpl_FocusApp() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  return (
    <>
      <CustomInput
        inputRef={inputRef}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}

export default Tmpl_FocusApp;
