// import Form from 'react-bootstrap/Form';

// function Radio() {
//    const type = 'radio';
//   return (
//     <Form>
//         <div key={`default-${type}`} className="mb-3">
//           <Form.Check 
//             type={type}
//             id={`default-${type}`}
//             label={`default ${type}`}
//           />
//         </div>
//     </Form>
//   );
// }

// export default Radio;


import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

export default function RadioButton({config}) {
    const {name, dataType, defaultVal, formDataType, description, options = []} = config
 
const handleChange = (e) => {
  console.log('e', e)
}
  return (
    <Box
    component="form"
    sx={{
        '& > :not(style)': { m: 0, my: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{name}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={defaultVal}
        // onChange={handleChange}
      >
        {options.map(o => {
            return  <FormControlLabel value={o} control={<Radio />} label={o} />
        })}
      </RadioGroup>
    </FormControl>
    </Box>
  );
}