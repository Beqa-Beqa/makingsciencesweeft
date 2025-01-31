import Button from '../Button/Button';
import './navbar.css';

const Navbar = (props: {
    activePage: string,
    setActivePage: React.Dispatch<React.SetStateAction<"homepage" | "history">>
}) => {
    return (
        <nav className='navbar'>
            <h1 id='logo'>MakingScienceSweeft</h1>

            <div className='buttons-container'>
                <Button
                    isActive={props.activePage === 'homepage'}
                    styles={{width: 100}}
                    text='Homepage'
                    action={() => props.setActivePage('homepage')}    
                />
                <Button
                    isActive={props.activePage === 'history'}
                    styles={{width: 100}}
                    text='History'
                    action={() => props.setActivePage('history')}
                />
            </div>
        </nav>
    );
}
 
export default Navbar;