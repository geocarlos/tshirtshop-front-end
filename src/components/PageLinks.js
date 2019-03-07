import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/contexts';

const PageLinks = ({ items, setPage }) => {
    return (
        <AppContext.Consumer>
            {({ pagingUrl })=>(<ul className='page-links'>
                {items.map((item, i) => (
                    <li key={item[0].product_id} className='page-link'>
                        <Link onClick={() => setPage(i)} to={`${pagingUrl}?page=${i + 1}`}>{i + 1}</Link>
                    </li>
                ))}
            </ul>)}
        </AppContext.Consumer>
    )
}

export default PageLinks;