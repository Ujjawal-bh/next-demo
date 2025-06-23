import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children, menuItem, themeOption }) {
  //console.log("Layout menu", themeOption);
  return (
    <div className="flex flex-col min-h-screen">
      <Header menuItem={menuItem} themeOption={themeOption} />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer themeOption={themeOption} />
    </div>
  );
}
