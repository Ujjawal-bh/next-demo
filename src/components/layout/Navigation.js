import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Navigation = ({ menuItem, headerLogo, startbuttton }) => {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  //const items = Array.isArray(menuItem) ? menuItem : [];
  //console.log("themeoption", headerLogo);
  //console.log("menuitem1", menuItem.childItems);
  return (
    <>
      <nav className="relative items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          {headerLogo?.sourceUrl && (
            <Link href="/">
              <Image
                src={headerLogo.sourceUrl}
                width={120}
                height={50}
                alt={headerLogo.altText || headerLogo.title || "Logo"}
              />
            </Link>
          )}
          <button
            className="text-gray-500 outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={`flex-1 justify-between mt-12 md:text-sm md:font-medium md:flex md:mt-0`}>
         <ul className="flex items-center !my-0" ref={menuRef}>
            {menuItem?.map((item) => !item.parentId ? (
              <li className={`relative px-4 first:ml-0 first:px-4 first:mr-4 ${item.childItems.nodes.length > 0 ? 'child-menu' : ''}` } key={item.id}>
                <Link href={item.uri || item.url} className="hover:text-blue-600 flex items-center justify-between">
                  {item.label}
                    {item.childItems.nodes.length > 0 && (
                      <span onClick={handleToggle}>
                        <svg class={`ml-1 w-4 h-4 ${(!isOpen) ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                </Link> 
                {item.childItems.nodes.length > 0 && (
                  <>
                  <ul className={`absolute group-hover:block bg-white shadow-md rounded mt-2 w-48 z-20 ${(!isOpen) ? 'hidden' : ''}`}>
                    {item.childItems.nodes.map((child) => 
                      <li key={child.id} className={`${child.childItems.nodes.length > 0 ? 'relative group' : ''}`}>
                        <Link href={child.uri} target={child.target || '_self'} className="block px-4 py-2 hover:bg-gray-100 flex items-center justify-between">
                          {child.label}
                          {child.childItems.nodes.length > 0 && (
                            <span className="ml-auto mr-1 min-w-[16px]">
                              <svg class="ml-1 w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          )}
                        </Link>
                        {child.childItems.nodes.length > 0 && (
                          <ul className="absolute hidden group-hover:block left-full top-0 bg-white shadow-md rounded mt-0 w-48 z-30">
                            {child.childItems.nodes.map((grandchild) => (
                              <li key={grandchild.id} className={`${grandchild.childItems.nodes.length > 0 ? 'relative group' : ''}`}>
                                <Link href={grandchild.uri} target={grandchild.target || '_self'} className="block px-4 py-2 hover:bg-gray-100">
                                  {grandchild.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )}
                  </ul>
                  </>
                )}
              </li>
            ) : null )}
          </ul>

          <ul>
          <li className="order-2 py-5 md:py-0" key="Get started">
            {startbuttton?.url && (
              <Link
                href={new URL(startbuttton.url).pathname}
                target={startbuttton.target || "_self"}
                rel={
                  startbuttton.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="py-2 px-5 rounded-lg font-medium text-white text-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 block md:py-3 md:inline"
              >
                {startbuttton.title || "Get started"}
              </Link>
            )}
          </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navigation;
