import Form from 'react-bootstrap/Form';

function Checkbox() {
   const type = 'checkbox';
  return (
    <Form>
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`default ${type}`}
          />
        </div>
    </Form>
  );
}

export default Checkbox;