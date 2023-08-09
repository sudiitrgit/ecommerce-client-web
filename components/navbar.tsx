import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";


const Navbar = async () => {
    const categories = await getCategories()
    
    return ( 
        <div className="border-b sticky top-0 z-10 bg-white">
            <Container>
                <div className="px-4 sm:px-2 lg:px-8 flex h-24 w-full items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-2xl text-orange-500">CHAI-SUTTA</p>
                    </Link>
                    <MainNav data={categories}/>
                    <NavbarActions />
                </div>
            </Container>   
        </div>
     );
}
 
export default Navbar;