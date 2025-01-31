import './searchField.css';
import { IoIosSearch } from "react-icons/io";

const SearchField = (props: {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeHolder?: string
}) => {
    return (
        <div
            className='search-field'
        >
            <input
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                placeholder={props.placeHolder || 'Search...'}
                className='search-field-input' 
                type="text" 
            />
            <IoIosSearch className='input-icon' />
        </div>
    );
}
 
export default SearchField;