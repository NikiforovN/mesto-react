import headerLogo from '../images/header__logo.svg';

function Header(){
    return(
        <header className="header">
        <img src={headerLogo} alt="Логотип Место" className="header__logo"/>
    </header>
    )
}
export default Header