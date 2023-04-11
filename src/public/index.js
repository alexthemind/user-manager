import ReactDom from 'react-dom/client'
import App from './App'
import './css/main.css'

const root = document.getElementById('root');
const createRoot = ReactDom.createRoot(root);

createRoot.render(<App/>);