import logo from './logo.svg';
import './App.css';
import Demo from './Demo';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductTypeContext } from './context';
import { useState } from 'react';
// import Home from './Home';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Settings from './Settings';
// import Vanilla from './Vanilla';
import Vanilla2 from './Vanilla2';
import Header from './Header';

function App() {
	const [ productType, setProductType ] = useState('SEARCH');
	const [ demoType, setDemoType ] = useState('VANILLA');
	const [ enableFilters, setEnableFilters ] = useState(true);
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="App">
			<Router>
				<ProductTypeContext.Provider
					value={{
						productType,
						setProductType,
						enableFilters,
						setEnableFilters
					}}
				>
					<>
					<Header />
						<Button variant="primary" onClick={() => setDemoType('VANILLA')} className="me-2">
							View JS Demo
						</Button>
						<Button variant="success" onClick={() => setDemoType('REACT')} className="me-2">
						View React Demo
						</Button>
						<Button variant="info" onClick={handleShow} className="me-2">
							Settings
						</Button>
						<Offcanvas show={show} onHide={handleClose} placement="end" name="end" >
							<Offcanvas.Header closeButton>
								<Offcanvas.Title>Jai guru deva datta</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Settings />
							</Offcanvas.Body>
						</Offcanvas>
					</>
					{/* <Vanilla /> */}
					{/* <Vanilla2 /> */}
					{demoType === "REACT" && <Demo />}
					{demoType === "VANILLA" && <Vanilla2 />}
					

					{/* <Home /> */}
					{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
				</ProductTypeContext.Provider>
			</Router>
		</div>
	);
}

export default App;
