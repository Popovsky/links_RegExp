import React from 'react';
import styles from './Body.module.scss';
import PropTypes from 'prop-types';

const Body = props => {
    const {main} = props;
    const linksArray =  main.match(/<[aA]\s+.*?href\s*=\s*(?<quote>\\?['"])(?<hrefValue>.*?)\k<quote>.*?(?<label>.*?)<\/[aA]\s*?>/g);
    return (
        <ul className={styles.list}>
            <li className={styles.listHead}>
                <div>Hyperlink value</div>
                <div>Link label</div>
            </li>
            {
                linksArray?.map((link, index) => {
                    const href = link.match(/(?<=href=").*?(?=\s*")/);
                    return <li className={styles.listItem} key={index}>
                        <div>
                            <a href={href}>{href}</a>
                        </div>
                        <div>
                            {link.match(/(?<=>).*(?=<)/)}
                        </div>
                    </li>
                })
            }
        </ul>
    );
};

Body.propTypes = {
    main: PropTypes.string,
};

Body.defaultProps = {
    main: '',
}

export default Body;