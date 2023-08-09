import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Navbar, { NavbarVariants } from './Navbar';

/** Linked to the NavbarProps in Navbar component */
interface WrapperNavbarProps {
  variant?: NavbarVariants;
  drawDivider?: boolean;
}

/** This component is used to wrap contents of a page for adjusting the layout spacing in different devices */
export const PageWrapper = (props: {
  children: React.ReactNode;
  navbarProps: WrapperNavbarProps;
}) => {
  const children = props.children;
  const navbarVariant = props.navbarProps?.variant;
  const navbarDrawDivider = props.navbarProps?.drawDivider;

  return (
    <>
      <Toaster position="top-left" />
      <div className="mx-4 md:mx-16 lg:mx-25">
        <Navbar variant={navbarVariant} drawDivider={navbarDrawDivider} />
        <main className="flex flex-col">{children}</main>
        <div className="mt-24"></div>
        <Footer />
      </div>
    </>
  );
};
