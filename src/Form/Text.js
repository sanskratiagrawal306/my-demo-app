// import Form from 'react-bootstrap/Form';
// import Badge from 'react-bootstrap/Badge';

// function Text({config}) {
//     const{name = "", defaultVal = "", dataType = "", description = "", formDataType} = config;
//   return (
//     <Form.Group className="mb-3">
//       <Form.Label htmlFor="inputPassword5">{name}</Form.Label>
//       <Badge pill bg="light" text="dark">
//         {dataType}
//       </Badge>
//       <Form.Control
//         type={formDataType}
//         id="inputPassword5"
//         aria-describedby="passwordHelpBlock"

//       />
//       <Form.Text id="passwordHelpBlock" muted>
//        {description}
//       </Form.Text>
//     </Form.Group>
//   );
// }

// export default Text;

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import HtmlIcon from '@mui/icons-material/Html';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import AbcIcon from '@mui/icons-material/Abc';

import Input from '@mui/material/Input';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';


export default function Text({ config }) {
    const { name = "", defaultVal = "", dataType = "", description = "", formDataType } = config;
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
                <FormLabel sx={{
                '& > :not(style)': { m: 1 },
            }} id="demo-controlled-radio-buttons-group">{name}  <Tooltip title={description}>
                    <InfoOutlinedIcon  fontSize="small" />
                </Tooltip></FormLabel>

                <TextField id="outlined-basic" type={dataType === 'Number' ? "number" : "text"} size="small" variant="outlined"  InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             {dataType === 'Element' && <HtmlIcon />}
             {dataType === 'String' && <AbcIcon />}
             {dataType === 'Number' && <NumbersOutlinedIcon />}
            </InputAdornment>
          ),
        }} />

     
                
            </FormControl>
        </Box>
    );
}