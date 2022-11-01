import Form from 'react-bootstrap/Form';
import Checkbox from '../Form/Checkbox';
import RadioButton from '../Form/RadioButton';
import Toggle from '../Form/Toggle';
import Text from '../Form/Text';
import Code from '../Form/Code';

export default function SettingsForm({config = []}) {
    return(
        <div className="form-wrapper">
            <Form>
            {config.map(c => {
                const {formDataType} = c
                switch (formDataType) {
                    case 'string':
                    case 'number':
                        return <Text config={c} />
                    case 'boolean':
                        return <Toggle config={c} />
                    case 'radio':
                        return <RadioButton config={c} />
                    case 'checkbox':
                        return <Checkbox config={c} />
                    case 'func':
                    case 'object':
                        return <Code config={c}/>
                }
            })}
            </Form>
        </div>
    )
}