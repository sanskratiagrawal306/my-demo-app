import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

function Code({config}) {
    const { name = "", defaultVal = "", dataType = "", description = "", formDataType } = config;
    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
    }, []);
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
        <CodeMirror
            value="console.log('hello world!');"
            height="200px"
            extensions={[ javascript({ jsx: true }) ]}
            onChange={onChange}
        />
        </FormControl>
        </Box>
    );
}
export default Code;