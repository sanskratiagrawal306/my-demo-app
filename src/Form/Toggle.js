


import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Toggle({config}) {
    const{name = "", defaultVal = ""} = config;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{name}</FormLabel>
      <FormGroup aria-label="position" row>
       
        <FormControlLabel
          value= {defaultVal}
          control={<Switch color="primary" />}
          label={defaultVal ? 'Enabled' : 'Disabled'}
          labelPlacement="start"
        />
        
      </FormGroup>
    </FormControl>
  );
}