import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = ({ handleButtonClick, tabs}) => {
  const [current, setCurrent] = React.useState(Object.keys(tabs)[0]);

  React.useEffect(() => {
    handleButtonClick(current);
  }, [current, handleButtonClick]); 

  return (
    <div className={styles.tabs}>
      {Object.values(tabs).map((name, key) =>
      <Tab 
        value={Object.keys(tabs)[key]} 
        active={current === Object.keys(tabs)[key]} 
        onClick={setCurrent} 
        key={Object.keys(tabs)[key]}
      >
        {name}
      </Tab>          
      )}
    </div>
  )
}

const typePropTypes = PropTypes.shape({
  bun: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
  sauce: PropTypes.string.isRequired,
});

Tabs.propTypes = {
  handleButtonClick: PropTypes.func,
  tabs: typePropTypes,
};
  
export default Tabs;