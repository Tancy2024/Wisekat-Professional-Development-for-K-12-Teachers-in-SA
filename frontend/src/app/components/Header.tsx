'use client';

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className='w-full p-4 bg-white shadow'>
      <div className='flex flex-row flex-nowrap items-center justify-between mx-10'>
        <div className="flex items-center gap-3">
          <Image
            src='/logo.png'
            alt='MCI Logo'
            width={100}
            height={100}
            priority
          />
          <span className="text-4xl font-bold text-gray-900">WiseKat</span>
        </div>

        <div className='flex items-center gap-x-8 font-sans'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="px-4 py-2 text-xl !text-xl hover:bg-teal-100 hover:text-teal-800 transition rounded-md"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className="px-4 py-2 text-xl !text-xl hover:bg-teal-100 hover:text-teal-800 transition rounded-md"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/course"
                    className="px-4 py-2 text-xl !text-xl hover:bg-teal-100 hover:text-teal-800 transition rounded-md"
                  >
                    Courses
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/AI-tools"
                    className="px-4 py-2 text-xl !text-xl hover:bg-teal-100 hover:text-teal-800 transition rounded-md"
                  >
                    AI Tools
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/community"
                    className="px-4 py-2 text-xl !text-xl hover:bg-teal-100 hover:text-teal-800 transition rounded-md"
                  >
                    Community
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {isAuthenticated ? (
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}