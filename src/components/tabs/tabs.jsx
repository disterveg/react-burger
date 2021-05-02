import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './tabs.module.css';

const Tabs = ({ handleButtonClick, tabs}) => {
  const [current, setCurrent] = React.useState(Object.keys(tabs)[0]);

  React.useEffect(() => {
    handleButtonClick(current);
  }, [current, handleButtonClick]); 

  return (
    <div className={styles.tabs}>
      {Object.values(tabs).map((number, key) =>
      <Tab 
        value={Object.keys(tabs)[key]} 
        active={current === Object.keys(tabs)[key]} 
        onClick={setCurrent} 
        key={Object.keys(tabs)[key]}
      >
        {number}
      </Tab>          
      )}
    </div>
  )
}
  
export default Tabs;