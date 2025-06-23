//import Link from "next/link";
import Navigation from "./Navigation";

export default function Header({ menuItem, themeOption }) {
  //console.log("Header received:", themeOption); // Debug here
  //console.log("Header :", themeOption.headerLogo.node); // Debug here
  return (
    <header>
      <Navigation
        menuItem={menuItem}
        headerLogo={themeOption.headerLogo.node}
        startbuttton={themeOption.headerButton}
      />
    </header>
  );
}
