"use client";

import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitch />
        {/* <Button>Sign in</Button> */}
      </div>
    </nav>
  );
}

export default Navbar;
