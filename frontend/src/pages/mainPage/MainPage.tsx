// import React from 'react';
import Calendar from '../../components/calendar/Calendar';

const MainPage = () => {
    return (
        <div>
        {/* <h1>Welcome to FightSmart</h1> */}
        <Calendar />
        {/* <p>This is the main page of your application.</p> */}
        
        <button type="button" onClick={() => console.log('Botão clicado!')}>Clique aqui</button>
        
        </div>
    );
};

export default MainPage;